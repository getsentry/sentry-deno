type AttachmentType = 'event.attachment' | 'event.minidump' | 'event.applecrashreport' | 'unreal.context' | 'unreal.logs' | 'event.view_hierarchy';
/**
 * An attachment to an event. This is used to upload arbitrary data to Sentry.
 *
 * Please take care to not add sensitive information in attachments.
 *
 * https://develop.sentry.dev/sdk/envelopes/#attachment
 */
interface Attachment {
    /**
     * The attachment data. Can be a string or a binary data (byte array)
     */
    data: string | Uint8Array;
    /**
     * The name of the uploaded file without a path component
     */
    filename: string;
    /**
     * The content type of the attachment payload. Defaults to `application/octet-stream` if not specified.
     *
     * Any valid [media type](https://www.iana.org/assignments/media-types/media-types.xhtml) is allowed.
     */
    contentType?: string;
    /**
     * The type of the attachment. Defaults to `event.attachment` if not specified.
     */
    attachmentType?: AttachmentType;
}

type SeverityLevel = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';

/**
 * Sentry uses breadcrumbs to create a trail of events that happened prior to an issue.
 * These events are very similar to traditional logs but can record more rich structured data.
 *
 * @link https://develop.sentry.dev/sdk/event-payloads/breadcrumbs/
 */
interface Breadcrumb {
    /**
     * By default, all breadcrumbs are recorded as default, which makes them appear as a Debug entry, but Sentry provides
     * other types that influence how the breadcrumbs are rendered. For more information, see the description of
     * recognized breadcrumb types.
     *
     * @summary The type of breadcrumb.
     * @link https://develop.sentry.dev/sdk/event-payloads/breadcrumbs/#breadcrumb-types
     */
    type?: string;
    /**
     * Allowed values are, from highest to lowest:
     * `fatal`, `error`, `warning`, `info`, and `debug`.
     * Levels are used in the UI to emphasize and deemphasize the crumb. The default is `info`.
     *
     * @summary This defines the severity level of the breadcrumb.
     */
    level?: SeverityLevel;
    event_id?: string;
    /**
     * Typically it is a module name or a descriptive string. For instance, `ui.click` could be used to
     * indicate that a click happened in the UI or flask could be used to indicate that the event originated in
     * the Flask framework.
     * @private Internally we render some crumbs' color and icon based on the provided category.
     *          For more information, see the description of recognized breadcrumb types.
     * @summary A dotted string indicating what the crumb is or from where it comes.
     * @link    https://develop.sentry.dev/sdk/event-payloads/breadcrumbs/#breadcrumb-types
     */
    category?: string;
    /**
     * If a message is provided, it is rendered as text with all whitespace preserved.
     *
     * @summary Human-readable message for the breadcrumb.
     */
    message?: string;
    /**
     * Contains a dictionary whose contents depend on the breadcrumb type.
     * Additional parameters that are unsupported by the type are rendered as a key/value table.
     *
     * @summary Arbitrary data associated with this breadcrumb.
     */
    data?: {
        [key: string]: any;
    };
    /**
     * The format is a numeric (integer or float) value representing
     * the number of seconds that have elapsed since the Unixepoch.
     * Breadcrumbs are most useful when they include a timestamp, as it creates a timeline
     * leading up to an event expection/error.
     *
     * @note The API supports a string as defined in RFC 3339, but the SDKs only support a numeric value for now.
     *
     * @summary A timestamp representing when the breadcrumb occurred.
     * @link https://develop.sentry.dev/sdk/event-payloads/breadcrumbs/#:~:text=is%20info.-,timestamp,-(recommended)
     */
    timestamp?: number;
}
/** JSDoc */
interface BreadcrumbHint {
    [key: string]: any;
}

type FeatureFlag = {
    readonly flag: string;
    readonly result: boolean;
};

/**
 * Request data included in an event as sent to Sentry.
 */
interface RequestEventData {
    url?: string;
    method?: string;
    data?: any;
    query_string?: QueryParams;
    cookies?: {
        [key: string]: string;
    };
    env?: {
        [key: string]: string;
    };
    headers?: {
        [key: string]: string;
    };
}
/**
 * Request data included in an event as sent to Sentry.
 * @deprecated: This type will be removed in v9. Use `RequestEventData` instead.
 */
type Request = RequestEventData;
type QueryParams = string | {
    [key: string]: string;
} | Array<[string, string]>;

/**
 * Data extracted from an incoming request to a node server
 */
interface ExtractedNodeRequestData {
    [key: string]: any;
    /** Specific headers from the request */
    headers?: {
        [key: string]: string;
    };
    /**  The request's method */
    method?: string;
    /** The request's URL, including query string */
    url?: string;
    /** String representing the cookies sent along with the request */
    cookies?: {
        [key: string]: string;
    };
    /** The request's query params */
    query_string?: QueryParams;
    /** Any data sent in the request's body, as a JSON string */
    data?: string;
}
/**
 * Location object on a service worker's `self` object.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/WorkerLocation.
 */
interface WorkerLocation {
    /** The protocol scheme of the URL of the script executed in the Worker, including the final ':'. */
    readonly protocol: string;
    /** The host, that is the hostname, a ':', and the port of the URL of the script executed in the Worker. */
    readonly host: string;
    /** The domain of the URL of the script executed in the Worker. */
    readonly hostname: string;
    /** The canonical form of the origin of the specific location. */
    readonly origin: string;
    /** The port number of the URL of the script executed in the Worker. */
    readonly port: string;
    /** The path of the URL of the script executed in the Worker, beginning with a '/'. */
    readonly pathname: string;
    /** The parameters (query string) of the URL of the script executed in the Worker, beginning with a '?'. */
    readonly search: string;
    /** The fragment identifier of the URL of the script executed in the Worker, beginning with a '#'. */
    readonly hash: string;
    /** Stringifier that returns the whole URL of the script executed in the Worker. */
    readonly href: string;
    /** Synonym for `href` attribute */
    toString(): string;
}
type Primitive = number | string | boolean | bigint | symbol | null | undefined;

/**
 * A time duration.
 */
type DurationUnit = 'nanosecond' | 'microsecond' | 'millisecond' | 'second' | 'minute' | 'hour' | 'day' | 'week';
/**
 * Size of information derived from bytes.
 */
type InformationUnit = 'bit' | 'byte' | 'kilobyte' | 'kibibyte' | 'megabyte' | 'mebibyte' | 'gigabyte' | 'terabyte' | 'tebibyte' | 'petabyte' | 'exabyte' | 'exbibyte';
/**
 * Fractions such as percentages.
 */
type FractionUnit = 'ratio' | 'percent';
/**
 * Untyped value without a unit.
 */
type NoneUnit = '' | 'none';
type LiteralUnion<T extends string> = T | Omit<T, T>;
type MeasurementUnit = LiteralUnion<DurationUnit | InformationUnit | FractionUnit | NoneUnit>;
type Measurements = Record<string, {
    value: number;
    unit: MeasurementUnit;
}>;

/**
 * Defines High-Resolution Time.
 *
 * The first number, HrTime[0], is UNIX Epoch time in seconds since 00:00:00 UTC on 1 January 1970.
 * The second number, HrTime[1], represents the partial second elapsed since Unix Epoch time represented by first number in nanoseconds.
 * For example, 2021-01-01T12:30:10.150Z in UNIX Epoch time in milliseconds is represented as 1609504210150.
 * The first number is calculated by converting and truncating the Epoch time in milliseconds to seconds:
 * HrTime[0] = Math.trunc(1609504210150 / 1000) = 1609504210.
 * The second number is calculated by converting the digits after the decimal point of the subtraction, (1609504210150 / 1000) - HrTime[0], to nanoseconds:
 * HrTime[1] = Number((1609504210.150 - HrTime[0]).toFixed(9)) * 1e9 = 150000000.
 * This is represented in HrTime format as [1609504210, 150000000].
 */
type HrTime = [number, number];

type SpanStatusType = 
/** The operation completed successfully. */
'ok'
/** Deadline expired before operation could complete. */
 | 'deadline_exceeded'
/** 401 Unauthorized (actually does mean unauthenticated according to RFC 7235) */
 | 'unauthenticated'
/** 403 Forbidden */
 | 'permission_denied'
/** 404 Not Found. Some requested entity (file or directory) was not found. */
 | 'not_found'
/** 429 Too Many Requests */
 | 'resource_exhausted'
/** Client specified an invalid argument. 4xx. */
 | 'invalid_argument'
/** 501 Not Implemented */
 | 'unimplemented'
/** 503 Service Unavailable */
 | 'unavailable'
/** Other/generic 5xx. */
 | 'internal_error'
/** Unknown. Any non-standard HTTP status code. */
 | 'unknown_error'
/** The operation was cancelled (typically by the user). */
 | 'cancelled'
/** Already exists (409) */
 | 'already_exists'
/** Operation was rejected because the system is not in a state required for the operation's */
 | 'failed_precondition'
/** The operation was aborted, typically due to a concurrency issue. */
 | 'aborted'
/** Operation was attempted past the valid range. */
 | 'out_of_range'
/** Unrecoverable data loss or corruption */
 | 'data_loss';
declare const SPAN_STATUS_UNSET = 0;
declare const SPAN_STATUS_OK = 1;
declare const SPAN_STATUS_ERROR = 2;
/** The status code of a span. */
type SpanStatusCode = typeof SPAN_STATUS_UNSET | typeof SPAN_STATUS_OK | typeof SPAN_STATUS_ERROR;
/**
 * The status of a span.
 * This can optionally contain a human-readable message.
 */
interface SpanStatus {
    /**
     * The status code of this message.
     * 0 = UNSET
     * 1 = OK
     * 2 = ERROR
     */
    code: SpanStatusCode;
    /**
     * A developer-facing error message.
     */
    message?: SpanStatusType | string;
}

/**
 * Contains information about how the name of the transaction was determined. This will be used by the server to decide
 * whether or not to scrub identifiers from the transaction name, or replace the entire name with a placeholder.
 */
type TransactionSource = 
/** User-defined name */
'custom'
/** Raw URL, potentially containing identifiers */
 | 'url'
/** Parametrized URL / route */
 | 'route'
/** Name of the view handling the request */
 | 'view'
/** Named after a software component, such as a function or class name. */
 | 'component'
/** Name of a background task (e.g. a Celery task) */
 | 'task';

type SpanOriginType = 'manual' | 'auto';
type SpanOriginCategory = string;
type SpanOriginIntegrationName = string;
type SpanOriginIntegrationPart = string;
type SpanOrigin = SpanOriginType | `${SpanOriginType}.${SpanOriginCategory}` | `${SpanOriginType}.${SpanOriginCategory}.${SpanOriginIntegrationName}` | `${SpanOriginType}.${SpanOriginCategory}.${SpanOriginIntegrationName}.${SpanOriginIntegrationPart}`;
type SpanAttributeValue = string | number | boolean | Array<null | undefined | string> | Array<null | undefined | number> | Array<null | undefined | boolean>;
type SpanAttributes = Partial<{
    'sentry.origin': string;
    'sentry.op': string;
    'sentry.source': TransactionSource;
    'sentry.sample_rate': number;
}> & Record<string, SpanAttributeValue | undefined>;
type MetricSummary = {
    min: number;
    max: number;
    count: number;
    sum: number;
    tags?: Record<string, Primitive> | undefined;
};
/** This type is aligned with the OpenTelemetry TimeInput type. */
type SpanTimeInput = HrTime | number | Date;
/** A JSON representation of a span. */
interface SpanJSON {
    data?: {
        [key: string]: any;
    };
    description?: string;
    op?: string;
    parent_span_id?: string;
    span_id: string;
    start_timestamp: number;
    status?: string;
    timestamp?: number;
    trace_id: string;
    origin?: SpanOrigin;
    _metrics_summary?: Record<string, Array<MetricSummary>>;
    profile_id?: string;
    exclusive_time?: number;
    measurements?: Measurements;
    is_segment?: boolean;
    segment_id?: string;
}
type TraceFlagNone = 0;
type TraceFlagSampled = 1;
type TraceFlag = TraceFlagNone | TraceFlagSampled;
interface TraceState {
    /**
     * Create a new TraceState which inherits from this TraceState and has the
     * given key set.
     * The new entry will always be added in the front of the list of states.
     *
     * @param key key of the TraceState entry.
     * @param value value of the TraceState entry.
     */
    set(key: string, value: string): TraceState;
    /**
     * Return a new TraceState which inherits from this TraceState but does not
     * contain the given key.
     *
     * @param key the key for the TraceState entry to be removed.
     */
    unset(key: string): TraceState;
    /**
     * Returns the value to which the specified key is mapped, or `undefined` if
     * this map contains no mapping for the key.
     *
     * @param key with which the specified value is to be associated.
     * @returns the value to which the specified key is mapped, or `undefined` if
     *     this map contains no mapping for the key.
     */
    get(key: string): string | undefined;
    /**
     * Serializes the TraceState to a `list` as defined below. The `list` is a
     * series of `list-members` separated by commas `,`, and a list-member is a
     * key/value pair separated by an equals sign `=`. Spaces and horizontal tabs
     * surrounding `list-members` are ignored. There can be a maximum of 32
     * `list-members` in a `list`.
     *
     * @returns the serialized string.
     */
    serialize(): string;
}
interface SpanContextData {
    /**
     * The ID of the trace that this span belongs to. It is worldwide unique
     * with practically sufficient probability by being made as 16 randomly
     * generated bytes, encoded as a 32 lowercase hex characters corresponding to
     * 128 bits.
     */
    traceId: string;
    /**
     * The ID of the Span. It is globally unique with practically sufficient
     * probability by being made as 8 randomly generated bytes, encoded as a 16
     * lowercase hex characters corresponding to 64 bits.
     */
    spanId: string;
    /**
     * Only true if the SentrySpanArguments was propagated from a remote parent.
     */
    isRemote?: boolean | undefined;
    /**
     * Trace flags to propagate.
     *
     * It is represented as 1 byte (bitmap). Bit to represent whether trace is
     * sampled or not. When set, the least significant bit documents that the
     * caller may have recorded trace data. A caller who does not record trace
     * data out-of-band leaves this flag unset.
     */
    traceFlags: TraceFlag | number;
    /** In OpenTelemetry, this can be used to store trace state, which are basically key-value pairs. */
    traceState?: TraceState | undefined;
}
/**
 * A generic Span which holds trace data.
 */
interface Span {
    /**
     * Get context data for this span.
     * This includes the spanId & the traceId.
     */
    spanContext(): SpanContextData;
    /**
     * End the current span.
     */
    end(endTimestamp?: SpanTimeInput): void;
    /**
     * Set a single attribute on the span.
     * Set it to `undefined` to remove the attribute.
     */
    setAttribute(key: string, value: SpanAttributeValue | undefined): this;
    /**
     * Set multiple attributes on the span.
     * Any attribute set to `undefined` will be removed.
     */
    setAttributes(attributes: SpanAttributes): this;
    /**
     * Sets the status attribute on the current span.
     */
    setStatus(status: SpanStatus): this;
    /**
     * Update the name of the span.
     *
     * **Important:** You most likely want to use `Sentry.updateSpanName(span, name)` instead!
     *
     * This method will update the current span name but cannot guarantee that the new name will be
     * the final name of the span. Instrumentation might still overwrite the name with an automatically
     * computed name, for example in `http.server` or `db` spans.
     *
     * You can ensure that your name is kept and not overwritten by calling `Sentry.updateSpanName(span, name)`
     *
     * @param name the new name of the span
     */
    updateName(name: string): this;
    /**
     * If this is span is actually recording data.
     * This will return false if tracing is disabled, this span was not sampled or if the span is already finished.
     */
    isRecording(): boolean;
    /**
     * Adds an event to the Span.
     */
    addEvent(name: string, attributesOrStartTime?: SpanAttributes | SpanTimeInput, startTime?: SpanTimeInput): this;
    /**
     * NOT USED IN SENTRY, only added for compliance with OTEL Span interface
     */
    addLink(link: unknown): this;
    /**
     * NOT USED IN SENTRY, only added for compliance with OTEL Span interface
     */
    addLinks(links: unknown): this;
    /**
     * NOT USED IN SENTRY, only added for compliance with OTEL Span interface
     */
    recordException(exception: unknown, time?: number): void;
}

type Context = Record<string, unknown>;
interface Contexts extends Record<string, Context | undefined> {
    app?: AppContext;
    device?: DeviceContext;
    os?: OsContext;
    culture?: CultureContext;
    response?: ResponseContext;
    trace?: TraceContext;
    cloud_resource?: CloudResourceContext;
    state?: StateContext;
    profile?: ProfileContext;
    flags?: FeatureFlagContext;
}
interface StateContext extends Record<string, unknown> {
    state: {
        type: string;
        value: Record<string, unknown>;
    };
}
interface AppContext extends Record<string, unknown> {
    app_name?: string;
    app_start_time?: string;
    app_version?: string;
    app_identifier?: string;
    build_type?: string;
    app_memory?: number;
    free_memory?: number;
}
interface DeviceContext extends Record<string, unknown> {
    name?: string;
    family?: string;
    model?: string;
    model_id?: string;
    arch?: string;
    battery_level?: number;
    orientation?: 'portrait' | 'landscape';
    manufacturer?: string;
    brand?: string;
    screen_resolution?: string;
    screen_height_pixels?: number;
    screen_width_pixels?: number;
    screen_density?: number;
    screen_dpi?: number;
    online?: boolean;
    charging?: boolean;
    low_memory?: boolean;
    simulator?: boolean;
    memory_size?: number;
    free_memory?: number;
    usable_memory?: number;
    storage_size?: number;
    free_storage?: number;
    external_storage_size?: number;
    external_free_storage?: number;
    boot_time?: string;
    processor_count?: number;
    cpu_description?: string;
    processor_frequency?: number;
    device_type?: string;
    battery_status?: string;
    device_unique_identifier?: string;
    supports_vibration?: boolean;
    supports_accelerometer?: boolean;
    supports_gyroscope?: boolean;
    supports_audio?: boolean;
    supports_location_service?: boolean;
}
interface OsContext extends Record<string, unknown> {
    name?: string;
    version?: string;
    build?: string;
    kernel_version?: string;
}
interface CultureContext extends Record<string, unknown> {
    calendar?: string;
    display_name?: string;
    locale?: string;
    is_24_hour_format?: boolean;
    timezone?: string;
}
interface ResponseContext extends Record<string, unknown> {
    type?: string;
    cookies?: string[][] | Record<string, string>;
    headers?: Record<string, string>;
    status_code?: number;
    body_size?: number;
}
interface TraceContext extends Record<string, unknown> {
    data?: {
        [key: string]: any;
    };
    op?: string;
    parent_span_id?: string;
    span_id: string;
    status?: string;
    tags?: {
        [key: string]: Primitive;
    };
    trace_id: string;
    origin?: SpanOrigin;
}
interface CloudResourceContext extends Record<string, unknown> {
    ['cloud.provider']?: string;
    ['cloud.account.id']?: string;
    ['cloud.region']?: string;
    ['cloud.availability_zone']?: string;
    ['cloud.platform']?: string;
    ['host.id']?: string;
    ['host.type']?: string;
}
interface ProfileContext extends Record<string, unknown> {
    profile_id: string;
}
/**
 * Used to buffer flag evaluation data on the current scope and attach it to
 * error events. `values` should be initialized as empty ([]), and modifying
 * directly is not recommended. Use the functions in @sentry/browser
 * src/utils/featureFlags instead.
 */
interface FeatureFlagContext extends Record<string, unknown> {
    values: FeatureFlag[];
}

interface CrontabSchedule {
    type: 'crontab';
    /** The crontab schedule string, e.g. 0 * * * *. */
    value: string;
}
interface IntervalSchedule {
    type: 'interval';
    value: number;
    unit: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute';
}
type MonitorSchedule = CrontabSchedule | IntervalSchedule;
interface SerializedCheckIn {
    /** Check-In ID (unique and client generated). */
    check_in_id: string;
    /** The distinct slug of the monitor. */
    monitor_slug: string;
    /** The status of the check-in. */
    status: 'in_progress' | 'ok' | 'error';
    /** The duration of the check-in in seconds. Will only take effect if the status is ok or error. */
    duration?: number;
    release?: string;
    environment?: string;
    monitor_config?: {
        schedule: MonitorSchedule;
        /**
         * The allowed allowed margin of minutes after the expected check-in time that
         * the monitor will not be considered missed for.
         */
        checkin_margin?: number;
        /**
         * The allowed allowed duration in minutes that the monitor may be `in_progress`
         * for before being considered failed due to timeout.
         */
        max_runtime?: number;
        /**
         * A tz database string representing the timezone which the monitor's execution schedule is in.
         * See: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
         */
        timezone?: string;
        /** How many consecutive failed check-ins it takes to create an issue. */
        failure_issue_threshold?: number;
        /** How many consecutive OK check-ins it takes to resolve an issue. */
        recovery_threshold?: number;
    };
    contexts?: {
        trace?: TraceContext;
    };
}
interface HeartbeatCheckIn {
    /** The distinct slug of the monitor. */
    monitorSlug: SerializedCheckIn['monitor_slug'];
    /** The status of the check-in. */
    status: 'ok' | 'error';
}
interface InProgressCheckIn {
    /** The distinct slug of the monitor. */
    monitorSlug: SerializedCheckIn['monitor_slug'];
    /** The status of the check-in. */
    status: 'in_progress';
}
interface FinishedCheckIn {
    /** The distinct slug of the monitor. */
    monitorSlug: SerializedCheckIn['monitor_slug'];
    /** The status of the check-in. */
    status: 'ok' | 'error';
    /** Check-In ID (unique and client generated). */
    checkInId: SerializedCheckIn['check_in_id'];
    /** The duration of the check-in in seconds. Will only take effect if the status is ok or error. */
    duration?: SerializedCheckIn['duration'];
}
type CheckIn = HeartbeatCheckIn | InProgressCheckIn | FinishedCheckIn;
type SerializedMonitorConfig = NonNullable<SerializedCheckIn['monitor_config']>;
interface MonitorConfig {
    /**
     * The schedule on which the monitor should run. Either a crontab schedule string or an interval.
     */
    schedule: MonitorSchedule;
    /**
     * The allowed allowed margin of minutes after the expected check-in time that
     * the monitor will not be considered missed for.
     */
    checkinMargin?: SerializedMonitorConfig['checkin_margin'];
    /**
     * The allowed allowed duration in minutes that the monitor may be `in_progress`
     * for before being considered failed due to timeout.
     */
    maxRuntime?: SerializedMonitorConfig['max_runtime'];
    /**
     * A tz database string representing the timezone which the monitor's execution schedule is in.
     * See: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
     */
    timezone?: SerializedMonitorConfig['timezone'];
    /** How many consecutive failed check-ins it takes to create an issue. */
    failureIssueThreshold?: SerializedMonitorConfig['failure_issue_threshold'];
    /** How many consecutive OK check-ins it takes to resolve an issue. */
    recoveryThreshold?: SerializedMonitorConfig['recovery_threshold'];
}

type DataCategory = 'default' | 'error' | 'transaction' | 'replay' | 'security' | 'attachment' | 'session' | 'internal' | 'profile' | 'monitor' | 'feedback' | 'metric_bucket' | 'span' | 'log_item' | 'log_byte' | 'unknown';

type EventDropReason = 'before_send' | 'event_processor' | 'network_error' | 'queue_overflow' | 'ratelimit_backoff' | 'sample_rate' | 'send_error' | 'internal_sdk_error' | 'buffer_overflow';
type Outcome = {
    reason: EventDropReason;
    category: DataCategory;
    quantity: number;
};
type ClientReport = {
    timestamp: number;
    discarded_events: Outcome[];
};

/** Supported Sentry transport protocols in a Dsn. */
type DsnProtocol = 'http' | 'https';
/** Primitive components of a Dsn. */
interface DsnComponents {
    /** Protocol used to connect to Sentry. */
    protocol: DsnProtocol;
    /** Public authorization key. */
    publicKey?: string;
    /** Private authorization key (deprecated, optional). */
    pass?: string;
    /** Hostname of the Sentry instance. */
    host: string;
    /** Port of the Sentry instance. */
    port?: string;
    /** Sub path/ */
    path?: string;
    /** Project ID */
    projectId: string;
}

interface LegacyCSPReport {
    readonly 'csp-report': {
        readonly 'document-uri'?: string;
        readonly referrer?: string;
        readonly 'blocked-uri'?: string;
        readonly 'effective-directive'?: string;
        readonly 'violated-directive'?: string;
        readonly 'original-policy'?: string;
        readonly disposition: 'enforce' | 'report' | 'reporting';
        readonly 'status-code'?: number;
        readonly status?: string;
        readonly 'script-sample'?: string;
        readonly sample?: string;
    };
}

/**
 * Holds meta information to customize the behavior of Sentry's server-side event processing.
 **/
interface DebugMeta {
    images?: Array<DebugImage>;
}
type DebugImage = WasmDebugImage | SourceMapDebugImage | MachoDebugImage;
interface WasmDebugImage {
    type: 'wasm';
    debug_id: string;
    code_id?: string | null;
    code_file: string;
    debug_file?: string | null;
}
interface SourceMapDebugImage {
    type: 'sourcemap';
    code_file: string;
    debug_id: string;
}
interface MachoDebugImage {
    type: 'macho';
    debug_id: string;
    image_addr: string;
    image_size?: number;
    code_file?: string;
}

/**
 * Metadata about a captured exception, intended to provide a hint as to the means by which it was captured.
 */
interface Mechanism {
    /**
     * For now, restricted to `onerror`, `onunhandledrejection` (both obvious), `instrument` (the result of
     * auto-instrumentation), and `generic` (everything else). Converted to a tag on ingest.
     */
    type: string;
    /**
     * In theory, whether or not the exception has been handled by the user. In practice, whether or not we see it before
     * it hits the global error/rejection handlers, whether through explicit handling by the user or auto instrumentation.
     * Converted to a tag on ingest and used in various ways in the UI.
     */
    handled?: boolean;
    /**
     * Arbitrary data to be associated with the mechanism (for example, errors coming from event handlers include the
     * handler name and the event target. Will show up in the UI directly above the stacktrace.
     */
    data?: {
        [key: string]: string | boolean;
    };
    /**
     * True when `captureException` is called with anything other than an instance of `Error` (or, in the case of browser,
     * an instance of `ErrorEvent`, `DOMError`, or `DOMException`). causing us to create a synthetic error in an attempt
     * to recreate the stacktrace.
     */
    synthetic?: boolean;
    /**
     * Describes the source of the exception, in the case that this is a derived (linked or aggregate) error.
     *
     * This should be populated with the name of the property where the exception was found on the parent exception.
     * E.g. "cause", "errors[0]", "errors[1]"
     */
    source?: string;
    /**
     * Indicates whether the exception is an `AggregateException`.
     */
    is_exception_group?: boolean;
    /**
     * An identifier for the exception inside the `event.exception.values` array. This identifier is referenced to via the
     * `parent_id` attribute to link and aggregate errors.
     */
    exception_id?: number;
    /**
     * References another exception via the `exception_id` field to indicate that this exception is a child of that
     * exception in the case of aggregate or linked errors.
     */
    parent_id?: number;
}

/** JSDoc */
interface StackFrame {
    filename?: string;
    function?: string;
    module?: string;
    platform?: string;
    lineno?: number;
    colno?: number;
    abs_path?: string;
    context_line?: string;
    pre_context?: string[];
    post_context?: string[];
    in_app?: boolean;
    instruction_addr?: string;
    addr_mode?: string;
    vars?: {
        [key: string]: any;
    };
    debug_id?: string;
    module_metadata?: any;
}

/** JSDoc */
interface Stacktrace {
    frames?: StackFrame[];
    frames_omitted?: [number, number];
}
type StackParser = (stack: string, skipFirstLines?: number, framesToPop?: number) => StackFrame[];
type StackLineParserFn = (line: string) => StackFrame | undefined;
type StackLineParser = [number, StackLineParserFn];

/** JSDoc */
interface Exception {
    type?: string;
    value?: string;
    mechanism?: Mechanism;
    module?: string;
    thread_id?: number;
    stacktrace?: Stacktrace;
}

type Extra = unknown;
type Extras = Record<string, Extra>;

/** A `Request` type compatible with Node, Express, browser, etc., because everything is optional */
type PolymorphicRequest = BaseRequest & BrowserRequest & NodeRequest & ExpressRequest & KoaRequest & NextjsRequest;
type BaseRequest = {
    method?: string;
    url?: string;
};
type BrowserRequest = BaseRequest;
type NodeRequest = BaseRequest & {
    headers?: {
        [key: string]: string | string[] | undefined;
    };
    protocol?: string;
    socket?: {
        encrypted?: boolean;
        remoteAddress?: string;
    };
};
type KoaRequest = NodeRequest & {
    host?: string;
    hostname?: string;
    ip?: string;
    originalUrl?: string;
};
type NextjsRequest = NodeRequest & {
    cookies?: {
        [key: string]: string;
    };
    query?: {
        [key: string]: any;
    };
};
type ExpressRequest = NodeRequest & {
    baseUrl?: string;
    body?: string | {
        [key: string]: any;
    };
    host?: string;
    hostname?: string;
    ip?: string;
    originalUrl?: string;
    route?: {
        path: string;
        stack: [
            {
                name: string;
            }
        ];
    };
    query?: {
        [key: string]: any;
    };
    user?: {
        [key: string]: any;
    };
    _reconstructedRoute?: string;
};

/**
 * Event processors are used to change the event before it will be sent.
 * We strongly advise to make this function sync.
 * Returning a PromiseLike<Event | null> will work just fine, but better be sure that you know what you are doing.
 * Event processing will be deferred until your Promise is resolved.
 */
interface EventProcessor {
    (event: Event, hint: EventHint): PromiseLike<Event | null> | Event | null;
    id?: string;
}

/**
 * An interface describing a user of an application or a handled request.
 */
interface User {
    [key: string]: any;
    id?: string | number;
    ip_address?: string;
    email?: string;
    username?: string;
    geo?: GeoLocation;
}
interface GeoLocation {
    country_code?: string;
    region?: string;
    city?: string;
}

/**
 * @deprecated This type is deprecated and will be removed in the next major version of the SDK.
 */
interface RequestSession {
    status?: RequestSessionStatus;
}
interface Session {
    sid: string;
    did?: string | number;
    init: boolean;
    timestamp: number;
    started: number;
    duration?: number;
    status: SessionStatus;
    release?: string;
    environment?: string;
    userAgent?: string;
    ipAddress?: string;
    errors: number;
    user?: User | null;
    ignoreDuration: boolean;
    abnormal_mechanism?: string;
    /**
     * Overrides default JSON serialization of the Session because
     * the Sentry servers expect a slightly different schema of a session
     * which is described in the interface @see SerializedSession in this file.
     *
     * @return a Sentry-backend conforming JSON object of the session
     */
    toJSON(): SerializedSession;
}
type SessionContext = Partial<Session>;
type SessionStatus = 'ok' | 'exited' | 'crashed' | 'abnormal';
/**
 * @deprecated This type is deprecated and will be removed in the next major version of the SDK.
 */
type RequestSessionStatus = 'ok' | 'errored' | 'crashed';
/** JSDoc */
interface SessionAggregates {
    attrs?: {
        environment?: string;
        release?: string;
    };
    aggregates: Array<AggregationCounts>;
}
/**
 * @deprecated This type is deprecated and will be removed in the next major version of the SDK.
 */
interface SessionFlusherLike {
    /**
     * Increments the Session Status bucket in SessionAggregates Object corresponding to the status of the session
     * captured
     */
    incrementSessionStatusCount(): void;
    /** Empties Aggregate Buckets and Sends them to Transport Buffer */
    flush(): void;
    /** Clears setInterval and calls flush */
    close(): void;
}
interface AggregationCounts {
    started: string;
    errored?: number;
    exited?: number;
    crashed?: number;
}
interface SerializedSession {
    init: boolean;
    sid: string;
    did?: string;
    timestamp: string;
    started: string;
    duration?: number;
    status: SessionStatus;
    errors: number;
    abnormal_mechanism?: string;
    attrs?: {
        release?: string;
        environment?: string;
        user_agent?: string;
        ip_address?: string;
    };
}

type TracePropagationTargets = (string | RegExp)[];
/**
 * `PropagationContext` represents the data from an incoming trace. It should be constructed from incoming trace data,
 * usually represented by `sentry-trace` and `baggage` HTTP headers.
 *
 * There is always a propagation context present in the SDK (or rather on Scopes), holding at least a `traceId`. This is
 * to ensure that there is always a trace we can attach events onto, even if performance monitoring is disabled. If
 * there was no incoming `traceId`, the `traceId` will be generated by the current SDK.
 */
interface PropagationContext {
    /**
     * Either represents the incoming `traceId` or the `traceId` generated by the current SDK, if there was no incoming trace.
     */
    traceId: string;
    /**
     * Represents the execution context of the current SDK. This acts as a fallback value to associate events with a
     * particular execution context when performance monitoring is disabled.
     *
     * The ID of a current span (if one exists) should have precedence over this value when propagating trace data.
     *
     * @deprecated This value will not be used anymore in the future, and should not be set or read anymore.
     */
    spanId: string;
    /**
     * Represents the sampling decision of the incoming trace.
     *
     * The current SDK should not modify this value!
     */
    sampled?: boolean;
    /**
     * The `parentSpanId` denotes the ID of the incoming client span. If there is no `parentSpanId` on the propagation
     * context, it means that the the incoming trace didn't come from a span.
     *
     * The current SDK should not modify this value!
     */
    parentSpanId?: string;
    /**
     * An undefined dsc in the propagation context means that the current SDK invocation is the head of trace and still free to modify and set the DSC for outgoing requests.
     *
     * The current SDK should not modify this value!
     */
    dsc?: Partial<DynamicSamplingContext>;
}
/**
 * An object holding trace data, like span and trace ids, sampling decision, and dynamic sampling context
 * in a serialized form. Both keys are expected to be used as Http headers or Html meta tags.
 */
interface SerializedTraceData {
    'sentry-trace'?: string;
    baggage?: string;
}

/** JSDocs */
type CaptureContext = Scope$1 | Partial<ScopeContext> | ((scope: Scope$1) => Scope$1);
/** JSDocs */
interface ScopeContext {
    user: User;
    level: SeverityLevel;
    extra: Extras;
    contexts: Contexts;
    tags: {
        [key: string]: Primitive;
    };
    fingerprint: string[];
    requestSession: RequestSession;
    propagationContext: PropagationContext;
}
interface ScopeData {
    eventProcessors: EventProcessor[];
    breadcrumbs: Breadcrumb[];
    user: User;
    tags: {
        [key: string]: Primitive;
    };
    extra: Extras;
    contexts: Contexts;
    attachments: Attachment[];
    propagationContext: PropagationContext;
    sdkProcessingMetadata: {
        [key: string]: unknown;
    };
    fingerprint: string[];
    level?: SeverityLevel;
    transactionName?: string;
    span?: Span;
}
/**
 * Holds additional event information.
 */
interface Scope$1 {
    /**
     * Update the client on the scope.
     */
    setClient(client: Client | undefined): void;
    /**
     * Get the client assigned to this scope.
     *
     * It is generally recommended to use the global function `Sentry.getClient()` instead, unless you know what you are doing.
     */
    getClient<C extends Client>(): C | undefined;
    /**
     * Sets the last event id on the scope.
     * @param lastEventId The last event id of a captured event.
     */
    setLastEventId(lastEventId: string | undefined): void;
    /**
     * This is the getter for lastEventId.
     * @returns The last event id of a captured event.
     */
    lastEventId(): string | undefined;
    /**
     * Add internal on change listener. Used for sub SDKs that need to store the scope.
     * @hidden
     */
    addScopeListener(callback: (scope: Scope$1) => void): void;
    /** Add new event processor that will be called during event processing. */
    addEventProcessor(callback: EventProcessor): this;
    /** Get the data of this scope, which is applied to an event during processing. */
    getScopeData(): ScopeData;
    /**
     * Updates user context information for future events.
     *
     * @param user User context object to be set in the current context. Pass `null` to unset the user.
     */
    setUser(user: User | null): this;
    /**
     * Returns the `User` if there is one
     */
    getUser(): User | undefined;
    /**
     * Set an object that will be merged sent as tags data with the event.
     * @param tags Tags context object to merge into current context.
     */
    setTags(tags: {
        [key: string]: Primitive;
    }): this;
    /**
     * Set key:value that will be sent as tags data with the event.
     *
     * Can also be used to unset a tag by passing `undefined`.
     *
     * @param key String key of tag
     * @param value Value of tag
     */
    setTag(key: string, value: Primitive): this;
    /**
     * Set an object that will be merged sent as extra data with the event.
     * @param extras Extras object to merge into current context.
     */
    setExtras(extras: Extras): this;
    /**
     * Set key:value that will be sent as extra data with the event.
     * @param key String of extra
     * @param extra Any kind of data. This data will be normalized.
     */
    setExtra(key: string, extra: Extra): this;
    /**
     * Sets the fingerprint on the scope to send with the events.
     * @param fingerprint string[] to group events in Sentry.
     */
    setFingerprint(fingerprint: string[]): this;
    /**
     * Sets the level on the scope for future events.
     * @param level string {@link SeverityLevel}
     */
    setLevel(level: SeverityLevel): this;
    /**
     * Sets the transaction name on the scope so that the name of the transaction
     * (e.g. taken server route or page location) is attached to future events.
     *
     * IMPORTANT: Calling this function does NOT change the name of the currently active
     * span. If you want to change the name of the active span, use `span.updateName()`
     * instead.
     *
     * By default, the SDK updates the scope's transaction name automatically on sensible
     * occasions, such as a page navigation or when handling a new request on the server.
     */
    setTransactionName(name?: string): this;
    /**
     * Sets context data with the given name.
     * @param name of the context
     * @param context an object containing context data. This data will be normalized. Pass `null` to unset the context.
     */
    setContext(name: string, context: Context | null): this;
    /**
     * Returns the `Session` if there is one
     */
    getSession(): Session | undefined;
    /**
     * Sets the `Session` on the scope
     */
    setSession(session?: Session): this;
    /**
     * Returns the `RequestSession` if there is one
     *
     * @deprecated Use `getSession()` and `setSession()` instead of `getRequestSession()` and `setRequestSession()`;
     */
    getRequestSession(): RequestSession | undefined;
    /**
     * Sets the `RequestSession` on the scope
     *
     * @deprecated Use `getSession()` and `setSession()` instead of `getRequestSession()` and `setRequestSession()`;
     */
    setRequestSession(requestSession?: RequestSession): this;
    /**
     * Updates the scope with provided data. Can work in three variations:
     * - plain object containing updatable attributes
     * - Scope instance that'll extract the attributes from
     * - callback function that'll receive the current scope as an argument and allow for modifications
     * @param captureContext scope modifier to be used
     */
    update(captureContext?: CaptureContext): this;
    /** Clears the current scope and resets its properties. */
    clear(): this;
    /**
     * Adds a breadcrumb to the scope
     * @param breadcrumb Breadcrumb
     * @param maxBreadcrumbs number of max breadcrumbs to merged into event.
     */
    addBreadcrumb(breadcrumb: Breadcrumb, maxBreadcrumbs?: number): this;
    /**
     * Get the last breadcrumb.
     */
    getLastBreadcrumb(): Breadcrumb | undefined;
    /**
     * Clears all breadcrumbs from the scope.
     */
    clearBreadcrumbs(): this;
    /**
     * Adds an attachment to the scope
     * @param attachment Attachment options
     */
    addAttachment(attachment: Attachment): this;
    /**
     * Clears attachments from the scope
     */
    clearAttachments(): this;
    /**
     * Add data which will be accessible during event processing but won't get sent to Sentry.
     *
     * TODO(v9): We should type this stricter, so that e.g. `normalizedRequest` is strictly typed.
     */
    setSDKProcessingMetadata(newData: {
        [key: string]: unknown;
    }): this;
    /**
     * Add propagation context to the scope, used for distributed tracing
     */
    setPropagationContext(context: Omit<PropagationContext, 'spanId'> & Partial<Pick<PropagationContext, 'spanId'>>): this;
    /**
     * Get propagation context from the scope, used for distributed tracing
     */
    getPropagationContext(): PropagationContext;
    /**
     * Capture an exception for this scope.
     *
     * @param exception The exception to capture.
     * @param hint Optional additional data to attach to the Sentry event.
     * @returns the id of the captured Sentry event.
     */
    captureException(exception: unknown, hint?: EventHint): string;
    /**
     * Capture a message for this scope.
     *
     * @param message The message to capture.
     * @param level An optional severity level to report the message with.
     * @param hint Optional additional data to attach to the Sentry event.
     * @returns the id of the captured message.
     */
    captureMessage(message: string, level?: SeverityLevel, hint?: EventHint): string;
    /**
     * Capture a Sentry event for this scope.
     *
     * @param event The event to capture.
     * @param hint Optional additional data to attach to the Sentry event.
     * @returns the id of the captured event.
     */
    captureEvent(event: Event, hint?: EventHint): string;
    /**
     * Clone all data from this scope into a new scope.
     */
    clone(): Scope$1;
}

/** JSDoc */
interface Package {
    name: string;
    version: string;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
}

interface SdkInfo {
    name?: string;
    version?: string;
    integrations?: string[];
    packages?: Package[];
}

/** JSDoc */
interface Thread {
    id?: number;
    name?: string;
    stacktrace?: Stacktrace;
    crashed?: boolean;
    current?: boolean;
}

/** An event to be sent to Sentry. */
interface Event {
    event_id?: string;
    message?: string;
    logentry?: {
        message?: string;
        params?: string[];
    };
    timestamp?: number;
    start_timestamp?: number;
    level?: SeverityLevel;
    platform?: string;
    logger?: string;
    server_name?: string;
    release?: string;
    dist?: string;
    environment?: string;
    sdk?: SdkInfo;
    request?: RequestEventData;
    transaction?: string;
    modules?: {
        [key: string]: string;
    };
    fingerprint?: string[];
    exception?: {
        values?: Exception[];
    };
    breadcrumbs?: Breadcrumb[];
    contexts?: Contexts;
    tags?: {
        [key: string]: Primitive;
    };
    extra?: Extras;
    user?: User;
    type?: EventType;
    spans?: SpanJSON[];
    measurements?: Measurements;
    debug_meta?: DebugMeta;
    sdkProcessingMetadata?: {
        [key: string]: unknown;
    } & {
        request?: PolymorphicRequest;
        normalizedRequest?: RequestEventData;
        dynamicSamplingContext?: Partial<DynamicSamplingContext>;
        capturedSpanScope?: Scope$1;
        capturedSpanIsolationScope?: Scope$1;
        spanCountBeforeProcessing?: number;
    };
    transaction_info?: {
        source: TransactionSource;
    };
    threads?: {
        values: Thread[];
    };
}
/**
 * The type of an `Event`.
 * Note that `ErrorEvent`s do not have a type (hence its undefined),
 * while all other events are required to have one.
 */
type EventType = 'transaction' | 'profile' | 'replay_event' | 'feedback' | undefined;
interface ErrorEvent extends Event {
    type: undefined;
}
interface TransactionEvent extends Event {
    type: 'transaction';
    _metrics_summary?: Record<string, Array<MetricSummary>>;
}
/** JSDoc */
interface EventHint {
    event_id?: string;
    captureContext?: CaptureContext;
    mechanism?: Partial<Mechanism>;
    syntheticException?: Error | null;
    originalException?: unknown;
    attachments?: Attachment[];
    data?: any;
    integrations?: string[];
}

/** Integration interface */
interface Integration {
    /**
     * The name of the integration.
     */
    name: string;
    /**
     * This hook is only called once, even if multiple clients are created.
     * It does not receives any arguments, and should only use for e.g. global monkey patching and similar things.
     */
    setupOnce?(): void;
    /**
     * Set up an integration for the given client.
     * Receives the client as argument.
     *
     * Whenever possible, prefer this over `setupOnce`, as that is only run for the first client,
     * whereas `setup` runs for each client. Only truly global things (e.g. registering global handlers)
     * should be done in `setupOnce`.
     */
    setup?(client: Client): void;
    /**
     * This hook is triggered after `setupOnce()` and `setup()` have been called for all integrations.
     * You can use it if it is important that all other integrations have been run before.
     */
    afterAllSetup?(client: Client): void;
    /**
     * An optional hook that allows to preprocess an event _before_ it is passed to all other event processors.
     */
    preprocessEvent?(event: Event, hint: EventHint | undefined, client: Client): void;
    /**
     * An optional hook that allows to process an event.
     * Return `null` to drop the event, or mutate the event & return it.
     * This receives the client that the integration was installed for as third argument.
     */
    processEvent?(event: Event, hint: EventHint, client: Client): Event | null | PromiseLike<Event | null>;
}

/**
 * Crash report feedback object
 */
interface UserFeedback {
    event_id: string;
    email: User['email'];
    name: string;
    comments: string;
}
interface FeedbackContext extends Record<string, unknown> {
    message: string;
    contact_email?: string;
    name?: string;
    replay_id?: string;
    url?: string;
    associated_event_id?: string;
}
/**
 * NOTE: These types are still considered Alpha and subject to change.
 * @hidden
 */
interface FeedbackEvent extends Event {
    type: 'feedback';
    contexts: Event['contexts'] & {
        feedback: FeedbackContext;
    };
}
interface SendFeedbackParams {
    message: string;
    name?: string;
    email?: string;
    url?: string;
    source?: string;
    associatedEventId?: string;
    /**
     * Set an object that will be merged sent as tags data with the event.
     */
    tags?: {
        [key: string]: Primitive;
    };
}

type ThreadId = string;
type FrameId = number;
type StackId = number;
interface ThreadCpuSample {
    stack_id: StackId;
    thread_id: ThreadId;
    queue_address?: string;
    elapsed_since_start_ns: string;
}
interface ContinuousThreadCpuSample {
    stack_id: StackId;
    thread_id: ThreadId;
    queue_address?: string;
    timestamp: number;
}
type ThreadCpuStack = FrameId[];
type ThreadCpuFrame = {
    function?: string;
    file?: string;
    lineno?: number;
    colno?: number;
    abs_path?: string;
    platform?: string;
    instruction_addr?: string;
    module?: string;
    in_app?: boolean;
};
interface ThreadCpuProfile {
    samples: ThreadCpuSample[];
    stacks: ThreadCpuStack[];
    frames: ThreadCpuFrame[];
    thread_metadata: Record<ThreadId, {
        name?: string;
        priority?: number;
    }>;
    queue_metadata?: Record<string, {
        label: string;
    }>;
}
interface ContinuousThreadCpuProfile {
    samples: ContinuousThreadCpuSample[];
    stacks: ThreadCpuStack[];
    frames: ThreadCpuFrame[];
    thread_metadata: Record<ThreadId, {
        name?: string;
        priority?: number;
    }>;
    queue_metadata?: Record<string, {
        label: string;
    }>;
}
interface BaseProfile<T> {
    version: string;
    release: string;
    environment: string;
    platform: string;
    profile: T;
    debug_meta?: {
        images: DebugImage[];
    };
    measurements?: Record<string, {
        unit: MeasurementUnit;
        values: {
            elapsed_since_start_ns: number;
            value: number;
        }[];
    }>;
}
interface Profile extends BaseProfile<ThreadCpuProfile> {
    event_id: string;
    version: string;
    os: {
        name: string;
        version: string;
        build_number?: string;
    };
    runtime: {
        name: string;
        version: string;
    };
    device: {
        architecture: string;
        is_emulator: boolean;
        locale: string;
        manufacturer: string;
        model: string;
    };
    timestamp: string;
    release: string;
    environment: string;
    platform: string;
    profile: ThreadCpuProfile;
    debug_meta?: {
        images: DebugImage[];
    };
    transaction?: {
        name: string;
        id: string;
        trace_id: string;
        active_thread_id: string;
    };
    transactions?: {
        name: string;
        id: string;
        trace_id: string;
        active_thread_id: string;
        relative_start_ns: string;
        relative_end_ns: string;
    }[];
    measurements?: Record<string, {
        unit: MeasurementUnit;
        values: {
            elapsed_since_start_ns: number;
            value: number;
        }[];
    }>;
}
interface ProfileChunk extends BaseProfile<ContinuousThreadCpuProfile> {
    chunk_id: string;
    profiler_id: string;
    client_sdk: {
        name: string;
        version: string;
    };
}

/**
 * NOTE: These types are still considered Beta and subject to change.
 * @hidden
 */
interface ReplayEvent extends Event {
    urls: string[];
    replay_start_timestamp?: number;
    error_ids: string[];
    trace_ids: string[];
    replay_id: string;
    segment_id: number;
    replay_type: ReplayRecordingMode;
}
/**
 * NOTE: These types are still considered Beta and subject to change.
 * @hidden
 */
type ReplayRecordingData = string | Uint8Array;
/**
 * NOTE: These types are still considered Beta and subject to change.
 * @hidden
 */
type ReplayRecordingMode = 'session' | 'buffer';

type DynamicSamplingContext = {
    trace_id: string;
    public_key: DsnComponents['publicKey'];
    sample_rate?: string;
    release?: string;
    environment?: string;
    transaction?: string;
    replay_id?: string;
    sampled?: string;
};
type EnvelopeItemType = 'client_report' | 'user_report' | 'feedback' | 'session' | 'sessions' | 'transaction' | 'attachment' | 'event' | 'profile' | 'profile_chunk' | 'replay_event' | 'replay_recording' | 'check_in' | 'statsd' | 'span' | 'raw_security';
type BaseEnvelopeHeaders = {
    [key: string]: unknown;
    dsn?: string;
    sdk?: SdkInfo;
};
type BaseEnvelopeItemHeaders = {
    [key: string]: unknown;
    type: EnvelopeItemType;
    length?: number;
};
type BaseEnvelopeItem<ItemHeader, P> = [ItemHeader & BaseEnvelopeItemHeaders, P];
type BaseEnvelope<EnvelopeHeader, Item> = [
    EnvelopeHeader & BaseEnvelopeHeaders,
    Array<Item & BaseEnvelopeItem<BaseEnvelopeItemHeaders, unknown>>
];
type EventItemHeaders = {
    type: 'event' | 'transaction' | 'profile' | 'feedback';
};
type AttachmentItemHeaders = {
    type: 'attachment';
    length: number;
    filename: string;
    content_type?: string;
    attachment_type?: AttachmentType;
};
type UserFeedbackItemHeaders = {
    type: 'user_report';
};
type FeedbackItemHeaders = {
    type: 'feedback';
};
type SessionItemHeaders = {
    type: 'session';
};
type SessionAggregatesItemHeaders = {
    type: 'sessions';
};
type ClientReportItemHeaders = {
    type: 'client_report';
};
type ReplayEventItemHeaders = {
    type: 'replay_event';
};
type ReplayRecordingItemHeaders = {
    type: 'replay_recording';
    length: number;
};
type CheckInItemHeaders = {
    type: 'check_in';
};
type ProfileItemHeaders = {
    type: 'profile';
};
type ProfileChunkItemHeaders = {
    type: 'profile_chunk';
};
type StatsdItemHeaders = {
    type: 'statsd';
    length: number;
};
type SpanItemHeaders = {
    type: 'span';
};
type RawSecurityHeaders = {
    type: 'raw_security';
    sentry_release?: string;
    sentry_environment?: string;
};
type EventItem = BaseEnvelopeItem<EventItemHeaders, Event>;
type AttachmentItem = BaseEnvelopeItem<AttachmentItemHeaders, string | Uint8Array>;
type UserFeedbackItem = BaseEnvelopeItem<UserFeedbackItemHeaders, UserFeedback>;
type SessionItem = BaseEnvelopeItem<SessionItemHeaders, SerializedSession> | BaseEnvelopeItem<SessionAggregatesItemHeaders, SessionAggregates>;
type ClientReportItem = BaseEnvelopeItem<ClientReportItemHeaders, ClientReport>;
type CheckInItem = BaseEnvelopeItem<CheckInItemHeaders, SerializedCheckIn>;
type ReplayEventItem = BaseEnvelopeItem<ReplayEventItemHeaders, ReplayEvent>;
type ReplayRecordingItem = BaseEnvelopeItem<ReplayRecordingItemHeaders, ReplayRecordingData>;
type StatsdItem = BaseEnvelopeItem<StatsdItemHeaders, string>;
type FeedbackItem = BaseEnvelopeItem<FeedbackItemHeaders, FeedbackEvent>;
type ProfileItem = BaseEnvelopeItem<ProfileItemHeaders, Profile>;
type ProfileChunkItem = BaseEnvelopeItem<ProfileChunkItemHeaders, ProfileChunk>;
type SpanItem = BaseEnvelopeItem<SpanItemHeaders, Partial<SpanJSON>>;
type RawSecurityItem = BaseEnvelopeItem<RawSecurityHeaders, LegacyCSPReport>;
type EventEnvelopeHeaders = {
    event_id: string;
    sent_at: string;
    trace?: Partial<DynamicSamplingContext>;
};
type SessionEnvelopeHeaders = {
    sent_at: string;
};
type CheckInEnvelopeHeaders = {
    trace?: DynamicSamplingContext;
};
type ClientReportEnvelopeHeaders = BaseEnvelopeHeaders;
type ReplayEnvelopeHeaders = BaseEnvelopeHeaders;
type StatsdEnvelopeHeaders = BaseEnvelopeHeaders;
type SpanEnvelopeHeaders = BaseEnvelopeHeaders & {
    trace?: DynamicSamplingContext;
};
type EventEnvelope = BaseEnvelope<EventEnvelopeHeaders, EventItem | AttachmentItem | UserFeedbackItem | FeedbackItem | ProfileItem>;
type SessionEnvelope = BaseEnvelope<SessionEnvelopeHeaders, SessionItem>;
type ClientReportEnvelope = BaseEnvelope<ClientReportEnvelopeHeaders, ClientReportItem>;
type ReplayEnvelope = [ReplayEnvelopeHeaders, [ReplayEventItem, ReplayRecordingItem]];
type CheckInEnvelope = BaseEnvelope<CheckInEnvelopeHeaders, CheckInItem>;
type StatsdEnvelope = BaseEnvelope<StatsdEnvelopeHeaders, StatsdItem>;
type SpanEnvelope = BaseEnvelope<SpanEnvelopeHeaders, SpanItem>;
type ProfileChunkEnvelope = BaseEnvelope<BaseEnvelopeHeaders, ProfileChunkItem>;
type RawSecurityEnvelope = BaseEnvelope<BaseEnvelopeHeaders, RawSecurityItem>;
type Envelope = EventEnvelope | SessionEnvelope | ClientReportEnvelope | ProfileChunkEnvelope | ReplayEnvelope | CheckInEnvelope | StatsdEnvelope | SpanEnvelope | RawSecurityEnvelope;

/**
 * Context data passed by the user when starting a transaction, to be used by the tracesSampler method.
 */
interface CustomSamplingContext {
    [key: string]: any;
}
/**
 * Data passed to the `tracesSampler` function, which forms the basis for whatever decisions it might make.
 *
 * Adds default data to data provided by the user. See {@link Hub.startTransaction}
 */
interface SamplingContext extends CustomSamplingContext {
    /**
     * Context data with which transaction being sampled was created.
     * @deprecated This is duplicate data and will be removed eventually.
     */
    transactionContext: {
        name: string;
        parentSampled?: boolean | undefined;
    };
    /**
     * Sampling decision from the parent transaction, if any.
     */
    parentSampled?: boolean;
    /**
     * Object representing the URL of the current page or worker script. Passed by default when using the `BrowserTracing`
     * integration.
     */
    location?: WorkerLocation;
    /**
     * Object representing the incoming request to a node server.
     * @deprecated This attribute is currently never defined and will be removed in v9. Use `normalizedRequest` instead
     */
    request?: ExtractedNodeRequestData;
    /**
     * Object representing the incoming request to a node server in a normalized format.
     */
    normalizedRequest?: RequestEventData;
    /** The name of the span being sampled. */
    name: string;
    /** Initial attributes that have been passed to the span being sampled. */
    attributes?: SpanAttributes;
}

interface SdkMetadata {
    sdk?: SdkInfo;
}

type TransportRequest = {
    body: string | Uint8Array;
};
type TransportMakeRequestResponse = {
    statusCode?: number;
    headers?: {
        [key: string]: string | null;
        'x-sentry-rate-limits': string | null;
        'retry-after': string | null;
    };
};
interface InternalBaseTransportOptions {
    /**
     * @ignore
     * Users should pass the tunnel property via the init/client options.
     * This is only used by the SDK to pass the tunnel to the transport.
     */
    tunnel?: string;
    bufferSize?: number;
    recordDroppedEvent: Client['recordDroppedEvent'];
}
interface BaseTransportOptions extends InternalBaseTransportOptions {
    url: string;
}
interface Transport {
    send(request: Envelope): PromiseLike<TransportMakeRequestResponse>;
    flush(timeout?: number): PromiseLike<boolean>;
}
type TransportRequestExecutor = (request: TransportRequest) => PromiseLike<TransportMakeRequestResponse>;

interface ClientOptions<TO extends BaseTransportOptions = BaseTransportOptions> {
    /**
     * Enable debug functionality in the SDK itself
     */
    debug?: boolean;
    /**
     * Specifies whether this SDK should send events to Sentry.
     * Defaults to true.
     */
    enabled?: boolean;
    /** Attaches stacktraces to pure capture message / log integrations */
    attachStacktrace?: boolean;
    /**
     * A flag enabling Sessions Tracking feature.
     * By default, Session Tracking is enabled.
     *
     * @deprecated Setting the `autoSessionTracking` option is deprecated.
     * To enable session tracking, it is recommended to unset `autoSessionTracking` and ensure that either, in browser environments the `browserSessionIntegration` is added, or in server environments the `httpIntegration` is added.
     * To disable session tracking, it is recommended unset `autoSessionTracking` and to remove the `browserSessionIntegration` in browser environments, or in server environments configure the `httpIntegration` with the `trackIncomingRequestsAsSessions` option set to `false`.
     */
    autoSessionTracking?: boolean;
    /**
     * Send SDK Client Reports. When calling `Sentry.init()`, this option defaults to `true`.
     */
    sendClientReports?: boolean;
    /**
     * The Dsn used to connect to Sentry and identify the project. If omitted, the
     * SDK will not send any data to Sentry.
     */
    dsn?: string;
    /**
     * The release identifier used when uploading respective source maps. Specify
     * this value to allow Sentry to resolve the correct source maps when
     * processing events.
     */
    release?: string;
    /** The current environment of your application (e.g. "production"). */
    environment?: string;
    /** Sets the distribution for all events */
    dist?: string;
    /**
     * List of integrations that should be installed after SDK was initialized.
     */
    integrations: Integration[];
    /**
     * A function that takes transport options and returns the Transport object which is used to send events to Sentry.
     * The function is invoked internally when the client is initialized.
     */
    transport: (transportOptions: TO) => Transport;
    /**
     * A stack parser implementation
     * By default, a stack parser is supplied for all supported platforms
     */
    stackParser: StackParser;
    /**
     * Options for the default transport that the SDK uses.
     */
    transportOptions?: Partial<TO>;
    /**
     * Sample rate to determine trace sampling.
     *
     * 0.0 = 0% chance of a given trace being sent (send no traces) 1.0 = 100% chance of a given trace being sent (send
     * all traces)
     *
     * Tracing is enabled if either this or `tracesSampler` is defined. If both are defined, `tracesSampleRate` is
     * ignored.
     */
    tracesSampleRate?: number;
    /**
     * If this is enabled, spans and trace data will be generated and captured.
     * This will set the `tracesSampleRate` to the recommended default of `1.0` if `tracesSampleRate` is undefined.
     * Note that `tracesSampleRate` and `tracesSampler` take precedence over this option.
     *
     * @deprecated This option is deprecated and will be removed in the next major version. If you want to enable performance
     * monitoring, please use the `tracesSampleRate` or `tracesSampler` options instead. If you wan't to disable performance
     * monitoring, remove the `tracesSampler` and `tracesSampleRate` options.
     */
    enableTracing?: boolean;
    /**
     * If this is enabled, any spans started will always have their parent be the active root span,
     * if there is any active span.
     *
     * This is necessary because in some environments (e.g. browser),
     * we cannot guarantee an accurate active span.
     * Because we cannot properly isolate execution environments,
     * you may get wrong results when using e.g. nested `startSpan()` calls.
     *
     * To solve this, in these environments we'll by default enable this option.
     */
    parentSpanIsAlwaysRootSpan?: boolean;
    /**
     * Initial data to populate scope.
     */
    initialScope?: CaptureContext;
    /**
     * The maximum number of breadcrumbs sent with events. Defaults to 100.
     * Sentry has a maximum payload size of 1MB and any events exceeding that payload size will be dropped.
     */
    maxBreadcrumbs?: number;
    /**
     * A global sample rate to apply to all events.
     *
     * 0.0 = 0% chance of a given event being sent (send no events) 1.0 = 100% chance of a given event being sent (send
     * all events)
     */
    sampleRate?: number;
    /** Maximum number of chars a single value can have before it will be truncated. */
    maxValueLength?: number;
    /**
     * Maximum number of levels that normalization algorithm will traverse in objects and arrays.
     * Used when normalizing an event before sending, on all of the listed attributes:
     * - `breadcrumbs.data`
     * - `user`
     * - `contexts`
     * - `extra`
     * Defaults to `3`. Set to `0` to disable.
     */
    normalizeDepth?: number;
    /**
     * Maximum number of properties or elements that the normalization algorithm will output in any single array or object included in the normalized event.
     * Used when normalizing an event before sending, on all of the listed attributes:
     * - `breadcrumbs.data`
     * - `user`
     * - `contexts`
     * - `extra`
     * Defaults to `1000`
     */
    normalizeMaxBreadth?: number;
    /**
     * Controls how many milliseconds to wait before shutting down. The default is
     * SDK-specific but typically around 2 seconds. Setting this too low can cause
     * problems for sending events from command line applications. Setting it too
     * high can cause the application to block for users with network connectivity
     * problems.
     */
    shutdownTimeout?: number;
    /**
     * A pattern for error messages which should not be sent to Sentry.
     * By default, all errors will be sent.
     */
    ignoreErrors?: Array<string | RegExp>;
    /**
     * A pattern for transaction names which should not be sent to Sentry.
     * By default, all transactions will be sent.
     */
    ignoreTransactions?: Array<string | RegExp>;
    /**
     * A URL to an envelope tunnel endpoint. An envelope tunnel is an HTTP endpoint
     * that accepts Sentry envelopes for forwarding. This can be used to force data
     * through a custom server independent of the type of data.
     */
    tunnel?: string;
    /**
     * Controls if potentially sensitive data should be sent to Sentry by default.
     * Note that this only applies to data that the SDK is sending by default
     * but not data that was explicitly set (e.g. by calling `Sentry.setUser()`).
     *
     * Defaults to `false`.
     *
     * NOTE: This option currently controls only a few data points in a selected
     * set of SDKs. The goal for this option is to eventually control all sensitive
     * data the SDK sets by default. However, this would be a breaking change so
     * until the next major update this option only controls data points which were
     * added in versions above `7.9.0`.
     */
    sendDefaultPii?: boolean;
    /**
     * Set of metadata about the SDK that can be internally used to enhance envelopes and events,
     * and provide additional data about every request.
     */
    _metadata?: SdkMetadata;
    /**
     * Options which are in beta, or otherwise not guaranteed to be stable.
     */
    _experiments?: {
        [key: string]: any;
    };
    /**
     * A pattern for error URLs which should exclusively be sent to Sentry.
     * This is the opposite of {@link Options.denyUrls}.
     * By default, all errors will be sent.
     *
     * Requires the use of the `InboundFilters` integration.
     */
    allowUrls?: Array<string | RegExp>;
    /**
     * A pattern for error URLs which should not be sent to Sentry.
     * To allow certain errors instead, use {@link Options.allowUrls}.
     * By default, all errors will be sent.
     *
     * Requires the use of the `InboundFilters` integration.
     */
    denyUrls?: Array<string | RegExp>;
    /**
     * List of strings and/or Regular Expressions used to determine which outgoing requests will have `sentry-trace` and `baggage`
     * headers attached.
     *
     * **Default:** If this option is not provided, tracing headers will be attached to all outgoing requests.
     * If you are using a browser SDK, by default, tracing headers will only be attached to outgoing requests to the same origin.
     *
     * **Disclaimer:** Carelessly setting this option in browser environments may result into CORS errors!
     * Only attach tracing headers to requests to the same origin, or to requests to services you can control CORS headers of.
     * Cross-origin requests, meaning requests to a different domain, for example a request to `https://api.example.com/` while you're on `https://example.com/`, take special care.
     * If you are attaching headers to cross-origin requests, make sure the backend handling the request returns a `"Access-Control-Allow-Headers: sentry-trace, baggage"` header to ensure your requests aren't blocked.
     *
     * If you provide a `tracePropagationTargets` array, the entries you provide will be matched against the entire URL of the outgoing request.
     * If you are using a browser SDK, the entries will also be matched against the pathname of the outgoing requests.
     * This is so you can have matchers for relative requests, for example, `/^\/api/` if you want to trace requests to your `/api` routes on the same domain.
     *
     * If any of the two match any of the provided values, tracing headers will be attached to the outgoing request.
     * Both, the string values, and the RegExes you provide in the array will match if they partially match the URL or pathname.
     *
     * Examples:
     * - `tracePropagationTargets: [/^\/api/]` and request to `https://same-origin.com/api/posts`:
     *   - Tracing headers will be attached because the request is sent to the same origin and the regex matches the pathname "/api/posts".
     * - `tracePropagationTargets: [/^\/api/]` and request to `https://different-origin.com/api/posts`:
     *   - Tracing headers will not be attached because the pathname will only be compared when the request target lives on the same origin.
     * - `tracePropagationTargets: [/^\/api/, 'https://external-api.com']` and request to `https://external-api.com/v1/data`:
     *   - Tracing headers will be attached because the request URL matches the string `'https://external-api.com'`.
     */
    tracePropagationTargets?: TracePropagationTargets;
    /**
     * Function to compute tracing sample rate dynamically and filter unwanted traces.
     *
     * Tracing is enabled if either this or `tracesSampleRate` is defined. If both are defined, `tracesSampleRate` is
     * ignored.
     *
     * Will automatically be passed a context object of default and optional custom data. See
     * {@link Transaction.samplingContext} and {@link Hub.startTransaction}.
     *
     * @returns A sample rate between 0 and 1 (0 drops the trace, 1 guarantees it will be sent). Returning `true` is
     * equivalent to returning 1 and returning `false` is equivalent to returning 0.
     */
    tracesSampler?: (samplingContext: SamplingContext) => number | boolean;
    /**
     * An event-processing callback for error and message events, guaranteed to be invoked after all other event
     * processors, which allows an event to be modified or dropped.
     *
     * Note that you must return a valid event from this callback. If you do not wish to modify the event, simply return
     * it at the end. Returning `null` will cause the event to be dropped.
     *
     * @param event The error or message event generated by the SDK.
     * @param hint Event metadata useful for processing.
     * @returns A new event that will be sent | null.
     */
    beforeSend?: (event: ErrorEvent, hint: EventHint) => PromiseLike<ErrorEvent | null> | ErrorEvent | null;
    /**
     * This function can be defined to modify or entirely drop a child span before it's sent.
     * Returning `null` will cause this span to be dropped.
     *
     * Note that this function is only called for child spans and not for the root span (formerly known as transaction).
     * If you want to modify or drop the root span, use {@link Options.beforeSendTransaction} instead.
     *
     * @param span The span generated by the SDK.
     *
     * @returns A new span that will be sent or null if the span should not be sent.
     */
    beforeSendSpan?: (span: SpanJSON) => SpanJSON | null;
    /**
     * An event-processing callback for transaction events, guaranteed to be invoked after all other event
     * processors. This allows an event to be modified or dropped before it's sent.
     *
     * Note that you must return a valid event from this callback. If you do not wish to modify the event, simply return
     * it at the end. Returning `null` will cause the event to be dropped.
     *
     * @param event The error or message event generated by the SDK.
     * @param hint Event metadata useful for processing.
     * @returns A new event that will be sent | null.
     */
    beforeSendTransaction?: (event: TransactionEvent, hint: EventHint) => PromiseLike<TransactionEvent | null> | TransactionEvent | null;
    /**
     * A callback invoked when adding a breadcrumb, allowing to optionally modify
     * it before adding it to future events.
     *
     * Note that you must return a valid breadcrumb from this callback. If you do
     * not wish to modify the breadcrumb, simply return it at the end.
     * Returning null will cause the breadcrumb to be dropped.
     *
     * @param breadcrumb The breadcrumb as created by the SDK.
     * @returns The breadcrumb that will be added | null.
     */
    beforeBreadcrumb?: (breadcrumb: Breadcrumb, hint?: BreadcrumbHint) => Breadcrumb | null;
}
/** Base configuration options for every SDK. */
interface Options<TO extends BaseTransportOptions = BaseTransportOptions> extends Omit<Partial<ClientOptions<TO>>, 'integrations' | 'transport' | 'stackParser'> {
    /**
     * If this is set to false, default integrations will not be added, otherwise this will internally be set to the
     * recommended default integrations.
     */
    defaultIntegrations?: false | Integration[];
    /**
     * List of integrations that should be installed after SDK was initialized.
     * Accepts either a list of integrations or a function that receives
     * default integrations and returns a new, updated list.
     */
    integrations?: Integration[] | ((integrations: Integration[]) => Integration[]);
    /**
     * A function that takes transport options and returns the Transport object which is used to send events to Sentry.
     * The function is invoked internally during SDK initialization.
     * By default, the SDK initializes its default transports.
     */
    transport?: (transportOptions: TO) => Transport;
    /**
     * A stack parser implementation or an array of stack line parsers
     * By default, a stack parser is supplied for all supported browsers
     */
    stackParser?: StackParser | StackLineParser[];
}

type ParameterizedString = string & {
    __sentry_template_string__?: string;
    __sentry_template_values__?: string[];
};

interface StartSpanOptions {
    /** A manually specified start time for the created `Span` object. */
    startTime?: SpanTimeInput;
    /** If defined, start this span off this scope instead off the current scope. */
    scope?: Scope$1;
    /** The name of the span. */
    name: string;
    /** If set to true, only start a span if a parent span exists. */
    onlyIfParent?: boolean;
    /** An op for the span. This is a categorization for spans. */
    op?: string;
    /**
     * If provided, make the new span a child of this span.
     * If this is not provided, the new span will be a child of the currently active span.
     * If this is set to `null`, the new span will have no parent span.
     */
    parentSpan?: Span | null;
    /**
     * If set to true, this span will be forced to be treated as a transaction in the Sentry UI, if possible and applicable.
     * Note that it is up to the SDK to decide how exactly the span will be sent, which may change in future SDK versions.
     * It is not guaranteed that a span started with this flag set to `true` will be sent as a transaction.
     */
    forceTransaction?: boolean;
    /** Attributes for the span. */
    attributes?: SpanAttributes;
    /**
     * Experimental options without any stability guarantees. Use with caution!
     */
    experimental?: {
        /**
         * If set to true, always start a standalone span which will be sent as a
         * standalone segment span envelope instead of a transaction envelope.
         *
         * @internal this option is currently experimental and should only be
         * used within SDK code. It might be removed or changed in the future.
         * The payload ("envelope") of the resulting request sending the span to
         * Sentry might change at any time.
         *
         * @hidden
         */
        standalone?: boolean;
    };
}

/**
 * User-Facing Sentry SDK Client.
 *
 * This interface contains all methods to interface with the SDK once it has
 * been installed. It allows to send events to Sentry, record breadcrumbs and
 * set a context included in every event. Since the SDK mutates its environment,
 * there will only be one instance during runtime.
 *
 */
interface Client<O extends ClientOptions = ClientOptions> {
    /**
     * Captures an exception event and sends it to Sentry.
     *
     * Unlike `captureException` exported from every SDK, this method requires that you pass it the current scope.
     *
     * @param exception An exception-like object.
     * @param hint May contain additional information about the original exception.
     * @param currentScope An optional scope containing event metadata.
     * @returns The event id
     */
    captureException(exception: any, hint?: EventHint, currentScope?: Scope$1): string;
    /**
     * Captures a message event and sends it to Sentry.
     *
     * Unlike `captureMessage` exported from every SDK, this method requires that you pass it the current scope.
     *
     * @param message The message to send to Sentry.
     * @param level Define the level of the message.
     * @param hint May contain additional information about the original exception.
     * @param currentScope An optional scope containing event metadata.
     * @returns The event id
     */
    captureMessage(message: string, level?: SeverityLevel, hint?: EventHint, currentScope?: Scope$1): string;
    /**
     * Captures a manually created event and sends it to Sentry.
     *
     * Unlike `captureEvent` exported from every SDK, this method requires that you pass it the current scope.
     *
     * @param event The event to send to Sentry.
     * @param hint May contain additional information about the original exception.
     * @param currentScope An optional scope containing event metadata.
     * @returns The event id
     */
    captureEvent(event: Event, hint?: EventHint, currentScope?: Scope$1): string;
    /**
     * Captures a session
     *
     * @param session Session to be delivered
     */
    captureSession(session: Session): void;
    /**
     * Create a cron monitor check in and send it to Sentry. This method is not available on all clients.
     *
     * @param checkIn An object that describes a check in.
     * @param upsertMonitorConfig An optional object that describes a monitor config. Use this if you want
     * to create a monitor automatically when sending a check in.
     * @param scope An optional scope containing event metadata.
     * @returns A string representing the id of the check in.
     */
    captureCheckIn?(checkIn: CheckIn, monitorConfig?: MonitorConfig, scope?: Scope$1): string;
    /** Returns the current Dsn. */
    getDsn(): DsnComponents | undefined;
    /** Returns the current options. */
    getOptions(): O;
    /**
     * @inheritdoc
     *
     */
    getSdkMetadata(): SdkMetadata | undefined;
    /**
     * Returns the transport that is used by the client.
     * Please note that the transport gets lazy initialized so it will only be there once the first event has been sent.
     *
     * @returns The transport.
     */
    getTransport(): Transport | undefined;
    /**
     * Flush the event queue and set the client to `enabled = false`. See {@link Client.flush}.
     *
     * @param timeout Maximum time in ms the client should wait before shutting down. Omitting this parameter will cause
     *   the client to wait until all events are sent before disabling itself.
     * @returns A promise which resolves to `true` if the flush completes successfully before the timeout, or `false` if
     * it doesn't.
     */
    close(timeout?: number): PromiseLike<boolean>;
    /**
     * Wait for all events to be sent or the timeout to expire, whichever comes first.
     *
     * @param timeout Maximum time in ms the client should wait for events to be flushed. Omitting this parameter will
     *   cause the client to wait until all events are sent before resolving the promise.
     * @returns A promise that will resolve with `true` if all events are sent before the timeout, or `false` if there are
     * still events in the queue when the timeout is reached.
     */
    flush(timeout?: number): PromiseLike<boolean>;
    /**
     * Adds an event processor that applies to any event processed by this client.
     */
    addEventProcessor(eventProcessor: EventProcessor): void;
    /**
     * Get all added event processors for this client.
     */
    getEventProcessors(): EventProcessor[];
    /** Get the instance of the integration with the given name on the client, if it was added. */
    getIntegrationByName<T extends Integration = Integration>(name: string): T | undefined;
    /**
     * Add an integration to the client.
     * This can be used to e.g. lazy load integrations.
     * In most cases, this should not be necessary, and you're better off just passing the integrations via `integrations: []` at initialization time.
     * However, if you find the need to conditionally load & add an integration, you can use `addIntegration` to do so.
     *
     * */
    addIntegration(integration: Integration): void;
    /**
     * Initialize this client.
     * Call this after the client was set on a scope.
     */
    init(): void;
    /** Creates an {@link Event} from all inputs to `captureException` and non-primitive inputs to `captureMessage`. */
    eventFromException(exception: any, hint?: EventHint): PromiseLike<Event>;
    /** Creates an {@link Event} from primitive inputs to `captureMessage`. */
    eventFromMessage(message: ParameterizedString, level?: SeverityLevel, hint?: EventHint): PromiseLike<Event>;
    /** Submits the event to Sentry */
    sendEvent(event: Event, hint?: EventHint): void;
    /** Submits the session to Sentry */
    sendSession(session: Session | SessionAggregates): void;
    /** Sends an envelope to Sentry */
    sendEnvelope(envelope: Envelope): PromiseLike<TransportMakeRequestResponse>;
    /**
     * Record on the client that an event got dropped (ie, an event that will not be sent to sentry).
     *
     * @param reason The reason why the event got dropped.
     * @param category The data category of the dropped event.
     * @param event The dropped event.
     */
    recordDroppedEvent(reason: EventDropReason, dataCategory: DataCategory, event?: Event): void;
    /**
     * Register a callback for whenever a span is started.
     * Receives the span as argument.
     * @returns A function that, when executed, removes the registered callback.
     */
    on(hook: 'spanStart', callback: (span: Span) => void): () => void;
    /**
     * Register a callback before span sampling runs. Receives a `samplingDecision` object argument with a `decision`
     * property that can be used to make a sampling decision that will be enforced, before any span sampling runs.
     * @returns A function that, when executed, removes the registered callback.
     */
    on(hook: 'beforeSampling', callback: (samplingData: {
        spanAttributes: SpanAttributes;
        spanName: string;
        parentSampled?: boolean;
        parentContext?: SpanContextData;
    }, samplingDecision: {
        decision: boolean;
    }) => void): void;
    /**
     * Register a callback for whenever a span is ended.
     * Receives the span as argument.
     * @returns A function that, when executed, removes the registered callback.
     */
    on(hook: 'spanEnd', callback: (span: Span) => void): () => void;
    /**
     * Register a callback for when an idle span is allowed to auto-finish.
     * @returns A function that, when executed, removes the registered callback.
     */
    on(hook: 'idleSpanEnableAutoFinish', callback: (span: Span) => void): () => void;
    /**
     * Register a callback for transaction start and finish.
     * @returns A function that, when executed, removes the registered callback.
     */
    on(hook: 'beforeEnvelope', callback: (envelope: Envelope) => void): () => void;
    /**
     * Register a callback that runs when stack frame metadata should be applied to an event.
     * @returns A function that, when executed, removes the registered callback.
     */
    on(hook: 'applyFrameMetadata', callback: (event: Event) => void): () => void;
    /**
     * Register a callback for before sending an event.
     * This is called right before an event is sent and should not be used to mutate the event.
     * Receives an Event & EventHint as arguments.
     * @returns A function that, when executed, removes the registered callback.
     */
    on(hook: 'beforeSendEvent', callback: (event: Event, hint?: EventHint | undefined) => void): () => void;
    /**
     * Register a callback for preprocessing an event,
     * before it is passed to (global) event processors.
     * Receives an Event & EventHint as arguments.
     * @returns A function that, when executed, removes the registered callback.
     */
    on(hook: 'preprocessEvent', callback: (event: Event, hint?: EventHint | undefined) => void): () => void;
    /**
     * Register a callback for when an event has been sent.
     * @returns A function that, when executed, removes the registered callback.
     */
    on(hook: 'afterSendEvent', callback: (event: Event, sendResponse: TransportMakeRequestResponse) => void): () => void;
    /**
     * Register a callback before a breadcrumb is added.
     * @returns A function that, when executed, removes the registered callback.
     */
    on(hook: 'beforeAddBreadcrumb', callback: (breadcrumb: Breadcrumb, hint?: BreadcrumbHint) => void): () => void;
    /**
     * Register a callback when a DSC (Dynamic Sampling Context) is created.
     * @returns A function that, when executed, removes the registered callback.
     */
    on(hook: 'createDsc', callback: (dsc: DynamicSamplingContext, rootSpan?: Span) => void): () => void;
    /**
     * Register a callback when a Feedback event has been prepared.
     * This should be used to mutate the event. The options argument can hint
     * about what kind of mutation it expects.
     * @returns A function that, when executed, removes the registered callback.
     */
    on(hook: 'beforeSendFeedback', callback: (feedback: FeedbackEvent, options?: {
        includeReplay?: boolean;
    }) => void): () => void;
    /**
     * A hook for the browser tracing integrations to trigger a span start for a page load.
     * @returns A function that, when executed, removes the registered callback.
     */
    on(hook: 'startPageLoadSpan', callback: (options: StartSpanOptions, traceOptions?: {
        sentryTrace?: string | undefined;
        baggage?: string | undefined;
    }) => void): () => void;
    /**
     * A hook for browser tracing integrations to trigger a span for a navigation.
     * @returns A function that, when executed, removes the registered callback.
     */
    on(hook: 'startNavigationSpan', callback: (options: StartSpanOptions) => void): () => void;
    /**
     * A hook that is called when the client is flushing
     * @returns A function that, when executed, removes the registered callback.
     */
    on(hook: 'flush', callback: () => void): () => void;
    /**
     * A hook that is called when the client is closing
     * @returns A function that, when executed, removes the registered callback.
     */
    on(hook: 'close', callback: () => void): () => void;
    /** Fire a hook whenever a span starts. */
    emit(hook: 'spanStart', span: Span): void;
    /** A hook that is called every time before a span is sampled. */
    emit(hook: 'beforeSampling', samplingData: {
        spanAttributes: SpanAttributes;
        spanName: string;
        parentSampled?: boolean;
        parentContext?: SpanContextData;
    }, samplingDecision: {
        decision: boolean;
    }): void;
    /** Fire a hook whenever a span ends. */
    emit(hook: 'spanEnd', span: Span): void;
    /**
     * Fire a hook indicating that an idle span is allowed to auto finish.
     */
    emit(hook: 'idleSpanEnableAutoFinish', span: Span): void;
    emit(hook: 'beforeEnvelope', envelope: Envelope): void;
    emit(hook: 'applyFrameMetadata', event: Event): void;
    /**
     * Fire a hook event before sending an event.
     * This is called right before an event is sent and should not be used to mutate the event.
     * Expects to be given an Event & EventHint as the second/third argument.
     */
    emit(hook: 'beforeSendEvent', event: Event, hint?: EventHint): void;
    /**
     * Fire a hook event to process events before they are passed to (global) event processors.
     * Expects to be given an Event & EventHint as the second/third argument.
     */
    emit(hook: 'preprocessEvent', event: Event, hint?: EventHint): void;
    emit(hook: 'afterSendEvent', event: Event, sendResponse: TransportMakeRequestResponse): void;
    /**
     * Fire a hook for when a breadcrumb is added. Expects the breadcrumb as second argument.
     */
    emit(hook: 'beforeAddBreadcrumb', breadcrumb: Breadcrumb, hint?: BreadcrumbHint): void;
    /**
     * Fire a hook for when a DSC (Dynamic Sampling Context) is created. Expects the DSC as second argument.
     */
    emit(hook: 'createDsc', dsc: DynamicSamplingContext, rootSpan?: Span): void;
    /**
     * Fire a hook event for after preparing a feedback event. Events to be given
     * a feedback event as the second argument, and an optional options object as
     * third argument.
     */
    emit(hook: 'beforeSendFeedback', feedback: FeedbackEvent, options?: {
        includeReplay?: boolean;
    }): void;
    /**
     * Emit a hook event for browser tracing integrations to trigger a span start for a page load.
     */
    emit(hook: 'startPageLoadSpan', options: StartSpanOptions, traceOptions?: {
        sentryTrace?: string | undefined;
        baggage?: string | undefined;
    }): void;
    /**
     * Emit a hook event for browser tracing integrations to trigger a span for a navigation.
     */
    emit(hook: 'startNavigationSpan', options: StartSpanOptions): void;
    /**
     * Emit a hook event for client flush
     */
    emit(hook: 'flush'): void;
    /**
     * Emit a hook event for client close
     */
    emit(hook: 'close'): void;
}

interface MetricData {
    unit?: MeasurementUnit;
    tags?: Record<string, Primitive>;
    timestamp?: number;
    client?: Client;
}
/**
 * A metrics aggregator that aggregates metrics in memory and flushes them periodically.
 */
interface MetricsAggregator {
    /**
     * Add a metric to the aggregator.
     */
    add(metricType: 'c' | 'g' | 's' | 'd', name: string, value: number | string, unit?: MeasurementUnit, tags?: Record<string, Primitive>, timestamp?: number): void;
    /**
     * Flushes the current metrics to the transport via the transport.
     */
    flush(): void;
    /**
     * Shuts down metrics aggregator and clears all metrics.
     */
    close(): void;
    /**
     * Returns a string representation of the aggregator.
     */
    toString(): string;
}
interface Metrics {
    /**
     * Adds a value to a counter metric
     *
     * @experimental This API is experimental and might have breaking changes in the future.
     */
    increment(name: string, value?: number, data?: MetricData): void;
    /**
     * Adds a value to a distribution metric
     *
     * @experimental This API is experimental and might have breaking changes in the future.
     */
    distribution(name: string, value: number, data?: MetricData): void;
    /**
     * Adds a value to a set metric. Value must be a string or integer.
     *
     * @experimental This API is experimental and might have breaking changes in the future.
     */
    set(name: string, value: number | string, data?: MetricData): void;
    /**
     * Adds a value to a gauge metric
     *
     * @experimental This API is experimental and might have breaking changes in the future.
     */
    gauge(name: string, value: number, data?: MetricData): void;
    /**
     * Adds a timing metric.
     * The metric is added as a distribution metric.
     *
     * You can either directly capture a numeric `value`, or wrap a callback function in `timing`.
     * In the latter case, the duration of the callback execution will be captured as a span & a metric.
     *
     * @experimental This API is experimental and might have breaking changes in the future.
     */
    timing(name: string, value: number, unit?: DurationUnit, data?: Omit<MetricData, 'unit'>): void;
    timing<T>(name: string, callback: () => T, unit?: DurationUnit, data?: Omit<MetricData, 'unit'>): T;
}

/**
 * Make the given client the current client.
 */
declare function setCurrentClient(client: Client): void;

/**
 * Extracts trace propagation data from the current span or from the client's scope (via transaction or propagation
 * context) and serializes it to `sentry-trace` and `baggage` values to strings. These values can be used to propagate
 * a trace via our tracing Http headers or Html `<meta>` tags.
 *
 * This function also applies some validation to the generated sentry-trace and baggage values to ensure that
 * only valid strings are returned.
 *
 * @returns an object with the tracing data values. The object keys are the name of the tracing key to be used as header
 * or meta tag name.
 */
declare function getTraceData(options?: {
    span?: Span;
}): SerializedTraceData;

/**
 * Create a propagation context from incoming headers or
 * creates a minimal new one if the headers are undefined.
 */
declare function propagationContextFromHeaders(sentryTrace: string | undefined, baggage: string | number | boolean | string[] | null | undefined): PropagationContext;

/**
 * Wraps a function with a transaction/span and finishes the span after the function is done.
 * The created span is the active span and will be used as parent by other spans created inside the function
 * and can be accessed via `Sentry.getActiveSpan()`, as long as the function is executed while the scope is active.
 *
 * If you want to create a span that is not set as active, use {@link startInactiveSpan}.
 *
 * You'll always get a span passed to the callback,
 * it may just be a non-recording span if the span is not sampled or if tracing is disabled.
 */
declare function startSpan<T>(options: StartSpanOptions, callback: (span: Span) => T): T;
/**
 * Similar to `Sentry.startSpan`. Wraps a function with a transaction/span, but does not finish the span
 * after the function is done automatically. You'll have to call `span.end()` manually.
 *
 * The created span is the active span and will be used as parent by other spans created inside the function
 * and can be accessed via `Sentry.getActiveSpan()`, as long as the function is executed while the scope is active.
 *
 * You'll always get a span passed to the callback,
 * it may just be a non-recording span if the span is not sampled or if tracing is disabled.
 */
declare function startSpanManual<T>(options: StartSpanOptions, callback: (span: Span, finish: () => void) => T): T;
/**
 * Creates a span. This span is not set as active, so will not get automatic instrumentation spans
 * as children or be able to be accessed via `Sentry.getActiveSpan()`.
 *
 * If you want to create a span that is set as active, use {@link startSpan}.
 *
 * This function will always return a span,
 * it may just be a non-recording span if the span is not sampled or if tracing is disabled.
 */
declare function startInactiveSpan(options: StartSpanOptions): Span;
/**
 * Continue a trace from `sentry-trace` and `baggage` values.
 * These values can be obtained from incoming request headers, or in the browser from `<meta name="sentry-trace">`
 * and `<meta name="baggage">` HTML tags.
 *
 * Spans started with `startSpan`, `startSpanManual` and `startInactiveSpan`, within the callback will automatically
 * be attached to the incoming trace.
 */
declare const continueTrace: <V>(options: {
    sentryTrace: Parameters<typeof propagationContextFromHeaders>[0];
    baggage: Parameters<typeof propagationContextFromHeaders>[1];
}, callback: () => V) => V;
/** Suppress tracing in the given callback, ensuring no spans are generated inside of it. */
declare function suppressTracing<T>(callback: () => T): T;
/**
 * Starts a new trace for the duration of the provided callback. Spans started within the
 * callback will be part of the new trace instead of a potentially previously started trace.
 *
 * Important: Only use this function if you want to override the default trace lifetime and
 * propagation mechanism of the SDK for the duration and scope of the provided callback.
 * The newly created trace will also be the root of a new distributed trace, for example if
 * you make http requests within the callback.
 * This function might be useful if the operation you want to instrument should not be part
 * of a potentially ongoing trace.
 *
 * Default behavior:
 * - Server-side: A new trace is started for each incoming request.
 * - Browser: A new trace is started for each page our route. Navigating to a new route
 *            or page will automatically create a new trace.
 */
declare function startNewTrace<T>(callback: () => T): T;

/**
 * Convert a Span to a Sentry trace header.
 */
declare function spanToTraceHeader(span: Span): string;
/**
 * Convert a span to a JSON representation.
 */
declare function spanToJSON(span: Span): Partial<SpanJSON>;
declare const CHILD_SPANS_FIELD = "_sentryChildSpans";
declare const ROOT_SPAN_FIELD = "_sentryRootSpan";
type SpanWithPotentialChildren = Span & {
    [CHILD_SPANS_FIELD]?: Set<Span>;
    [ROOT_SPAN_FIELD]?: Span;
};
/**
 * Returns the root span of a given span.
 */
declare function getRootSpan(span: SpanWithPotentialChildren): Span;
/**
 * Returns the currently active span.
 */
declare function getActiveSpan(): Span | undefined;
/**
 * Updates the name of the given span and ensures that the span name is not
 * overwritten by the Sentry SDK.
 *
 * Use this function instead of `span.updateName()` if you want to make sure that
 * your name is kept. For some spans, for example root `http.server` spans the
 * Sentry SDK would otherwise overwrite the span name with a high-quality name
 * it infers when the span ends.
 *
 * Use this function in server code or when your span is started on the server
 * and on the client (browser). If you only update a span name on the client,
 * you can also use `span.updateName()` the SDK does not overwrite the name.
 *
 * @param span - The span to update the name of.
 * @param name - The name to set on the span.
 */
declare function updateSpanName(span: Span, name: string): void;

/** Map of integrations assigned to a client */
type IntegrationIndex = {
    [key: string]: Integration;
};

/**
 * Holds additional event information.
 */
declare class ScopeClass implements Scope$1 {
    /** Flag if notifying is happening. */
    protected _notifyingListeners: boolean;
    /** Callback for client to receive scope changes. */
    protected _scopeListeners: Array<(scope: Scope) => void>;
    /** Callback list that will be called during event processing. */
    protected _eventProcessors: EventProcessor[];
    /** Array of breadcrumbs. */
    protected _breadcrumbs: Breadcrumb[];
    /** User */
    protected _user: User;
    /** Tags */
    protected _tags: {
        [key: string]: Primitive;
    };
    /** Extra */
    protected _extra: Extras;
    /** Contexts */
    protected _contexts: Contexts;
    /** Attachments */
    protected _attachments: Attachment[];
    /** Propagation Context for distributed tracing */
    protected _propagationContext: PropagationContext;
    /**
     * A place to stash data which is needed at some point in the SDK's event processing pipeline but which shouldn't get
     * sent to Sentry
     */
    protected _sdkProcessingMetadata: {
        [key: string]: unknown;
    };
    /** Fingerprint */
    protected _fingerprint?: string[];
    /** Severity */
    protected _level?: SeverityLevel;
    /**
     * Transaction Name
     *
     * IMPORTANT: The transaction name on the scope has nothing to do with root spans/transaction objects.
     * It's purpose is to assign a transaction to the scope that's added to non-transaction events.
     */
    protected _transactionName?: string;
    /** Session */
    protected _session?: Session;
    /** Request Mode Session Status */
    protected _requestSession?: RequestSession;
    /** The client on this scope */
    protected _client?: Client;
    /** Contains the last event id of a captured event.  */
    protected _lastEventId?: string;
    constructor();
    /**
     * @inheritDoc
     */
    clone(): ScopeClass;
    /**
     * @inheritDoc
     */
    setClient(client: Client | undefined): void;
    /**
     * @inheritDoc
     */
    setLastEventId(lastEventId: string | undefined): void;
    /**
     * @inheritDoc
     */
    getClient<C extends Client>(): C | undefined;
    /**
     * @inheritDoc
     */
    lastEventId(): string | undefined;
    /**
     * @inheritDoc
     */
    addScopeListener(callback: (scope: Scope) => void): void;
    /**
     * @inheritDoc
     */
    addEventProcessor(callback: EventProcessor): this;
    /**
     * @inheritDoc
     */
    setUser(user: User | null): this;
    /**
     * @inheritDoc
     */
    getUser(): User | undefined;
    /**
     * @inheritDoc
     */
    getRequestSession(): RequestSession | undefined;
    /**
     * @inheritDoc
     */
    setRequestSession(requestSession?: RequestSession): this;
    /**
     * @inheritDoc
     */
    setTags(tags: {
        [key: string]: Primitive;
    }): this;
    /**
     * @inheritDoc
     */
    setTag(key: string, value: Primitive): this;
    /**
     * @inheritDoc
     */
    setExtras(extras: Extras): this;
    /**
     * @inheritDoc
     */
    setExtra(key: string, extra: Extra): this;
    /**
     * @inheritDoc
     */
    setFingerprint(fingerprint: string[]): this;
    /**
     * @inheritDoc
     */
    setLevel(level: SeverityLevel): this;
    /**
     * Sets the transaction name on the scope so that the name of e.g. taken server route or
     * the page location is attached to future events.
     *
     * IMPORTANT: Calling this function does NOT change the name of the currently active
     * root span. If you want to change the name of the active root span, use
     * `Sentry.updateSpanName(rootSpan, 'new name')` instead.
     *
     * By default, the SDK updates the scope's transaction name automatically on sensible
     * occasions, such as a page navigation or when handling a new request on the server.
     */
    setTransactionName(name?: string): this;
    /**
     * @inheritDoc
     */
    setContext(key: string, context: Context | null): this;
    /**
     * @inheritDoc
     */
    setSession(session?: Session): this;
    /**
     * @inheritDoc
     */
    getSession(): Session | undefined;
    /**
     * @inheritDoc
     */
    update(captureContext?: CaptureContext): this;
    /**
     * @inheritDoc
     */
    clear(): this;
    /**
     * @inheritDoc
     */
    addBreadcrumb(breadcrumb: Breadcrumb, maxBreadcrumbs?: number): this;
    /**
     * @inheritDoc
     */
    getLastBreadcrumb(): Breadcrumb | undefined;
    /**
     * @inheritDoc
     */
    clearBreadcrumbs(): this;
    /**
     * @inheritDoc
     */
    addAttachment(attachment: Attachment): this;
    /**
     * @inheritDoc
     */
    clearAttachments(): this;
    /** @inheritDoc */
    getScopeData(): ScopeData;
    /**
     * @inheritDoc
     */
    setSDKProcessingMetadata(newData: {
        [key: string]: unknown;
    }): this;
    /**
     * @inheritDoc
     */
    setPropagationContext(context: Omit<PropagationContext, 'spanId'> & Partial<Pick<PropagationContext, 'spanId'>>): this;
    /**
     * @inheritDoc
     */
    getPropagationContext(): PropagationContext;
    /**
     * @inheritDoc
     */
    captureException(exception: unknown, hint?: EventHint): string;
    /**
     * @inheritDoc
     */
    captureMessage(message: string, level?: SeverityLevel, hint?: EventHint): string;
    /**
     * @inheritDoc
     */
    captureEvent(event: Event, hint?: EventHint): string;
    /**
     * This will be called on every set call.
     */
    protected _notifyScopeListeners(): void;
}
/**
 * Holds additional event information.
 */
declare const Scope: typeof ScopeClass;
/**
 * Holds additional event information.
 */
type Scope = Scope$1;

/**
 * Base implementation for all JavaScript SDK clients.
 *
 * Call the constructor with the corresponding options
 * specific to the client subclass. To access these options later, use
 * {@link Client.getOptions}.
 *
 * If a Dsn is specified in the options, it will be parsed and stored. Use
 * {@link Client.getDsn} to retrieve the Dsn at any moment. In case the Dsn is
 * invalid, the constructor will throw a {@link SentryException}. Note that
 * without a valid Dsn, the SDK will not send any events to Sentry.
 *
 * Before sending an event, it is passed through
 * {@link BaseClient._prepareEvent} to add SDK information and scope data
 * (breadcrumbs and context). To add more custom information, override this
 * method and extend the resulting prepared event.
 *
 * To issue automatically created events (e.g. via instrumentation), use
 * {@link Client.captureEvent}. It will prepare the event and pass it through
 * the callback lifecycle. To issue auto-breadcrumbs, use
 * {@link Client.addBreadcrumb}.
 *
 * @example
 * class NodeClient extends BaseClient<NodeOptions> {
 *   public constructor(options: NodeOptions) {
 *     super(options);
 *   }
 *
 *   // ...
 * }
 */
declare abstract class BaseClient<O extends ClientOptions> implements Client<O> {
    /** Options passed to the SDK. */
    protected readonly _options: O;
    /** The client Dsn, if specified in options. Without this Dsn, the SDK will be disabled. */
    protected readonly _dsn?: DsnComponents;
    protected readonly _transport?: Transport;
    /** Array of set up integrations. */
    protected _integrations: IntegrationIndex;
    /** Number of calls being processed */
    protected _numProcessing: number;
    protected _eventProcessors: EventProcessor[];
    /** Holds flushable  */
    private _outcomes;
    private _hooks;
    /**
     * Initializes this client instance.
     *
     * @param options Options for the client.
     */
    protected constructor(options: O);
    /**
     * @inheritDoc
     */
    captureException(exception: unknown, hint?: EventHint, scope?: Scope): string;
    /**
     * @inheritDoc
     */
    captureMessage(message: ParameterizedString, level?: SeverityLevel, hint?: EventHint, currentScope?: Scope): string;
    /**
     * @inheritDoc
     */
    captureEvent(event: Event, hint?: EventHint, currentScope?: Scope): string;
    /**
     * @inheritDoc
     */
    captureSession(session: Session): void;
    /**
     * @inheritDoc
     */
    getDsn(): DsnComponents | undefined;
    /**
     * @inheritDoc
     */
    getOptions(): O;
    /**
     * @see SdkMetadata
     *
     * @return The metadata of the SDK
     */
    getSdkMetadata(): SdkMetadata | undefined;
    /**
     * @inheritDoc
     */
    getTransport(): Transport | undefined;
    /**
     * @inheritDoc
     */
    flush(timeout?: number): PromiseLike<boolean>;
    /**
     * @inheritDoc
     */
    close(timeout?: number): PromiseLike<boolean>;
    /** Get all installed event processors. */
    getEventProcessors(): EventProcessor[];
    /** @inheritDoc */
    addEventProcessor(eventProcessor: EventProcessor): void;
    /** @inheritdoc */
    init(): void;
    /**
     * Gets an installed integration by its name.
     *
     * @returns The installed integration or `undefined` if no integration with that `name` was installed.
     */
    getIntegrationByName<T extends Integration = Integration>(integrationName: string): T | undefined;
    /**
     * @inheritDoc
     */
    addIntegration(integration: Integration): void;
    /**
     * @inheritDoc
     */
    sendEvent(event: Event, hint?: EventHint): void;
    /**
     * @inheritDoc
     */
    sendSession(session: Session | SessionAggregates): void;
    /**
     * @inheritDoc
     */
    recordDroppedEvent(reason: EventDropReason, category: DataCategory, eventOrCount?: Event | number): void;
    /** @inheritdoc */
    on(hook: 'spanStart', callback: (span: Span) => void): () => void;
    /** @inheritdoc */
    on(hook: 'spanEnd', callback: (span: Span) => void): () => void;
    /** @inheritdoc */
    on(hook: 'idleSpanEnableAutoFinish', callback: (span: Span) => void): () => void;
    /** @inheritdoc */
    on(hook: 'beforeEnvelope', callback: (envelope: Envelope) => void): () => void;
    /** @inheritdoc */
    on(hook: 'beforeSendEvent', callback: (event: Event, hint?: EventHint) => void): () => void;
    /** @inheritdoc */
    on(hook: 'preprocessEvent', callback: (event: Event, hint?: EventHint) => void): () => void;
    /** @inheritdoc */
    on(hook: 'afterSendEvent', callback: (event: Event, sendResponse: TransportMakeRequestResponse) => void): () => void;
    /** @inheritdoc */
    on(hook: 'beforeAddBreadcrumb', callback: (breadcrumb: Breadcrumb, hint?: BreadcrumbHint) => void): () => void;
    /** @inheritdoc */
    on(hook: 'createDsc', callback: (dsc: DynamicSamplingContext, rootSpan?: Span) => void): () => void;
    /** @inheritdoc */
    on(hook: 'beforeSendFeedback', callback: (feedback: FeedbackEvent, options?: {
        includeReplay: boolean;
    }) => void): () => void;
    /** @inheritdoc */
    on(hook: 'beforeSampling', callback: (samplingData: {
        spanAttributes: SpanAttributes;
        spanName: string;
        parentSampled?: boolean;
        parentContext?: SpanContextData;
    }, samplingDecision: {
        decision: boolean;
    }) => void): void;
    /** @inheritdoc */
    on(hook: 'startPageLoadSpan', callback: (options: StartSpanOptions, traceOptions?: {
        sentryTrace?: string | undefined;
        baggage?: string | undefined;
    }) => void): () => void;
    /** @inheritdoc */
    on(hook: 'startNavigationSpan', callback: (options: StartSpanOptions) => void): () => void;
    on(hook: 'flush', callback: () => void): () => void;
    on(hook: 'close', callback: () => void): () => void;
    on(hook: 'applyFrameMetadata', callback: (event: Event) => void): () => void;
    /** @inheritdoc */
    emit(hook: 'beforeSampling', samplingData: {
        spanAttributes: SpanAttributes;
        spanName: string;
        parentSampled?: boolean;
        parentContext?: SpanContextData;
    }, samplingDecision: {
        decision: boolean;
    }): void;
    /** @inheritdoc */
    emit(hook: 'spanStart', span: Span): void;
    /** @inheritdoc */
    emit(hook: 'spanEnd', span: Span): void;
    /** @inheritdoc */
    emit(hook: 'idleSpanEnableAutoFinish', span: Span): void;
    /** @inheritdoc */
    emit(hook: 'beforeEnvelope', envelope: Envelope): void;
    /** @inheritdoc */
    emit(hook: 'beforeSendEvent', event: Event, hint?: EventHint): void;
    /** @inheritdoc */
    emit(hook: 'preprocessEvent', event: Event, hint?: EventHint): void;
    /** @inheritdoc */
    emit(hook: 'afterSendEvent', event: Event, sendResponse: TransportMakeRequestResponse): void;
    /** @inheritdoc */
    emit(hook: 'beforeAddBreadcrumb', breadcrumb: Breadcrumb, hint?: BreadcrumbHint): void;
    /** @inheritdoc */
    emit(hook: 'createDsc', dsc: DynamicSamplingContext, rootSpan?: Span): void;
    /** @inheritdoc */
    emit(hook: 'beforeSendFeedback', feedback: FeedbackEvent, options?: {
        includeReplay: boolean;
    }): void;
    /** @inheritdoc */
    emit(hook: 'startPageLoadSpan', options: StartSpanOptions, traceOptions?: {
        sentryTrace?: string | undefined;
        baggage?: string | undefined;
    }): void;
    /** @inheritdoc */
    emit(hook: 'startNavigationSpan', options: StartSpanOptions): void;
    /** @inheritdoc */
    emit(hook: 'flush'): void;
    /** @inheritdoc */
    emit(hook: 'close'): void;
    /** @inheritdoc */
    emit(hook: 'applyFrameMetadata', event: Event): void;
    /**
     * @inheritdoc
     */
    sendEnvelope(envelope: Envelope): PromiseLike<TransportMakeRequestResponse>;
    /** Setup integrations for this client. */
    protected _setupIntegrations(): void;
    /** Updates existing session based on the provided event */
    protected _updateSessionFromEvent(session: Session, event: Event): void;
    /**
     * Determine if the client is finished processing. Returns a promise because it will wait `timeout` ms before saying
     * "no" (resolving to `false`) in order to give the client a chance to potentially finish first.
     *
     * @param timeout The time, in ms, after which to resolve to `false` if the client is still busy. Passing `0` (or not
     * passing anything) will make the promise wait as long as it takes for processing to finish before resolving to
     * `true`.
     * @returns A promise which will resolve to `true` if processing is already done or finishes before the timeout, and
     * `false` otherwise
     */
    protected _isClientDoneProcessing(timeout?: number): PromiseLike<boolean>;
    /** Determines whether this SDK is enabled and a transport is present. */
    protected _isEnabled(): boolean;
    /**
     * Adds common information to events.
     *
     * The information includes release and environment from `options`,
     * breadcrumbs and context (extra, tags and user) from the scope.
     *
     * Information that is already present in the event is never overwritten. For
     * nested objects, such as the context, keys are merged.
     *
     * @param event The original event.
     * @param hint May contain additional information about the original exception.
     * @param currentScope A scope containing event metadata.
     * @returns A new event with more information.
     */
    protected _prepareEvent(event: Event, hint: EventHint, currentScope?: Scope$1, isolationScope?: Scope$1): PromiseLike<Event | null>;
    /**
     * Processes the event and logs an error in case of rejection
     * @param event
     * @param hint
     * @param scope
     */
    protected _captureEvent(event: Event, hint?: EventHint, scope?: Scope): PromiseLike<string | undefined>;
    /**
     * Processes an event (either error or message) and sends it to Sentry.
     *
     * This also adds breadcrumbs and context information to the event. However,
     * platform specific meta data (such as the User's IP address) must be added
     * by the SDK implementor.
     *
     *
     * @param event The event to send to Sentry.
     * @param hint May contain additional information about the original exception.
     * @param currentScope A scope containing event metadata.
     * @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
     */
    protected _processEvent(event: Event, hint: EventHint, currentScope?: Scope): PromiseLike<Event>;
    /**
     * Occupies the client with processing and event
     */
    protected _process<T>(promise: PromiseLike<T>): void;
    /**
     * Clears outcomes on this client and returns them.
     */
    protected _clearOutcomes(): Outcome[];
    /**
     * Sends client reports as an envelope.
     */
    protected _flushOutcomes(): void;
    /**
     * @inheritDoc
     */
    abstract eventFromException(_exception: unknown, _hint?: EventHint): PromiseLike<Event>;
    /**
     * @inheritDoc
     */
    abstract eventFromMessage(_message: ParameterizedString, _level?: SeverityLevel, _hint?: EventHint): PromiseLike<Event>;
}

type ReleaseHealthAttributes = {
    environment?: string;
    release: string;
};
/**
 * @deprecated `SessionFlusher` is deprecated and will be removed in the next major version of the SDK.
 */
declare class SessionFlusher implements SessionFlusherLike {
    readonly flushTimeout: number;
    private _pendingAggregates;
    private _sessionAttrs;
    private readonly _intervalId;
    private _isEnabled;
    private _client;
    constructor(client: Client, attrs: ReleaseHealthAttributes);
    /** Checks if `pendingAggregates` has entries, and if it does flushes them by calling `sendSession` */
    flush(): void;
    /** Massages the entries in `pendingAggregates` and returns aggregated sessions */
    getSessionAggregates(): SessionAggregates;
    /** JSDoc */
    close(): void;
    /**
     * Wrapper function for _incrementSessionStatusCount that checks if the instance of SessionFlusher is enabled then
     * fetches the session status of the request from `Scope.getRequestSession().status` on the scope and passes them to
     * `_incrementSessionStatusCount` along with the start date
     */
    incrementSessionStatusCount(): void;
    /**
     * Increments status bucket in pendingAggregates buffer (internal state) corresponding to status of
     * the session received
     */
    private _incrementSessionStatusCount;
}

interface ServerRuntimeClientOptions extends ClientOptions<BaseTransportOptions> {
    platform?: string;
    runtime?: {
        name: string;
        version?: string;
    };
    serverName?: string;
}
/**
 * The Sentry Server Runtime Client SDK.
 */
declare class ServerRuntimeClient<O extends ClientOptions & ServerRuntimeClientOptions = ServerRuntimeClientOptions> extends BaseClient<O> {
    protected _sessionFlusher: SessionFlusher | undefined;
    /**
     * Creates a new Edge SDK instance.
     * @param options Configuration options for this SDK.
     */
    constructor(options: O);
    /**
     * @inheritDoc
     */
    eventFromException(exception: unknown, hint?: EventHint): PromiseLike<Event>;
    /**
     * @inheritDoc
     */
    eventFromMessage(message: ParameterizedString, level?: SeverityLevel, hint?: EventHint): PromiseLike<Event>;
    /**
     * @inheritDoc
     */
    captureException(exception: unknown, hint?: EventHint, scope?: Scope): string;
    /**
     * @inheritDoc
     */
    captureEvent(event: Event, hint?: EventHint, scope?: Scope): string;
    /**
     *
     * @inheritdoc
     */
    close(timeout?: number): PromiseLike<boolean>;
    /**
     * Initializes an instance of SessionFlusher on the client which will aggregate and periodically flush session data.
     *
     * NOTICE: This method will implicitly create an interval that is periodically called.
     * To clean up this resources, call `.close()` when you no longer intend to use the client.
     * Not doing so will result in a memory leak.
     */
    initSessionFlusher(): void;
    /**
     * Create a cron monitor check in and send it to Sentry.
     *
     * @param checkIn An object that describes a check in.
     * @param upsertMonitorConfig An optional object that describes a monitor config. Use this if you want
     * to create a monitor automatically when sending a check in.
     */
    captureCheckIn(checkIn: CheckIn, monitorConfig?: MonitorConfig, scope?: Scope): string;
    /**
     * Method responsible for capturing/ending a request session by calling `incrementSessionStatusCount` to increment
     * appropriate session aggregates bucket
     *
     * @deprecated This method should not be used or extended. It's functionality will move into the `httpIntegration` and not be part of any public API.
     */
    protected _captureRequestSession(): void;
    /**
     * @inheritDoc
     */
    protected _prepareEvent(event: Event, hint: EventHint, scope?: Scope, isolationScope?: Scope): PromiseLike<Event | null>;
    /** Extract trace information from scope */
    protected _getTraceInfoFromScope(scope: Scope | undefined): [dynamicSamplingContext: Partial<DynamicSamplingContext> | undefined, traceContext: TraceContext | undefined];
}

type RequestDataIntegrationOptions = {
    /**
     * Controls what data is pulled from the request and added to the event
     */
    include?: {
        cookies?: boolean;
        data?: boolean;
        headers?: boolean;
        ip?: boolean;
        query_string?: boolean;
        url?: boolean;
        user?: boolean | {
            id?: boolean;
            username?: boolean;
            email?: boolean;
        };
    };
    /**
     * Whether to identify transactions by parameterized path, parameterized path with method, or handler name.
     * @deprecated This option does not do anything anymore, and will be removed in v9.
     */
    transactionNamingScheme?: 'path' | 'methodPath' | 'handler';
};
/**
 * Add data about a request to an event. Primarily for use in Node-based SDKs, but included in `@sentry/core`
 * so it can be used in cross-platform SDKs like `@sentry/nextjs`.
 */
declare const requestDataIntegration: (options?: RequestDataIntegrationOptions | undefined) => Integration;

/**
 * Converts a HTTP status code into a sentry status with a message.
 *
 * @param httpStatus The HTTP response status code.
 * @returns The span status or unknown_error.
 */
declare function getSpanStatusFromHttpCode(httpStatus: number): SpanStatus;
/**
 * Sets the Http status attributes on the current span based on the http code.
 * Additionally, the span's status is updated, depending on the http code.
 */
declare function setHttpStatus(span: Span, httpStatus: number): void;

/**
 * Convert a Span to a baggage header.
 */
declare function spanToBaggageHeader(span: Span): string | undefined;

/**
 * Adds a measurement to the active transaction on the current global scope. You can optionally pass in a different span
 * as the 4th parameter.
 */
declare function setMeasurement(name: string, value: number, unit: MeasurementUnit, activeSpan?: Span | undefined): void;

/**
 * Use this attribute to represent the source of a span.
 * Should be one of: custom, url, route, view, component, task, unknown
 *
 */
declare const SEMANTIC_ATTRIBUTE_SENTRY_SOURCE = "sentry.source";
/**
 * Use this attribute to represent the sample rate used for a span.
 */
declare const SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE = "sentry.sample_rate";
/**
 * Use this attribute to represent the operation of a span.
 */
declare const SEMANTIC_ATTRIBUTE_SENTRY_OP = "sentry.op";
/**
 * Use this attribute to represent the origin of a span.
 */
declare const SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN = "sentry.origin";

/**
 * This type makes sure that we get either a CaptureContext, OR an EventHint.
 * It does not allow mixing them, which could lead to unexpected outcomes, e.g. this is disallowed:
 * { user: { id: '123' }, mechanism: { handled: false } }
 */
type ExclusiveEventHintOrCaptureContext = (CaptureContext & Partial<{
    [key in keyof EventHint]: never;
}>) | (EventHint & Partial<{
    [key in keyof ScopeContext]: never;
}>);

/**
 * Captures an exception event and sends it to Sentry.
 *
 * @param exception The exception to capture.
 * @param hint Optional additional data to attach to the Sentry event.
 * @returns the id of the captured Sentry event.
 */
declare function captureException(exception: unknown, hint?: ExclusiveEventHintOrCaptureContext): string;
/**
 * Captures a message event and sends it to Sentry.
 *
 * @param message The message to send to Sentry.
 * @param captureContext Define the level of the message or pass in additional data to attach to the message.
 * @returns the id of the captured message.
 */
declare function captureMessage(message: string, captureContext?: CaptureContext | SeverityLevel): string;
/**
 * Captures a manually created event and sends it to Sentry.
 *
 * @param event The event to send to Sentry.
 * @param hint Optional additional data to attach to the Sentry event.
 * @returns the id of the captured event.
 */
declare function captureEvent(event: Event, hint?: EventHint): string;
/**
 * Sets context data with the given name.
 * @param name of the context
 * @param context Any kind of data. This data will be normalized.
 */
declare function setContext(name: string, context: {
    [key: string]: unknown;
} | null): void;
/**
 * Set an object that will be merged sent as extra data with the event.
 * @param extras Extras object to merge into current context.
 */
declare function setExtras(extras: Extras): void;
/**
 * Set key:value that will be sent as extra data with the event.
 * @param key String of extra
 * @param extra Any kind of data. This data will be normalized.
 */
declare function setExtra(key: string, extra: Extra): void;
/**
 * Set an object that will be merged sent as tags data with the event.
 * @param tags Tags context object to merge into current context.
 */
declare function setTags(tags: {
    [key: string]: Primitive;
}): void;
/**
 * Set key:value that will be sent as tags data with the event.
 *
 * Can also be used to unset a tag, by passing `undefined`.
 *
 * @param key String key of tag
 * @param value Value of tag
 */
declare function setTag(key: string, value: Primitive): void;
/**
 * Updates user context information for future events.
 *
 * @param user User context object to be set in the current context. Pass `null` to unset the user.
 */
declare function setUser(user: User | null): void;
/**
 * The last error event id of the isolation scope.
 *
 * Warning: This function really returns the last recorded error event id on the current
 * isolation scope. If you call this function after handling a certain error and another error
 * is captured in between, the last one is returned instead of the one you might expect.
 * Also, ids of events that were never sent to Sentry (for example because
 * they were dropped in `beforeSend`) could be returned.
 *
 * @returns The last event id of the isolation scope.
 */
declare function lastEventId(): string | undefined;
/**
 * Create a cron monitor check in and send it to Sentry.
 *
 * @param checkIn An object that describes a check in.
 * @param upsertMonitorConfig An optional object that describes a monitor config. Use this if you want
 * to create a monitor automatically when sending a check in.
 */
declare function captureCheckIn(checkIn: CheckIn, upsertMonitorConfig?: MonitorConfig): string;
/**
 * Wraps a callback with a cron monitor check in. The check in will be sent to Sentry when the callback finishes.
 *
 * @param monitorSlug The distinct slug of the monitor.
 * @param upsertMonitorConfig An optional object that describes a monitor config. Use this if you want
 * to create a monitor automatically when sending a check in.
 */
declare function withMonitor<T>(monitorSlug: CheckIn['monitorSlug'], callback: () => T, upsertMonitorConfig?: MonitorConfig): T;
/**
 * Call `flush()` on the current client, if there is one. See {@link Client.flush}.
 *
 * @param timeout Maximum time in ms the client should wait to flush its event queue. Omitting this parameter will cause
 * the client to wait until all events are sent before resolving the promise.
 * @returns A promise which resolves to `true` if the queue successfully drains before the timeout, or `false` if it
 * doesn't (or if there's no client defined).
 */
declare function flush(timeout?: number): Promise<boolean>;
/**
 * Call `close()` on the current client, if there is one. See {@link Client.close}.
 *
 * @param timeout Maximum time in ms the client should wait to flush its event queue before shutting down. Omitting this
 * parameter will cause the client to wait until all events are sent before disabling itself.
 * @returns A promise which resolves to `true` if the queue successfully drains before the timeout, or `false` if it
 * doesn't (or if there's no client defined).
 */
declare function close(timeout?: number): Promise<boolean>;
/**
 * Returns true if Sentry has been properly initialized.
 */
declare function isInitialized(): boolean;
/**
 * Add an event processor.
 * This will be added to the current isolation scope, ensuring any event that is processed in the current execution
 * context will have the processor applied.
 */
declare function addEventProcessor(callback: EventProcessor): void;
/**
 * Start a session on the current isolation scope.
 *
 * @param context (optional) additional properties to be applied to the returned session object
 *
 * @returns the new active session
 */
declare function startSession(context?: SessionContext): Session;
/**
 * End the session on the current isolation scope.
 */
declare function endSession(): void;
/**
 * Sends the current session on the scope to Sentry
 *
 * @param end If set the session will be marked as exited and removed from the scope.
 *            Defaults to `false`.
 */
declare function captureSession(end?: boolean): void;

/**
 * Get the currently active scope.
 */
declare function getCurrentScope(): Scope$1;
/**
 * Get the currently active isolation scope.
 * The isolation scope is active for the current execution context.
 */
declare function getIsolationScope(): Scope$1;
/**
 * Get the global scope.
 * This scope is applied to _all_ events.
 */
declare function getGlobalScope(): Scope$1;
/**
 * Creates a new scope with and executes the given operation within.
 * The scope is automatically removed once the operation
 * finishes or throws.
 */
declare function withScope<T>(callback: (scope: Scope$1) => T): T;
/**
 * Set the given scope as the active scope in the callback.
 */
declare function withScope<T>(scope: Scope$1 | undefined, callback: (scope: Scope$1) => T): T;
/**
 * Attempts to fork the current isolation scope and the current scope based on the current async context strategy. If no
 * async context strategy is set, the isolation scope and the current scope will not be forked (this is currently the
 * case, for example, in the browser).
 *
 * Usage of this function in environments without async context strategy is discouraged and may lead to unexpected behaviour.
 *
 * This function is intended for Sentry SDK and SDK integration development. It is not recommended to be used in "normal"
 * applications directly because it comes with pitfalls. Use at your own risk!
 */
declare function withIsolationScope<T>(callback: (isolationScope: Scope$1) => T): T;
/**
 * Set the provided isolation scope as active in the given callback. If no
 * async context strategy is set, the isolation scope and the current scope will not be forked (this is currently the
 * case, for example, in the browser).
 *
 * Usage of this function in environments without async context strategy is discouraged and may lead to unexpected behaviour.
 *
 * This function is intended for Sentry SDK and SDK integration development. It is not recommended to be used in "normal"
 * applications directly because it comes with pitfalls. Use at your own risk!
 *
 * If you pass in `undefined` as a scope, it will fork a new isolation scope, the same as if no scope is passed.
 */
declare function withIsolationScope<T>(isolationScope: Scope$1 | undefined, callback: (isolationScope: Scope$1) => T): T;
/**
 * Get the currently active client.
 */
declare function getClient<C extends Client>(): C | undefined;

interface PromiseBuffer<T> {
    $: Array<PromiseLike<T>>;
    add(taskProducer: () => PromiseLike<T>): PromiseLike<T>;
    drain(timeout?: number): PromiseLike<boolean>;
}

/**
 * Creates an instance of a Sentry `Transport`
 *
 * @param options
 * @param makeRequest
 */
declare function createTransport(options: InternalBaseTransportOptions, makeRequest: TransportRequestExecutor, buffer?: PromiseBuffer<TransportMakeRequestResponse>): Transport;

/**
 * Returns a string of meta tags that represent the current trace data.
 *
 * You can use this to propagate a trace from your server-side rendered Html to the browser.
 * This function returns up to two meta tags, `sentry-trace` and `baggage`, depending on the
 * current trace data state.
 *
 * @example
 * Usage example:
 *
 * ```js
 * function renderHtml() {
 *   return `
 *     <head>
 *       ${getTraceMetaTags()}
 *     </head>
 *   `;
 * }
 * ```
 *
 */
declare function getTraceMetaTags(): string;

/**
 * Records a new breadcrumb which will be attached to future events.
 *
 * Breadcrumbs will be added to subsequent events to provide more context on
 * user's actions prior to an error or crash.
 */
declare function addBreadcrumb(breadcrumb: Breadcrumb, hint?: BreadcrumbHint): void;

/**
 * Patch toString calls to return proper name for wrapped functions.
 *
 * ```js
 * Sentry.init({
 *   integrations: [
 *     functionToStringIntegration(),
 *   ],
 * });
 * ```
 */
declare const functionToStringIntegration: () => Integration;

/** Options for the InboundFilters integration */
interface InboundFiltersOptions {
    allowUrls: Array<string | RegExp>;
    denyUrls: Array<string | RegExp>;
    ignoreErrors: Array<string | RegExp>;
    ignoreTransactions: Array<string | RegExp>;
    ignoreInternal: boolean;
    disableErrorDefaults: boolean;
}
declare const inboundFiltersIntegration: (options?: Partial<InboundFiltersOptions> | undefined) => Integration;

interface LinkedErrorsOptions {
    key?: string;
    limit?: number;
}
declare const linkedErrorsIntegration: (options?: LinkedErrorsOptions | undefined) => Integration;

interface CaptureConsoleOptions {
    levels?: string[];
    /**
     * By default, Sentry will mark captured console messages as unhandled.
     * Set this to `true` if you want to mark them as handled instead.
     *
     * Note: in v9 of the SDK, this option will default to `true`, meaning the default behavior will change to mark console messages as handled.
     * @default false
     */
    handled?: boolean;
}
/**
 * Send Console API calls as Sentry Events.
 */
declare const captureConsoleIntegration: (options?: CaptureConsoleOptions | undefined) => Integration;

interface DebugOptions {
    /** Controls whether console output created by this integration should be stringified. Default: `false` */
    stringify?: boolean;
    /** Controls whether a debugger should be launched before an event is sent. Default: `false` */
    debugger?: boolean;
}
/**
 * Integration to debug sent Sentry events.
 * This integration should not be used in production.
 *
 * @deprecated This integration is deprecated and will be removed in the next major version of the SDK.
 * To log outgoing events, use [Hook Options](https://docs.sentry.io/platforms/javascript/configuration/options/#hooks) (`beforeSend`, `beforeSendTransaction`, ...).
 */
declare const debugIntegration: (options?: DebugOptions | undefined) => Integration;

/**
 * Deduplication filter.
 */
declare const dedupeIntegration: () => Integration;

interface ExtraErrorDataOptions {
    /**
     * The object depth up to which to capture data on error objects.
     */
    depth: number;
    /**
     * Whether to capture error causes. Defaults to true.
     *
     * More information: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause
     */
    captureErrorCause: boolean;
}
declare const extraErrorDataIntegration: (options?: Partial<ExtraErrorDataOptions> | undefined) => Integration;

type StackFrameIteratee = (frame: StackFrame) => StackFrame;
interface RewriteFramesOptions {
    /**
     * Root path (the beginning of the path) that will be stripped from the frames' filename.
     *
     * This option has slightly different behaviour in the browser and on servers:
     * - In the browser, the value you provide in `root` will be stripped from the beginning stack frames' paths (if the path started with the value).
     * - On the server, the root value will only replace the beginning of stack frame filepaths, when the path is absolute. If no `root` value is provided and the path is absolute, the frame will be reduced to only the filename and the provided `prefix` option.
     *
     * Browser example:
     * - Original frame: `'http://example.com/my/path/static/asset.js'`
     * - `root: 'http://example.com/my/path'`
     * - `assetPrefix: 'app://'`
     * - Resulting frame: `'app:///static/asset.js'`
     *
     * Server example:
     * - Original frame: `'/User/local/my/path/static/asset.js'`
     * - `root: '/User/local/my/path'`
     * - `assetPrefix: 'app://'`
     * - Resulting frame: `'app:///static/asset.js'`
     */
    root?: string;
    /**
     * A custom prefix that stack frames will be prepended with.
     *
     * Default: `'app://'`
     *
     * This option has slightly different behaviour in the browser and on servers:
     * - In the browser, the value you provide in `prefix` will prefix the resulting filename when the value you provided in `root` was applied. Effectively replacing whatever `root` matched in the beginning of the frame with `prefix`.
     * - On the server, the prefix is applied to all stackframes with absolute paths. On Windows, the drive identifier (e.g. "C://") is replaced with the prefix.
     */
    prefix?: string;
    /**
     * Defines an iterator that is used to iterate through all of the stack frames for modification before being sent to Sentry.
     * Setting this option will effectively disable both the `root` and the `prefix` options.
     */
    iteratee?: StackFrameIteratee;
}
/**
 * Rewrite event frames paths.
 */
declare const rewriteFramesIntegration: (options?: RewriteFramesOptions | undefined) => Integration;

/**
 * This function adds duration since the sessionTimingIntegration was initialized
 * till the time event was sent.
 *
 * @deprecated This integration is deprecated and will be removed in the next major version of the SDK.
 * To capture session durations alongside events, use [Context](https://docs.sentry.io/platforms/javascript/enriching-events/context/) (`Sentry.setContext()`).
 */
declare const sessionTimingIntegration: () => Integration;

interface ZodErrorsOptions {
    key?: string;
    /**
     * Limits the number of Zod errors inlined in each Sentry event.
     *
     * @default 10
     */
    limit?: number;
    /**
     * Save full list of Zod issues as an attachment in Sentry
     *
     * @default false
     */
    saveZodIssuesAsAttachment?: boolean;
}
/**
 * Sentry integration to process Zod errors, making them easier to work with in Sentry.
 */
declare const zodErrorsIntegration: (options?: ZodErrorsOptions | undefined) => Integration;

/**
 * Returns the metrics aggregator for a given client.
 */
declare function getMetricsAggregatorForClient(client: Client): MetricsAggregator;
/**
 * The metrics API is used to capture custom metrics in Sentry.
 *
 * @deprecated The Sentry metrics beta has ended. This export will be removed in a future release.
 */
declare const metricsDefault: Metrics & {
    getMetricsAggregatorForClient: typeof getMetricsAggregatorForClient;
};

/**
 * Send user feedback to Sentry.
 */
declare function captureFeedback(params: SendFeedbackParams, hint?: EventHint & {
    includeReplay?: boolean;
}, scope?: Scope$1): string;

declare const DEFAULT_REQUEST_INCLUDES: string[];
declare const DEFAULT_USER_INCLUDES: string[];
/**
 * Options deciding what parts of the request to use when enhancing an event
 */
type AddRequestDataToEventOptions = {
    /** Flags controlling whether each type of data should be added to the event */
    include?: {
        ip?: boolean;
        request?: boolean | Array<(typeof DEFAULT_REQUEST_INCLUDES)[number]>;
        /** @deprecated This option will be removed in v9. It does not do anything anymore, the `transcation` is set in other places. */
        transaction?: boolean | TransactionNamingScheme;
        user?: boolean | Array<(typeof DEFAULT_USER_INCLUDES)[number]>;
    };
    /** Injected platform-specific dependencies */
    deps?: {
        cookie: {
            parse: (cookieStr: string) => Record<string, string>;
        };
        url: {
            parse: (urlStr: string) => {
                query: string | null;
            };
        };
    };
};
/**
 * @deprecated This type will be removed in v9. It is not in use anymore.
 */
type TransactionNamingScheme = 'path' | 'methodPath' | 'handler';

declare const SDK_VERSION: string;

interface DenoTransportOptions extends BaseTransportOptions {
    /** Custom headers for the transport. Used by the XHRTransport and FetchTransport */
    headers?: {
        [key: string]: string;
    };
}

interface BaseDenoOptions {
    /**
     * List of strings/regex controlling to which outgoing requests
     * the SDK will attach tracing headers.
     *
     * By default the SDK will attach those headers to all outgoing
     * requests. If this option is provided, the SDK will match the
     * request URL of outgoing requests against the items in this
     * array, and only attach tracing headers if a match was found.
     *
     * @example
     * ```js
     * Sentry.init({
     *   tracePropagationTargets: ['api.site.com'],
     * });
     * ```
     */
    tracePropagationTargets?: TracePropagationTargets;
    /** Sets an optional server name (device name) */
    serverName?: string;
    /** Callback that is executed when a fatal global error occurs. */
    onFatalError?(this: void, error: Error): void;
}
/**
 * Configuration options for the Sentry Deno SDK
 * @see @sentry/core Options for more information.
 */
interface DenoOptions extends Options<DenoTransportOptions>, BaseDenoOptions {
}
/**
 * Configuration options for the Sentry Deno SDK Client class
 * @see DenoClient for more information.
 */
interface DenoClientOptions extends ClientOptions<DenoTransportOptions>, BaseDenoOptions {
}

/**
 * The Sentry Deno SDK Client.
 *
 * @see DenoClientOptions for documentation on configuration options.
 * @see SentryClient for usage documentation.
 */
declare class DenoClient extends ServerRuntimeClient<DenoClientOptions> {
    /**
     * Creates a new Deno SDK instance.
     * @param options Configuration options for this SDK.
     */
    constructor(options: DenoClientOptions);
}

/** Get the default integrations for the Deno SDK. */
declare function getDefaultIntegrations(_options: Options): Integration[];
/**
 * The Sentry Deno SDK Client.
 *
 * To use this SDK, call the {@link init} function as early as possible in the
 * main entry module. To set context information or send manual events, use the
 * provided methods.
 *
 * @example
 * ```
 *
 * import { init } from 'npm:@sentry/deno';
 *
 * init({
 *   dsn: '__DSN__',
 *   // ...
 * });
 * ```
 *
 * @example
 * ```
 *
 * import { addBreadcrumb } from 'npm:@sentry/deno';
 * addBreadcrumb({
 *   message: 'My Breadcrumb',
 *   // ...
 * });
 * ```
 *
 * @example
 * ```
 *
 * import * as Sentry from 'npm:@sentry/deno';
 * Sentry.captureMessage('Hello, world!');
 * Sentry.captureException(new Error('Good bye'));
 * Sentry.captureEvent({
 *   message: 'Manual',
 *   stacktrace: [
 *     // ...
 *   ],
 * });
 * ```
 *
 * @see {@link DenoOptions} for documentation on configuration options.
 */
declare function init(options?: DenoOptions): Client;

/**
 * Adds Deno related context to events. This includes contexts about app, device, os, v8, and TypeScript.
 *
 * Enabled by default in the Deno SDK.
 *
 * ```js
 * Sentry.init({
 *   integrations: [
 *     Sentry.denoContextIntegration(),
 *   ],
 * })
 * ```
 */
declare const denoContextIntegration: () => Integration;

type GlobalHandlersIntegrationsOptionKeys = 'error' | 'unhandledrejection';
type GlobalHandlersIntegrations = Record<GlobalHandlersIntegrationsOptionKeys, boolean>;
/**
 * Instruments global `error` and `unhandledrejection` listeners in Deno.
 *
 * Enabled by default in the Deno SDK.
 *
 * ```js
 * Sentry.init({
 *   integrations: [
 *     Sentry.globalHandlersIntegration(),
 *   ],
 * })
 * ```
 */
declare const globalHandlersIntegration: (options?: GlobalHandlersIntegrations | undefined) => Integration;

/**
 * Normalises paths to the app root directory.
 *
 * Enabled by default in the Deno SDK.
 *
 * ```js
 * Sentry.init({
 *   integrations: [
 *     Sentry.normalizePathsIntegration(),
 *   ],
 * })
 * ```
 */
declare const normalizePathsIntegration: () => Integration;

interface ContextLinesOptions {
    /**
     * Sets the number of context lines for each frame when loading a file.
     * Defaults to 7.
     *
     * Set to 0 to disable loading and inclusion of source files.
     */
    frameContextLines?: number;
}
/**
 * Adds source context to event stacktraces.
 *
 * Enabled by default in the Deno SDK.
 *
 * ```js
 * Sentry.init({
 *   integrations: [
 *     Sentry.contextLinesIntegration(),
 *   ],
 * })
 * ```
 */
declare const contextLinesIntegration: (options?: ContextLinesOptions | undefined) => Integration;

/**
 * Instruments Deno.cron to automatically capture cron check-ins.
 *
 * Enabled by default in the Deno SDK.
 *
 * ```js
 * Sentry.init({
 *   integrations: [
 *     Sentry.denoCronIntegration(),
 *   ],
 * })
 * ```
 */
declare const denoCronIntegration: () => Integration;

interface BreadcrumbsOptions {
    console: boolean;
    fetch: boolean;
    sentry: boolean;
}
/**
 * Adds a breadcrumbs for console, fetch, and sentry events.
 *
 * Enabled by default in the Deno SDK.
 *
 * ```js
 * Sentry.init({
 *   integrations: [
 *     Sentry.breadcrumbsIntegration(),
 *   ],
 * })
 * ```
 */
declare const breadcrumbsIntegration: (options?: Partial<BreadcrumbsOptions> | undefined) => Integration;

export { type AddRequestDataToEventOptions, type Breadcrumb, type BreadcrumbHint, DenoClient, type DenoOptions, type ErrorEvent, type Event, type EventHint, type Exception, type PolymorphicRequest, type Request, type RequestEventData, SDK_VERSION, SEMANTIC_ATTRIBUTE_SENTRY_OP, SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN, SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, Scope, type SdkInfo, type Session, type SeverityLevel, type Span, type StackFrame, type Stacktrace, type Thread, type User, addBreadcrumb, addEventProcessor, breadcrumbsIntegration, captureCheckIn, captureConsoleIntegration, captureEvent, captureException, captureFeedback, captureMessage, captureSession, close, contextLinesIntegration, continueTrace, createTransport, debugIntegration, dedupeIntegration, denoContextIntegration, denoCronIntegration, endSession, extraErrorDataIntegration, flush, functionToStringIntegration, getActiveSpan, getClient, getCurrentScope, getDefaultIntegrations, getGlobalScope, getIsolationScope, getRootSpan, getSpanStatusFromHttpCode, getTraceData, getTraceMetaTags, globalHandlersIntegration, inboundFiltersIntegration, init, isInitialized, lastEventId, linkedErrorsIntegration, metricsDefault as metrics, normalizePathsIntegration, requestDataIntegration, rewriteFramesIntegration, sessionTimingIntegration, setContext, setCurrentClient, setExtra, setExtras, setHttpStatus, setMeasurement, setTag, setTags, setUser, spanToBaggageHeader, spanToJSON, spanToTraceHeader, startInactiveSpan, startNewTrace, startSession, startSpan, startSpanManual, suppressTracing, updateSpanName, withIsolationScope, withMonitor, withScope, zodErrorsIntegration };
