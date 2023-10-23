interface Attachment {
    data: string | Uint8Array;
    filename: string;
    contentType?: string;
    attachmentType?: string;
}

/**
 * @deprecated Please use a `SeverityLevel` string instead of the `Severity` enum. Acceptable values are 'fatal',
 * 'error', 'warning', 'log', 'info', and 'debug'.
 */
declare enum Severity {
    /** JSDoc */
    Fatal = "fatal",
    /** JSDoc */
    Error = "error",
    /** JSDoc */
    Warning = "warning",
    /** JSDoc */
    Log = "log",
    /** JSDoc */
    Info = "info",
    /** JSDoc */
    Debug = "debug"
}
type SeverityLevel = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';

/** JSDoc */
interface Breadcrumb {
    type?: string;
    level?: Severity | SeverityLevel;
    event_id?: string;
    category?: string;
    message?: string;
    data?: {
        [key: string]: any;
    };
    timestamp?: number;
}
/** JSDoc */
interface BreadcrumbHint {
    [key: string]: any;
}

/** Request data included in an event as sent to Sentry */
interface Request {
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
    description?: string;
    op?: string;
    parent_span_id?: string;
    span_id: string;
    status?: string;
    tags?: {
        [key: string]: Primitive;
    };
    trace_id: string;
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

interface CrontabSchedule {
    type: 'crontab';
    value: string;
}
interface IntervalSchedule {
    type: 'interval';
    value: number;
    unit: 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute';
}
type MonitorSchedule = CrontabSchedule | IntervalSchedule;
interface SerializedCheckIn {
    check_in_id: string;
    monitor_slug: string;
    status: 'in_progress' | 'ok' | 'error';
    duration?: number;
    release?: string;
    environment?: string;
    monitor_config?: {
        schedule: MonitorSchedule;
        checkin_margin?: number;
        max_runtime?: number;
        timezone?: string;
    };
    contexts?: {
        trace?: TraceContext;
    };
}
interface InProgressCheckIn {
    monitorSlug: SerializedCheckIn['monitor_slug'];
    status: 'in_progress';
}
interface FinishedCheckIn {
    monitorSlug: SerializedCheckIn['monitor_slug'];
    status: 'ok' | 'error';
    checkInId: SerializedCheckIn['check_in_id'];
    duration?: SerializedCheckIn['duration'];
}
type CheckIn = InProgressCheckIn | FinishedCheckIn;
type SerializedMonitorConfig = NonNullable<SerializedCheckIn['monitor_config']>;
interface MonitorConfig {
    schedule: MonitorSchedule;
    checkinMargin?: SerializedMonitorConfig['checkin_margin'];
    maxRuntime?: SerializedMonitorConfig['max_runtime'];
    timezone?: SerializedMonitorConfig['timezone'];
}

type DataCategory = 'default' | 'error' | 'transaction' | 'replay' | 'security' | 'attachment' | 'session' | 'internal' | 'profile' | 'monitor';

type EventDropReason = 'before_send' | 'event_processor' | 'network_error' | 'queue_overflow' | 'ratelimit_backoff' | 'sample_rate' | 'send_error' | 'internal_sdk_error';
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
     * References another exception via the `exception_id` field to indicate that this excpetion is a child of that
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
type StackParser = (stack: string, skipFirst?: number) => StackFrame[];
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
 * Event processors are used to change the event before it will be send.
 * We strongly advise to make this function sync.
 * Returning a PromiseLike<Event | null> will work just fine, but better be sure that you know what you are doing.
 * Event processing will be deferred until your Promise is resolved.
 */
interface EventProcessor {
    (event: Event, hint: EventHint): PromiseLike<Event | null> | Event | null;
    id?: string;
}

/** JSDoc */
interface User {
    [key: string]: any;
    id?: string | number;
    ip_address?: string;
    email?: string;
    username?: string;
    segment?: string;
}
interface UserFeedback {
    event_id: string;
    email: User['email'];
    name: string;
    comments: string;
}

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
type RequestSessionStatus = 'ok' | 'errored' | 'crashed';
/** JSDoc */
interface SessionAggregates {
    attrs?: {
        environment?: string;
        release?: string;
    };
    aggregates: Array<AggregationCounts>;
}
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

type Instrumenter = 'sentry' | 'otel';

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
 * Interface holding Transaction-specific properties
 */
interface TransactionContext extends SpanContext {
    /**
     * Human-readable identifier for the transaction
     */
    name: string;
    /**
     * If true, sets the end timestamp of the transaction to the highest timestamp of child spans, trimming
     * the duration of the transaction. This is useful to discard extra time in the transaction that is not
     * accounted for in child spans, like what happens in the idle transaction Tracing integration, where we finish the
     * transaction after a given "idle time" and we don't want this "idle time" to be part of the transaction.
     */
    trimEnd?: boolean;
    /**
     * If this transaction has a parent, the parent's sampling decision
     */
    parentSampled?: boolean;
    /**
     * Metadata associated with the transaction, for internal SDK use.
     */
    metadata?: Partial<TransactionMetadata>;
}
/**
 * Data pulled from a `sentry-trace` header
 */
type TraceparentData = Pick<TransactionContext, 'traceId' | 'parentSpanId' | 'parentSampled'>;
/**
 * Transaction "Class", inherits Span only has `setName`
 */
interface Transaction extends TransactionContext, Omit<Span$1, 'setName' | 'name'> {
    /**
     * @inheritDoc
     */
    spanId: string;
    /**
     * @inheritDoc
     */
    traceId: string;
    /**
     * @inheritDoc
     */
    startTimestamp: number;
    /**
     * @inheritDoc
     */
    tags: {
        [key: string]: Primitive;
    };
    /**
     * @inheritDoc
     */
    data: {
        [key: string]: any;
    };
    /**
     * Metadata about the transaction
     */
    metadata: TransactionMetadata;
    /**
     * The instrumenter that created this transaction.
     */
    instrumenter: Instrumenter;
    /**
     * Set the name of the transaction
     */
    setName(name: string, source?: TransactionMetadata['source']): void;
    /**
     * Set the context of a transaction event
     */
    setContext(key: string, context: Context): void;
    /**
     * Set observed measurement for this transaction.
     *
     * @param name Name of the measurement
     * @param value Value of the measurement
     * @param unit Unit of the measurement. (Defaults to an empty string)
     */
    setMeasurement(name: string, value: number, unit: MeasurementUnit): void;
    /** Returns the current transaction properties as a `TransactionContext` */
    toContext(): TransactionContext;
    /** Updates the current transaction with a new `TransactionContext` */
    updateWithContext(transactionContext: TransactionContext): this;
    /**
     * Set metadata for this transaction.
     * @hidden
     */
    setMetadata(newMetadata: Partial<TransactionMetadata>): void;
    /** Return the current Dynamic Sampling Context of this transaction */
    getDynamicSamplingContext(): Partial<DynamicSamplingContext>;
}
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
     * Context data with which transaction being sampled was created
     */
    transactionContext: TransactionContext;
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
     * Object representing the incoming request to a node server. Passed by default when using the TracingHandler.
     */
    request?: ExtractedNodeRequestData;
}
interface TransactionMetadata {
    /** The sample rate used when sampling this transaction */
    sampleRate?: number;
    /**
     * The Dynamic Sampling Context of a transaction. If provided during transaction creation, its Dynamic Sampling
     * Context Will be frozen
     */
    dynamicSamplingContext?: Partial<DynamicSamplingContext>;
    /** For transactions tracing server-side request handling, the request being tracked. */
    request?: PolymorphicRequest;
    /** Compatibility shim for transitioning to the `RequestData` integration. The options passed to our Express request
     * handler controlling what request data is added to the event.
     * TODO (v8): This should go away
     */
    requestDataOptionsFromExpressHandler?: {
        [key: string]: unknown;
    };
    /** For transactions tracing server-side request handling, the path of the request being tracked. */
    /** TODO: If we rm -rf `instrumentServer`, this can go, too */
    requestPath?: string;
    /** Information on how a transaction name was generated. */
    source: TransactionSource;
    /** Metadata for the transaction's spans, keyed by spanId */
    spanMetadata: {
        [spanId: string]: {
            [key: string]: unknown;
        };
    };
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
/** Interface holding all properties that can be set on a Span on creation. */
interface SpanContext {
    /**
     * Description of the Span.
     */
    description?: string;
    /**
     * Human-readable identifier for the span. Alias for span.description.
     */
    name?: string;
    /**
     * Operation of the Span.
     */
    op?: string;
    /**
     * Completion status of the Span.
     * See: {@sentry/tracing SpanStatus} for possible values
     */
    status?: string;
    /**
     * Parent Span ID
     */
    parentSpanId?: string;
    /**
     * Was this span chosen to be sent as part of the sample?
     */
    sampled?: boolean;
    /**
     * Span ID
     */
    spanId?: string;
    /**
     * Trace ID
     */
    traceId?: string;
    /**
     * Tags of the Span.
     */
    tags?: {
        [key: string]: Primitive;
    };
    /**
     * Data of the Span.
     */
    data?: {
        [key: string]: any;
    };
    /**
     * Timestamp in seconds (epoch time) indicating when the span started.
     */
    startTimestamp?: number;
    /**
     * Timestamp in seconds (epoch time) indicating when the span ended.
     */
    endTimestamp?: number;
    /**
     * The instrumenter that created this span.
     */
    instrumenter?: Instrumenter;
    /**
     * The origin of the span, giving context about what created the span.
     */
    origin?: SpanOrigin;
}
/** Span holding trace_id, span_id */
interface Span$1 extends SpanContext {
    /**
     * Human-readable identifier for the span. Identical to span.description.
     */
    name: string;
    /**
     * @inheritDoc
     */
    spanId: string;
    /**
     * @inheritDoc
     */
    traceId: string;
    /**
     * @inheritDoc
     */
    startTimestamp: number;
    /**
     * @inheritDoc
     */
    tags: {
        [key: string]: Primitive;
    };
    /**
     * @inheritDoc
     */
    data: {
        [key: string]: any;
    };
    /**
     * The transaction containing this span
     */
    transaction?: Transaction;
    /**
     * The instrumenter that created this span.
     */
    instrumenter: Instrumenter;
    /**
     * Sets the finish timestamp on the current span.
     * @param endTimestamp Takes an endTimestamp if the end should not be the time when you call this function.
     */
    finish(endTimestamp?: number): void;
    /**
     * Sets the tag attribute on the current span.
     *
     * Can also be used to unset a tag, by passing `undefined`.
     *
     * @param key Tag key
     * @param value Tag value
     */
    setTag(key: string, value: Primitive): this;
    /**
     * Sets the data attribute on the current span
     * @param key Data key
     * @param value Data value
     */
    setData(key: string, value: any): this;
    /**
     * Sets the status attribute on the current span
     * See: {@sentry/tracing SpanStatus} for possible values
     * @param status http code used to set the status
     */
    setStatus(status: string): this;
    /**
     * Sets the status attribute on the current span based on the http code
     * @param httpStatus http code used to set the status
     */
    setHttpStatus(httpStatus: number): this;
    /**
     * Set the name of the span.
     */
    setName(name: string): void;
    /**
     * Creates a new `Span` while setting the current `Span.id` as `parentSpanId`.
     * Also the `sampled` decision will be inherited.
     */
    startChild(spanContext?: Pick<SpanContext, Exclude<keyof SpanContext, 'sampled' | 'traceId' | 'parentSpanId'>>): Span$1;
    /**
     * Determines whether span was successful (HTTP200)
     */
    isSuccess(): boolean;
    /** Return a traceparent compatible header string */
    toTraceparent(): string;
    /** Returns the current span properties as a `SpanContext` */
    toContext(): SpanContext;
    /** Updates the current span with a new `SpanContext` */
    updateWithContext(spanContext: SpanContext): this;
    /** Convert the object to JSON for w. spans array info only */
    getTraceContext(): {
        data?: {
            [key: string]: any;
        };
        description?: string;
        op?: string;
        parent_span_id?: string;
        span_id: string;
        status?: string;
        tags?: {
            [key: string]: Primitive;
        };
        trace_id: string;
    };
    /** Convert the object to JSON */
    toJSON(): {
        data?: {
            [key: string]: any;
        };
        description?: string;
        op?: string;
        parent_span_id?: string;
        span_id: string;
        start_timestamp: number;
        status?: string;
        tags?: {
            [key: string]: Primitive;
        };
        timestamp?: number;
        trace_id: string;
    };
}

type TracePropagationTargets = (string | RegExp)[];
interface PropagationContext {
    traceId: string;
    spanId: string;
    sampled?: boolean;
    parentSpanId?: string;
    dsc?: DynamicSamplingContext;
}

/** JSDocs */
type CaptureContext = Scope$1 | Partial<ScopeContext> | ((scope: Scope$1) => Scope$1);
/** JSDocs */
interface ScopeContext {
    user: User;
    level: Severity | SeverityLevel;
    extra: Extras;
    contexts: Contexts;
    tags: {
        [key: string]: Primitive;
    };
    fingerprint: string[];
    requestSession: RequestSession;
    propagationContext: PropagationContext;
}
/**
 * Holds additional event information. {@link Scope.applyToEvent} will be called by the client before an event is sent.
 */
interface Scope$1 {
    /** Add new event processor that will be called after {@link applyToEvent}. */
    addEventProcessor(callback: EventProcessor): this;
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
    setLevel(level: Severity | SeverityLevel): this;
    /**
     * Sets the transaction name on the scope for future events.
     */
    setTransactionName(name?: string): this;
    /**
     * Sets context data with the given name.
     * @param name of the context
     * @param context an object containing context data. This data will be normalized. Pass `null` to unset the context.
     */
    setContext(name: string, context: Context | null): this;
    /**
     * Sets the Span on the scope.
     * @param span Span
     */
    setSpan(span?: Span$1): this;
    /**
     * Returns the `Span` if there is one
     */
    getSpan(): Span$1 | undefined;
    /**
     * Returns the `Transaction` attached to the scope (if there is one)
     */
    getTransaction(): Transaction | undefined;
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
     */
    getRequestSession(): RequestSession | undefined;
    /**
     * Sets the `RequestSession` on the scope
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
     * Sets the breadcrumbs in the scope
     * @param breadcrumbs Breadcrumb
     * @param maxBreadcrumbs number of max breadcrumbs to merged into event.
     */
    addBreadcrumb(breadcrumb: Breadcrumb, maxBreadcrumbs?: number): this;
    /**
     * Get the last breadcrumb.
     */
    getLastBreadcrumb(): Breadcrumb | undefined;
    /**
     * Clears all currently set Breadcrumbs.
     */
    clearBreadcrumbs(): this;
    /**
     * Adds an attachment to the scope
     * @param attachment Attachment options
     */
    addAttachment(attachment: Attachment): this;
    /**
     * Returns an array of attachments on the scope
     */
    getAttachments(): Attachment[];
    /**
     * Clears attachments from the scope
     */
    clearAttachments(): this;
    /**
     * Add data which will be accessible during event processing but won't get sent to Sentry
     */
    setSDKProcessingMetadata(newData: {
        [key: string]: unknown;
    }): this;
    /**
     * Add propagation context to the scope, used for distributed tracing
     */
    setPropagationContext(context: PropagationContext): this;
    /**
     * Get propagation context from the scope, used for distributed tracing
     */
    getPropagationContext(): PropagationContext;
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

/** JSDoc */
interface Event {
    event_id?: string;
    message?: string;
    timestamp?: number;
    start_timestamp?: number;
    level?: Severity | SeverityLevel;
    platform?: string;
    logger?: string;
    server_name?: string;
    release?: string;
    dist?: string;
    environment?: string;
    sdk?: SdkInfo;
    request?: Request;
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
    spans?: Span$1[];
    measurements?: Measurements;
    debug_meta?: DebugMeta;
    sdkProcessingMetadata?: {
        [key: string]: any;
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
type EventType = 'transaction' | 'profile' | 'replay_event' | undefined;
interface ErrorEvent extends Event {
    type: undefined;
}
interface TransactionEvent extends Event {
    type: 'transaction';
}
/** JSDoc */
interface EventHint {
    event_id?: string;
    captureContext?: CaptureContext;
    syntheticException?: Error | null;
    originalException?: unknown;
    attachments?: Attachment[];
    data?: any;
    integrations?: string[];
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
    trace_id: Transaction['traceId'];
    public_key: DsnComponents['publicKey'];
    sample_rate?: string;
    release?: string;
    environment?: string;
    transaction?: string;
    user_segment?: string;
    replay_id?: string;
    sampled?: string;
};
type EnvelopeItemType = 'client_report' | 'user_report' | 'session' | 'sessions' | 'transaction' | 'attachment' | 'event' | 'profile' | 'replay_event' | 'replay_recording' | 'check_in';
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
    type: 'event' | 'transaction' | 'profile';
};
type AttachmentItemHeaders = {
    type: 'attachment';
    length: number;
    filename: string;
    content_type?: string;
    attachment_type?: string;
};
type UserFeedbackItemHeaders = {
    type: 'user_report';
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
type EventItem = BaseEnvelopeItem<EventItemHeaders, Event>;
type AttachmentItem = BaseEnvelopeItem<AttachmentItemHeaders, string | Uint8Array>;
type UserFeedbackItem = BaseEnvelopeItem<UserFeedbackItemHeaders, UserFeedback>;
type SessionItem = BaseEnvelopeItem<SessionItemHeaders, Session | SerializedSession> | BaseEnvelopeItem<SessionAggregatesItemHeaders, SessionAggregates>;
type ClientReportItem = BaseEnvelopeItem<ClientReportItemHeaders, ClientReport>;
type CheckInItem = BaseEnvelopeItem<CheckInItemHeaders, SerializedCheckIn>;
type ReplayEventItem = BaseEnvelopeItem<ReplayEventItemHeaders, ReplayEvent>;
type ReplayRecordingItem = BaseEnvelopeItem<ReplayRecordingItemHeaders, ReplayRecordingData>;
type EventEnvelopeHeaders = {
    event_id: string;
    sent_at: string;
    trace?: DynamicSamplingContext;
};
type SessionEnvelopeHeaders = {
    sent_at: string;
};
type CheckInEnvelopeHeaders = {
    trace?: DynamicSamplingContext;
};
type ClientReportEnvelopeHeaders = BaseEnvelopeHeaders;
type ReplayEnvelopeHeaders = BaseEnvelopeHeaders;
type EventEnvelope = BaseEnvelope<EventEnvelopeHeaders, EventItem | AttachmentItem | UserFeedbackItem>;
type SessionEnvelope = BaseEnvelope<SessionEnvelopeHeaders, SessionItem>;
type ClientReportEnvelope = BaseEnvelope<ClientReportEnvelopeHeaders, ClientReportItem>;
type ReplayEnvelope = [ReplayEnvelopeHeaders, [ReplayEventItem, ReplayRecordingItem]];
type CheckInEvelope = BaseEnvelope<CheckInEnvelopeHeaders, CheckInItem>;
type Envelope = EventEnvelope | SessionEnvelope | ClientReportEnvelope | ReplayEnvelope | CheckInEvelope;

/**
 * Internal class used to make sure we always have the latest internal functions
 * working in case we have a version conflict.
 */
interface Hub$1 {
    /**
     * Checks if this hub's version is older than the given version.
     *
     * @param version A version number to compare to.
     * @return True if the given version is newer; otherwise false.
     *
     * @hidden
     */
    isOlderThan(version: number): boolean;
    /**
     * This binds the given client to the current scope.
     * @param client An SDK client (client) instance.
     */
    bindClient(client?: Client): void;
    /**
     * Create a new scope to store context information.
     *
     * The scope will be layered on top of the current one. It is isolated, i.e. all
     * breadcrumbs and context information added to this scope will be removed once
     * the scope ends. Be sure to always remove this scope with {@link this.popScope}
     * when the operation finishes or throws.
     *
     * @returns Scope, the new cloned scope
     */
    pushScope(): Scope$1;
    /**
     * Removes a previously pushed scope from the stack.
     *
     * This restores the state before the scope was pushed. All breadcrumbs and
     * context information added since the last call to {@link this.pushScope} are
     * discarded.
     */
    popScope(): boolean;
    /**
     * Creates a new scope with and executes the given operation within.
     * The scope is automatically removed once the operation
     * finishes or throws.
     *
     * This is essentially a convenience function for:
     *
     *     pushScope();
     *     callback();
     *     popScope();
     *
     * @param callback that will be enclosed into push/popScope.
     */
    withScope(callback: (scope: Scope$1) => void): void;
    /** Returns the client of the top stack. */
    getClient(): Client | undefined;
    /** Returns the scope of the top stack */
    getScope(): Scope$1;
    /**
     * Captures an exception event and sends it to Sentry.
     *
     * @param exception An exception-like object.
     * @param hint May contain additional information about the original exception.
     * @returns The generated eventId.
     */
    captureException(exception: any, hint?: EventHint): string;
    /**
     * Captures a message event and sends it to Sentry.
     *
     * @param message The message to send to Sentry.
     * @param level Define the level of the message.
     * @param hint May contain additional information about the original exception.
     * @returns The generated eventId.
     */
    captureMessage(message: string, level?: Severity | SeverityLevel, hint?: EventHint): string;
    /**
     * Captures a manually created event and sends it to Sentry.
     *
     * @param event The event to send to Sentry.
     * @param hint May contain additional information about the original exception.
     */
    captureEvent(event: Event, hint?: EventHint): string;
    /**
     * This is the getter for lastEventId.
     *
     * @returns The last event id of a captured event.
     */
    lastEventId(): string | undefined;
    /**
     * Records a new breadcrumb which will be attached to future events.
     *
     * Breadcrumbs will be added to subsequent events to provide more context on
     * user's actions prior to an error or crash.
     *
     * @param breadcrumb The breadcrumb to record.
     * @param hint May contain additional information about the original breadcrumb.
     */
    addBreadcrumb(breadcrumb: Breadcrumb, hint?: BreadcrumbHint): void;
    /**
     * Updates user context information for future events.
     *
     * @param user User context object to be set in the current context. Pass `null` to unset the user.
     */
    setUser(user: User | null): void;
    /**
     * Set an object that will be merged sent as tags data with the event.
     *
     * @param tags Tags context object to merge into current context.
     */
    setTags(tags: {
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
    setTag(key: string, value: Primitive): void;
    /**
     * Set key:value that will be sent as extra data with the event.
     * @param key String of extra
     * @param extra Any kind of data. This data will be normalized.
     */
    setExtra(key: string, extra: Extra): void;
    /**
     * Set an object that will be merged sent as extra data with the event.
     * @param extras Extras object to merge into current context.
     */
    setExtras(extras: Extras): void;
    /**
     * Sets context data with the given name.
     * @param name of the context
     * @param context Any kind of data. This data will be normalized.
     */
    setContext(name: string, context: {
        [key: string]: any;
    } | null): void;
    /**
     * Callback to set context information onto the scope.
     *
     * @param callback Callback function that receives Scope.
     */
    configureScope(callback: (scope: Scope$1) => void): void;
    /**
     * For the duration of the callback, this hub will be set as the global current Hub.
     * This function is useful if you want to run your own client and hook into an already initialized one
     * e.g.: Reporting issues to your own sentry when running in your component while still using the users configuration.
     */
    run(callback: (hub: Hub$1) => void): void;
    /** Returns the integration if installed on the current client. */
    getIntegration<T extends Integration>(integration: IntegrationClass<T>): T | null;
    /** Returns all trace headers that are currently on the top scope. */
    traceHeaders(): {
        [key: string]: string;
    };
    /**
     * Starts a new `Transaction` and returns it. This is the entry point to manual tracing instrumentation.
     *
     * A tree structure can be built by adding child spans to the transaction, and child spans to other spans. To start a
     * new child span within the transaction or any span, call the respective `.startChild()` method.
     *
     * Every child span must be finished before the transaction is finished, otherwise the unfinished spans are discarded.
     *
     * The transaction must be finished with a call to its `.finish()` method, at which point the transaction with all its
     * finished child spans will be sent to Sentry.
     *
     * @param context Properties of the new `Transaction`.
     * @param customSamplingContext Information given to the transaction sampling function (along with context-dependent
     * default values). See {@link Options.tracesSampler}.
     *
     * @returns The transaction which was just started
     */
    startTransaction(context: TransactionContext, customSamplingContext?: CustomSamplingContext): Transaction;
    /**
     * Starts a new `Session`, sets on the current scope and returns it.
     *
     * To finish a `session`, it has to be passed directly to `client.captureSession`, which is done automatically
     * when using `hub.endSession()` for the session currently stored on the scope.
     *
     * When there's already an existing session on the scope, it'll be automatically ended.
     *
     * @param context Optional properties of the new `Session`.
     *
     * @returns The session which was just started
     */
    startSession(context?: Session): Session;
    /**
     * Ends the session that lives on the current scope and sends it to Sentry
     */
    endSession(): void;
    /**
     * Sends the current session on the scope to Sentry
     * @param endSession If set the session will be marked as exited and removed from the scope
     */
    captureSession(endSession?: boolean): void;
    /**
     * Returns if default PII should be sent to Sentry and propagated in ourgoing requests
     * when Tracing is used.
     */
    shouldSendDefaultPii(): boolean;
}

/** Integration Class Interface */
interface IntegrationClass<T> {
    /**
     * Property that holds the integration name
     */
    id: string;
    new (...args: any[]): T;
}
/** Integration interface */
interface Integration {
    /**
     * Returns {@link IntegrationClass.id}
     */
    name: string;
    /**
     * Sets the integration up only once.
     * This takes no options on purpose, options should be passed in the constructor
     */
    setupOnce(addGlobalEventProcessor: (callback: EventProcessor) => void, getCurrentHub: () => Hub$1): void;
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

interface SdkMetadata {
    sdk?: SdkInfo;
}

/**
 * Vendored type from TS 3.8 `typescript/lib/lib.dom.d.ts`.
 *
 * Type is vendored in so that users don't have to opt-in to DOM types.
 */
interface TextEncoderCommon {
    /**
     * Returns "utf-8".
     */
    readonly encoding: string;
}
interface TextEncoderInternal extends TextEncoderCommon {
    encode(input?: string): Uint8Array;
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
    bufferSize?: number;
    recordDroppedEvent: Client['recordDroppedEvent'];
    textEncoder?: TextEncoderInternal;
}
interface BaseTransportOptions extends InternalBaseTransportOptions {
    url: string;
}
interface Transport {
    send(request: Envelope): PromiseLike<void | TransportMakeRequestResponse>;
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
     * By default, Sessions Tracking is enabled.
     */
    autoSessionTracking?: boolean;
    /**
     * Send SDK Client Reports.
     * By default, Client Reports are enabled.
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
     * The instrumenter to use. Defaults to `sentry`.
     * When not set to `sentry`, auto-instrumentation inside of Sentry will be disabled,
     * in favor of using external auto instrumentation.
     *
     * NOTE: Any option except for `sentry` is highly experimental and subject to change!
     */
    instrumenter?: Instrumenter;
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
     * If this is enabled, transactions and trace data will be generated and captured.
     * This will set the `tracesSampleRate` to the recommended default of `1.0` if `tracesSampleRate` is undefined.
     * Note that `tracesSampleRate` and `tracesSampler` take precedence over this option.
     */
    enableTracing?: boolean;
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
     * List of strings/regex controlling to which outgoing requests
     * the SDK will attach tracing headers.
     *
     * By default the SDK will attach those headers to all requests to localhost
     * and same origin. If this option is provided, the SDK will match the
     * request URL of outgoing requests against the items in this
     * array, and only attach tracing headers if a match was found.
     *
     * @example
     * ```js
     * Sentry.init({
     *   tracePropagationTargets: ['api.site.com'],
     * });
     * ```
     *
     * Default: ['localhost', /^\//] {@see DEFAULT_TRACE_PROPAGATION_TARGETS}
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
    beforeSend?: (event: ErrorEvent, hint: EventHint) => PromiseLike<Event | null> | Event | null;
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
    beforeSendTransaction?: (event: TransactionEvent, hint: EventHint) => PromiseLike<Event | null> | Event | null;
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
     * @param exception An exception-like object.
     * @param hint May contain additional information about the original exception.
     * @param scope An optional scope containing event metadata.
     * @returns The event id
     */
    captureException(exception: any, hint?: EventHint, scope?: Scope$1): string | undefined;
    /**
     * Captures a message event and sends it to Sentry.
     *
     * @param message The message to send to Sentry.
     * @param level Define the level of the message.
     * @param hint May contain additional information about the original exception.
     * @param scope An optional scope containing event metadata.
     * @returns The event id
     */
    captureMessage(message: string, level?: Severity | SeverityLevel, hint?: EventHint, scope?: Scope$1): string | undefined;
    /**
     * Captures a manually created event and sends it to Sentry.
     *
     * @param event The event to send to Sentry.
     * @param hint May contain additional information about the original exception.
     * @param scope An optional scope containing event metadata.
     * @returns The event id
     */
    captureEvent(event: Event, hint?: EventHint, scope?: Scope$1): string | undefined;
    /**
     * Captures a session
     *
     * @param session Session to be delivered
     */
    captureSession?(session: Session): void;
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
     * TODO (v8): Make this a required method.
     */
    getSdkMetadata?(): SdkMetadata | undefined;
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
     *
     * TODO (v8): Make this a required method.
     */
    addEventProcessor?(eventProcessor: EventProcessor): void;
    /**
     * Get all added event processors for this client.
     *
     * TODO (v8): Make this a required method.
     */
    getEventProcessors?(): EventProcessor[];
    /** Returns the client's instance of the given integration class, it any. */
    getIntegration<T extends Integration>(integration: IntegrationClass<T>): T | null;
    /**
     * Add an integration to the client.
     * This can be used to e.g. lazy load integrations.
     * In most cases, this should not be necessary, and you're better off just passing the integrations via `integrations: []` at initialization time.
     * However, if you find the need to conditionally load & add an integration, you can use `addIntegration` to do so.
     *
     * TODO (v8): Make this a required method.
     * */
    addIntegration?(integration: Integration): void;
    /** This is an internal function to setup all integrations that should run on the client */
    setupIntegrations(forceInitialize?: boolean): void;
    /** Creates an {@link Event} from all inputs to `captureException` and non-primitive inputs to `captureMessage`. */
    eventFromException(exception: any, hint?: EventHint): PromiseLike<Event>;
    /** Creates an {@link Event} from primitive inputs to `captureMessage`. */
    eventFromMessage(message: string, level?: Severity | SeverityLevel, hint?: EventHint): PromiseLike<Event>;
    /** Submits the event to Sentry */
    sendEvent(event: Event, hint?: EventHint): void;
    /** Submits the session to Sentry */
    sendSession(session: Session | SessionAggregates): void;
    /**
     * Record on the client that an event got dropped (ie, an event that will not be sent to sentry).
     *
     * @param reason The reason why the event got dropped.
     * @param category The data category of the dropped event.
     * @param event The dropped event.
     */
    recordDroppedEvent(reason: EventDropReason, dataCategory: DataCategory, event?: Event): void;
    /**
     * Register a callback for transaction start.
     * Receives the transaction as argument.
     */
    on?(hook: 'startTransaction', callback: (transaction: Transaction) => void): void;
    /**
     * Register a callback for transaction finish.
     * Receives the transaction as argument.
     */
    on?(hook: 'finishTransaction', callback: (transaction: Transaction) => void): void;
    /**
     * Register a callback for transaction start and finish.
     */
    on?(hook: 'beforeEnvelope', callback: (envelope: Envelope) => void): void;
    /**
     * Register a callback for before sending an event.
     * This is called right before an event is sent and should not be used to mutate the event.
     * Receives an Event & EventHint as arguments.
     */
    on?(hook: 'beforeSendEvent', callback: (event: Event, hint?: EventHint | undefined) => void): void;
    /**
     * Register a callback for preprocessing an event,
     * before it is passed to (global) event processors.
     * Receives an Event & EventHint as arguments.
     */
    on?(hook: 'preprocessEvent', callback: (event: Event, hint?: EventHint | undefined) => void): void;
    /**
     * Register a callback for when an event has been sent.
     */
    on?(hook: 'afterSendEvent', callback: (event: Event, sendResponse: TransportMakeRequestResponse | void) => void): void;
    /**
     * Register a callback before a breadcrumb is added.
     */
    on?(hook: 'beforeAddBreadcrumb', callback: (breadcrumb: Breadcrumb, hint?: BreadcrumbHint) => void): void;
    /**
     * Register a callback when a DSC (Dynamic Sampling Context) is created.
     */
    on?(hook: 'createDsc', callback: (dsc: DynamicSamplingContext) => void): void;
    /**
     * Register a callback when an OpenTelemetry span is ended (in @sentry/opentelemetry-node).
     * The option argument may be mutated to drop the span.
     */
    on?(hook: 'otelSpanEnd', callback: (otelSpan: unknown, mutableOptions: {
        drop: boolean;
    }) => void): void;
    /**
     * Fire a hook event for transaction start.
     * Expects to be given a transaction as the second argument.
     */
    emit?(hook: 'startTransaction', transaction: Transaction): void;
    /**
     * Fire a hook event for transaction finish.
     * Expects to be given a transaction as the second argument.
     */
    emit?(hook: 'finishTransaction', transaction: Transaction): void;
    emit?(hook: 'beforeEnvelope', envelope: Envelope): void;
    /**
     * Fire a hook event before sending an event.
     * This is called right before an event is sent and should not be used to mutate the event.
     * Expects to be given an Event & EventHint as the second/third argument.
     */
    emit?(hook: 'beforeSendEvent', event: Event, hint?: EventHint): void;
    /**
     * Fire a hook event to process events before they are passed to (global) event processors.
     * Expects to be given an Event & EventHint as the second/third argument.
     */
    emit?(hook: 'preprocessEvent', event: Event, hint?: EventHint): void;
    emit?(hook: 'afterSendEvent', event: Event, sendResponse: TransportMakeRequestResponse | void): void;
    /**
     * Fire a hook for when a breadcrumb is added. Expects the breadcrumb as second argument.
     */
    emit?(hook: 'beforeAddBreadcrumb', breadcrumb: Breadcrumb, hint?: BreadcrumbHint): void;
    /**
     * Fire a hook for when a DSC (Dynamic Sampling Context) is created. Expects the DSC as second argument.
     */
    emit?(hook: 'createDsc', dsc: DynamicSamplingContext): void;
    /**
     * Fire a hook for when an OpenTelemetry span is ended (in @sentry/opentelemetry-node).
     * Expects the OTEL span & as second argument, and an option object as third argument.
     * The option argument may be mutated to drop the span.
     */
    emit?(hook: 'otelSpanEnd', otelSpan: unknown, mutableOptions: {
        drop: boolean;
    }): void;
}


//# sourceMappingURL=globals.d.ts.map

interface PromiseBuffer<T> {
    $: Array<PromiseLike<T>>;
    add(taskProducer: () => PromiseLike<T>): PromiseLike<T>;
    drain(timeout?: number): PromiseLike<boolean>;
}

/**
 * The functions here, which enrich an event with request data, are mostly for use in Node, but are safe for use in a
 * browser context. They live here in `@sentry/utils` rather than in `@sentry/node` so that they can be used in
 * frameworks (like nextjs), which, because of SSR, run the same code in both Node and browser contexts.
 *
 * TODO (v8 / #5257): Remove the note below
 * Note that for now, the tests for this code have to live in `@sentry/node`, since they test both these functions and
 * the backwards-compatibility-preserving wrappers which still live in `handlers.ts` there.
 */

type TransactionNamingScheme = 'path' | 'methodPath' | 'handler';
/**
 * Options deciding what parts of the request to use when enhancing an event
 */
interface AddRequestDataToEventOptions {
    /** Flags controlling whether each type of data should be added to the event */
    include?: {
        ip?: boolean;
        request?: boolean | string[];
        transaction?: boolean | TransactionNamingScheme;
        user?: boolean | string[];
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
}

/**
 * Extract transaction context data from a `sentry-trace` header.
 *
 * @param traceparent Traceparent string
 *
 * @returns Object containing data from the header, or undefined if traceparent string is malformed
 */
declare function extractTraceparentData(traceparent?: string): TraceparentData | undefined;

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
    /**
     * @deprecated Moved to constructor options of the `Http` and `Undici` integration.
     * @example
     * ```js
     * Sentry.init({
     *   integrations: [
     *     new Sentry.Integrations.Http({
     *       tracing: {
     *         shouldCreateSpanForRequest: (url: string) => false,
     *       }
     *     });
     *   ],
     * });
     * ```
     */
    shouldCreateSpanForRequest?(this: void, url: string): boolean;
    /** Callback that is executed when a fatal global error occurs. */
    onFatalError?(this: void, error: Error): void;
}
/**
 * Configuration options for the Sentry Deno SDK
 * @see @sentry/types Options for more information.
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
 * Holds additional event information. {@link Scope.applyToEvent} will be
 * called by the client before an event will be sent.
 */
declare class Scope implements Scope$1 {
    /** Flag if notifying is happening. */
    protected _notifyingListeners: boolean;
    /** Callback for client to receive scope changes. */
    protected _scopeListeners: Array<(scope: Scope) => void>;
    /** Callback list that will be called after {@link applyToEvent}. */
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
    protected _level?: Severity | SeverityLevel;
    /** Transaction Name */
    protected _transactionName?: string;
    /** Span */
    protected _span?: Span$1;
    /** Session */
    protected _session?: Session;
    /** Request Mode Session Status */
    protected _requestSession?: RequestSession;
    constructor();
    /**
     * Inherit values from the parent scope.
     * @param scope to clone.
     */
    static clone(scope?: Scope): Scope;
    /**
     * Add internal on change listener. Used for sub SDKs that need to store the scope.
     * @hidden
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
    setLevel(level: Severity | SeverityLevel): this;
    /**
     * @inheritDoc
     */
    setTransactionName(name?: string): this;
    /**
     * @inheritDoc
     */
    setContext(key: string, context: Context | null): this;
    /**
     * @inheritDoc
     */
    setSpan(span?: Span$1): this;
    /**
     * @inheritDoc
     */
    getSpan(): Span$1 | undefined;
    /**
     * @inheritDoc
     */
    getTransaction(): Transaction | undefined;
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
    getAttachments(): Attachment[];
    /**
     * @inheritDoc
     */
    clearAttachments(): this;
    /**
     * Applies data from the scope to the event and runs all event processors on it.
     *
     * @param event Event
     * @param hint Object containing additional information about the original exception, for use by the event processors.
     * @hidden
     */
    applyToEvent(event: Event, hint?: EventHint, additionalEventProcessors?: EventProcessor[]): PromiseLike<Event | null>;
    /**
     * Add data which will be accessible during event processing but won't get sent to Sentry
     */
    setSDKProcessingMetadata(newData: {
        [key: string]: unknown;
    }): this;
    /**
     * @inheritDoc
     */
    setPropagationContext(context: PropagationContext): this;
    /**
     * @inheritDoc
     */
    getPropagationContext(): PropagationContext;
    /**
     * Get the breadcrumbs for this scope.
     */
    protected _getBreadcrumbs(): Breadcrumb[];
    /**
     * This will be called on every set call.
     */
    protected _notifyScopeListeners(): void;
    /**
     * Applies fingerprint from the scope to the event if there's one,
     * uses message if there's one instead or get rid of empty fingerprint
     */
    private _applyFingerprint;
}

interface RunWithAsyncContextOptions {
    /** Whether to reuse an existing async context if one exists. Defaults to false. */
    reuseExisting?: boolean;
}
/**
 * @private Private API with no semver guarantees!
 *
 * Strategy used to track async context.
 */
interface AsyncContextStrategy {
    /**
     * Gets the current async context. Returns undefined if there is no current async context.
     */
    getCurrentHub: () => Hub | undefined;
    /**
     * Runs the supplied callback in its own async context.
     */
    runWithAsyncContext<T>(callback: () => T, options: RunWithAsyncContextOptions): T;
}
/**
 * A layer in the process stack.
 * @hidden
 */
interface Layer {
    client?: Client;
    scope: Scope;
}
/**
 * An object that contains a hub and maintains a scope stack.
 * @hidden
 */
interface Carrier {
    __SENTRY__?: {
        hub?: Hub;
        acs?: AsyncContextStrategy;
        /**
         * Extra Hub properties injected by various SDKs
         */
        integrations?: Integration[];
        extensions?: {
            /** Extension methods for the hub, which are bound to the current Hub instance */
            [key: string]: Function;
        };
    };
}
/**
 * @inheritDoc
 */
declare class Hub implements Hub$1 {
    private readonly _version;
    /** Is a {@link Layer}[] containing the client and scope */
    private readonly _stack;
    /** Contains the last event id of a captured event.  */
    private _lastEventId?;
    /**
     * Creates a new instance of the hub, will push one {@link Layer} into the
     * internal stack on creation.
     *
     * @param client bound to the hub.
     * @param scope bound to the hub.
     * @param version number, higher number means higher priority.
     */
    constructor(client?: Client, scope?: Scope, _version?: number);
    /**
     * @inheritDoc
     */
    isOlderThan(version: number): boolean;
    /**
     * @inheritDoc
     */
    bindClient(client?: Client): void;
    /**
     * @inheritDoc
     */
    pushScope(): Scope;
    /**
     * @inheritDoc
     */
    popScope(): boolean;
    /**
     * @inheritDoc
     */
    withScope(callback: (scope: Scope) => void): void;
    /**
     * @inheritDoc
     */
    getClient<C extends Client>(): C | undefined;
    /** Returns the scope of the top stack. */
    getScope(): Scope;
    /** Returns the scope stack for domains or the process. */
    getStack(): Layer[];
    /** Returns the topmost scope layer in the order domain > local > process. */
    getStackTop(): Layer;
    /**
     * @inheritDoc
     */
    captureException(exception: unknown, hint?: EventHint): string;
    /**
     * @inheritDoc
     */
    captureMessage(message: string, level?: Severity | SeverityLevel, hint?: EventHint): string;
    /**
     * @inheritDoc
     */
    captureEvent(event: Event, hint?: EventHint): string;
    /**
     * @inheritDoc
     */
    lastEventId(): string | undefined;
    /**
     * @inheritDoc
     */
    addBreadcrumb(breadcrumb: Breadcrumb, hint?: BreadcrumbHint): void;
    /**
     * @inheritDoc
     */
    setUser(user: User | null): void;
    /**
     * @inheritDoc
     */
    setTags(tags: {
        [key: string]: Primitive;
    }): void;
    /**
     * @inheritDoc
     */
    setExtras(extras: Extras): void;
    /**
     * @inheritDoc
     */
    setTag(key: string, value: Primitive): void;
    /**
     * @inheritDoc
     */
    setExtra(key: string, extra: Extra): void;
    /**
     * @inheritDoc
     */
    setContext(name: string, context: {
        [key: string]: any;
    } | null): void;
    /**
     * @inheritDoc
     */
    configureScope(callback: (scope: Scope) => void): void;
    /**
     * @inheritDoc
     */
    run(callback: (hub: Hub) => void): void;
    /**
     * @inheritDoc
     */
    getIntegration<T extends Integration>(integration: IntegrationClass<T>): T | null;
    /**
     * @inheritDoc
     */
    startTransaction(context: TransactionContext, customSamplingContext?: CustomSamplingContext): Transaction;
    /**
     * @inheritDoc
     */
    traceHeaders(): {
        [key: string]: string;
    };
    /**
     * @inheritDoc
     */
    captureSession(endSession?: boolean): void;
    /**
     * @inheritDoc
     */
    endSession(): void;
    /**
     * @inheritDoc
     */
    startSession(context?: SessionContext): Session;
    /**
     * Returns if default PII should be sent to Sentry and propagated in ourgoing requests
     * when Tracing is used.
     */
    shouldSendDefaultPii(): boolean;
    /**
     * Sends the current Session on the scope
     */
    private _sendSessionUpdate;
    /**
     * Internal helper function to call a method on the top client if it exists.
     *
     * @param method The method to call on the client.
     * @param args Arguments to pass to the client function.
     */
    private _withClient;
    /**
     * Calls global extension method and binding current instance to the function call
     */
    private _callExtensionMethod;
}
/**
 * Replaces the current main hub with the passed one on the global object
 *
 * @returns The old replaced hub
 */
declare function makeMain(hub: Hub): Hub;
/**
 * Returns the default hub instance.
 *
 * If a hub is already registered in the global carrier but this module
 * contains a more recent version, it replaces the registered version.
 * Otherwise, the currently registered hub will be returned.
 */
declare function getCurrentHub(): Hub;
/**
 * Runs the supplied callback in its own async context. Async Context strategies are defined per SDK.
 *
 * @param callback The callback to run in its own async context
 * @param options Options to pass to the async context strategy
 * @returns The result of the callback
 */
declare function runWithAsyncContext<T>(callback: () => T, options?: RunWithAsyncContextOptions): T;
/**
 * This will create a new {@link Hub} and add to the passed object on
 * __SENTRY__.hub.
 * @param carrier object
 * @hidden
 */
declare function getHubFromCarrier(carrier: Carrier): Hub;

declare module '@sentry/types' {
    interface Integration {
        isDefaultInstance?: boolean;
    }
}
/** Map of integrations assigned to a client */
type IntegrationIndex = {
    [key: string]: Integration;
};

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
    /** Indicates whether this client's integrations have been set up. */
    protected _integrationsInitialized: boolean;
    /** Number of calls being processed */
    protected _numProcessing: number;
    /** Holds flushable  */
    private _outcomes;
    private _hooks;
    private _eventProcessors;
    /**
     * Initializes this client instance.
     *
     * @param options Options for the client.
     */
    protected constructor(options: O);
    /**
     * @inheritDoc
     */
    captureException(exception: any, hint?: EventHint, scope?: Scope): string | undefined;
    /**
     * @inheritDoc
     */
    captureMessage(message: string, level?: Severity | SeverityLevel, hint?: EventHint, scope?: Scope): string | undefined;
    /**
     * @inheritDoc
     */
    captureEvent(event: Event, hint?: EventHint, scope?: Scope): string | undefined;
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
     * @see SdkMetadata in @sentry/types
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
    /**
     * Sets up the integrations
     */
    setupIntegrations(forceInitialize?: boolean): void;
    /**
     * Gets an installed integration by its `id`.
     *
     * @returns The installed integration or `undefined` if no integration with that `id` was installed.
     */
    getIntegrationById(integrationId: string): Integration | undefined;
    /**
     * @inheritDoc
     */
    getIntegration<T extends Integration>(integration: IntegrationClass<T>): T | null;
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
    recordDroppedEvent(reason: EventDropReason, category: DataCategory, _event?: Event): void;
    /** @inheritdoc */
    on(hook: 'startTransaction', callback: (transaction: Transaction) => void): void;
    /** @inheritdoc */
    on(hook: 'finishTransaction', callback: (transaction: Transaction) => void): void;
    /** @inheritdoc */
    on(hook: 'beforeEnvelope', callback: (envelope: Envelope) => void): void;
    /** @inheritdoc */
    on(hook: 'beforeSendEvent', callback: (event: Event, hint?: EventHint) => void): void;
    /** @inheritdoc */
    on(hook: 'preprocessEvent', callback: (event: Event, hint?: EventHint) => void): void;
    /** @inheritdoc */
    on(hook: 'afterSendEvent', callback: (event: Event, sendResponse: TransportMakeRequestResponse | void) => void): void;
    /** @inheritdoc */
    on(hook: 'beforeAddBreadcrumb', callback: (breadcrumb: Breadcrumb, hint?: BreadcrumbHint) => void): void;
    /** @inheritdoc */
    on(hook: 'createDsc', callback: (dsc: DynamicSamplingContext) => void): void;
    /** @inheritdoc */
    on(hook: 'otelSpanEnd', callback: (otelSpan: unknown, mutableOptions: {
        drop: boolean;
    }) => void): void;
    /** @inheritdoc */
    emit(hook: 'startTransaction', transaction: Transaction): void;
    /** @inheritdoc */
    emit(hook: 'finishTransaction', transaction: Transaction): void;
    /** @inheritdoc */
    emit(hook: 'beforeEnvelope', envelope: Envelope): void;
    /** @inheritdoc */
    emit(hook: 'beforeSendEvent', event: Event, hint?: EventHint): void;
    /** @inheritdoc */
    emit(hook: 'preprocessEvent', event: Event, hint?: EventHint): void;
    /** @inheritdoc */
    emit(hook: 'afterSendEvent', event: Event, sendResponse: TransportMakeRequestResponse | void): void;
    /** @inheritdoc */
    emit(hook: 'beforeAddBreadcrumb', breadcrumb: Breadcrumb, hint?: BreadcrumbHint): void;
    /** @inheritdoc */
    emit(hook: 'createDsc', dsc: DynamicSamplingContext): void;
    /** @inheritdoc */
    emit(hook: 'otelSpanEnd', otelSpan: unknown, mutableOptions: {
        drop: boolean;
    }): void;
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
     * @param scope A scope containing event metadata.
     * @returns A new event with more information.
     */
    protected _prepareEvent(event: Event, hint: EventHint, scope?: Scope): PromiseLike<Event | null>;
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
     * @param scope A scope containing event metadata.
     * @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
     */
    protected _processEvent(event: Event, hint: EventHint, scope?: Scope): PromiseLike<Event>;
    /**
     * Occupies the client with processing and event
     */
    protected _process<T>(promise: PromiseLike<T>): void;
    /**
     * @inheritdoc
     */
    protected _sendEnvelope(envelope: Envelope): PromiseLike<void | TransportMakeRequestResponse> | void;
    /**
     * Clears outcomes on this client and returns them.
     */
    protected _clearOutcomes(): Outcome[];
    /**
     * @inheritDoc
     */
    abstract eventFromException(_exception: any, _hint?: EventHint): PromiseLike<Event>;
    /**
     * @inheritDoc
     */
    abstract eventFromMessage(_message: string, _level?: Severity | SeverityLevel, _hint?: EventHint): PromiseLike<Event>;
}

type ReleaseHealthAttributes = {
    environment?: string;
    release: string;
};
/**
 * @inheritdoc
 */
declare class SessionFlusher implements SessionFlusherLike {
    readonly flushTimeout: number;
    private _pendingAggregates;
    private _sessionAttrs;
    private _intervalId;
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
    eventFromMessage(message: string, level?: Severity | SeverityLevel, hint?: EventHint): PromiseLike<Event>;
    /**
     * @inheritDoc
     */
    captureException(exception: any, hint?: EventHint, scope?: Scope): string | undefined;
    /**
     * @inheritDoc
     */
    captureEvent(event: Event, hint?: EventHint, scope?: Scope): string | undefined;
    /**
     *
     * @inheritdoc
     */
    close(timeout?: number): PromiseLike<boolean>;
    /** Method that initialises an instance of SessionFlusher on Client */
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
     */
    protected _captureRequestSession(): void;
    /**
     * @inheritDoc
     */
    protected _prepareEvent(event: Event, hint: EventHint, scope?: Scope): PromiseLike<Event | null>;
    /** Extract trace information from scope */
    private _getTraceInfoFromScope;
}

/**
 * Keeps track of finished spans for a given transaction
 * @internal
 * @hideconstructor
 * @hidden
 */
declare class SpanRecorder {
    spans: Span[];
    private readonly _maxlen;
    constructor(maxlen?: number);
    /**
     * This is just so that we don't run out of memory while recording a lot
     * of spans. At some point we just stop and flush out the start of the
     * trace tree (i.e.the first n spans with the smallest
     * start_timestamp).
     */
    add(span: Span): void;
}
/**
 * Span contains all data about a span
 */
declare class Span implements Span$1 {
    /**
     * @inheritDoc
     */
    traceId: string;
    /**
     * @inheritDoc
     */
    spanId: string;
    /**
     * @inheritDoc
     */
    parentSpanId?: string;
    /**
     * Internal keeper of the status
     */
    status?: SpanStatusType | string;
    /**
     * @inheritDoc
     */
    sampled?: boolean;
    /**
     * Timestamp in seconds when the span was created.
     */
    startTimestamp: number;
    /**
     * Timestamp in seconds when the span ended.
     */
    endTimestamp?: number;
    /**
     * @inheritDoc
     */
    op?: string;
    /**
     * @inheritDoc
     */
    description?: string;
    /**
     * @inheritDoc
     */
    tags: {
        [key: string]: Primitive;
    };
    /**
     * @inheritDoc
     */
    data: {
        [key: string]: any;
    };
    /**
     * List of spans that were finalized
     */
    spanRecorder?: SpanRecorder;
    /**
     * @inheritDoc
     */
    transaction?: Transaction;
    /**
     * The instrumenter that created this span.
     */
    instrumenter: Instrumenter;
    /**
     * The origin of the span, giving context about what created the span.
     */
    origin?: SpanOrigin;
    /**
     * You should never call the constructor manually, always use `Sentry.startTransaction()`
     * or call `startChild()` on an existing span.
     * @internal
     * @hideconstructor
     * @hidden
     */
    constructor(spanContext?: SpanContext);
    /** An alias for `description` of the Span. */
    get name(): string;
    /** Update the name of the span. */
    set name(name: string);
    /**
     * @inheritDoc
     */
    startChild(spanContext?: Pick<SpanContext, Exclude<keyof SpanContext, 'sampled' | 'traceId' | 'parentSpanId'>>): Span;
    /**
     * @inheritDoc
     */
    setTag(key: string, value: Primitive): this;
    /**
     * @inheritDoc
     */
    setData(key: string, value: any): this;
    /**
     * @inheritDoc
     */
    setStatus(value: SpanStatusType): this;
    /**
     * @inheritDoc
     */
    setHttpStatus(httpStatus: number): this;
    /**
     * @inheritDoc
     */
    setName(name: string): void;
    /**
     * @inheritDoc
     */
    isSuccess(): boolean;
    /**
     * @inheritDoc
     */
    finish(endTimestamp?: number): void;
    /**
     * @inheritDoc
     */
    toTraceparent(): string;
    /**
     * @inheritDoc
     */
    toContext(): SpanContext;
    /**
     * @inheritDoc
     */
    updateWithContext(spanContext: SpanContext): this;
    /**
     * @inheritDoc
     */
    getTraceContext(): TraceContext;
    /**
     * @inheritDoc
     */
    toJSON(): {
        data?: {
            [key: string]: any;
        };
        description?: string;
        op?: string;
        parent_span_id?: string;
        span_id: string;
        start_timestamp: number;
        status?: string;
        tags?: {
            [key: string]: Primitive;
        };
        timestamp?: number;
        trace_id: string;
        origin?: SpanOrigin;
    };
}
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
/**
 * Converts a HTTP status code into a {@link SpanStatusType}.
 *
 * @param httpStatus The HTTP response status code.
 * @returns The span status or unknown_error.
 */
declare function spanStatusfromHttpCode(httpStatus: number): SpanStatusType;

/** Grabs active transaction off scope, if any */
declare function getActiveTransaction<T extends Transaction>(maybeHub?: Hub): T | undefined;

/**
 * Wraps a function with a transaction/span and finishes the span after the function is done.
 *
 * Note that if you have not enabled tracing extensions via `addTracingExtensions`
 * or you didn't set `tracesSampleRate`, this function will not generate spans
 * and the `span` returned from the callback will be undefined.
 *
 * This function is meant to be used internally and may break at any time. Use at your own risk.
 *
 * @internal
 * @private
 */
declare function trace<T>(context: TransactionContext, callback: (span?: Span) => T, onError?: (error: unknown) => void): T;
/**
 * Wraps a function with a transaction/span and finishes the span after the function is done.
 * The created span is the active span and will be used as parent by other spans created inside the function
 * and can be accessed via `Sentry.getSpan()`, as long as the function is executed while the scope is active.
 *
 * If you want to create a span that is not set as active, use {@link startInactiveSpan}.
 *
 * Note that if you have not enabled tracing extensions via `addTracingExtensions`
 * or you didn't set `tracesSampleRate`, this function will not generate spans
 * and the `span` returned from the callback will be undefined.
 */
declare function startSpan<T>(context: TransactionContext, callback: (span: Span | undefined) => T): T;
/**
 * Similar to `Sentry.startSpan`. Wraps a function with a transaction/span, but does not finish the span
 * after the function is done automatically.
 *
 * The created span is the active span and will be used as parent by other spans created inside the function
 * and can be accessed via `Sentry.getActiveSpan()`, as long as the function is executed while the scope is active.
 *
 * Note that if you have not enabled tracing extensions via `addTracingExtensions`
 * or you didn't set `tracesSampleRate`, this function will not generate spans
 * and the `span` returned from the callback will be undefined.
 */
declare function startSpanManual<T>(context: TransactionContext, callback: (span: Span | undefined, finish: () => void) => T): T;
/**
 * Creates a span. This span is not set as active, so will not get automatic instrumentation spans
 * as children or be able to be accessed via `Sentry.getSpan()`.
 *
 * If you want to create a span that is set as active, use {@link startSpan}.
 *
 * Note that if you have not enabled tracing extensions via `addTracingExtensions`
 * or you didn't set `tracesSampleRate` or `tracesSampler`, this function will not generate spans
 * and the `span` returned from the callback will be undefined.
 */
declare function startInactiveSpan(context: TransactionContext): Span | undefined;
/**
 * Returns the currently active span.
 */
declare function getActiveSpan(): Span | undefined;

/**
 * Adds a measurement to the current active transaction.
 */
declare function setMeasurement(name: string, value: number, unit: MeasurementUnit): void;

/**
 * Captures an exception event and sends it to Sentry.
 *
 * @param exception An exception-like object.
 * @param captureContext Additional scope data to apply to exception event.
 * @returns The generated eventId.
 */
declare function captureException(exception: any, captureContext?: CaptureContext): ReturnType<Hub['captureException']>;
/**
 * Captures a message event and sends it to Sentry.
 *
 * @param message The message to send to Sentry.
 * @param Severity Define the level of the message.
 * @returns The generated eventId.
 */
declare function captureMessage(message: string, captureContext?: CaptureContext | Severity | SeverityLevel): ReturnType<Hub['captureMessage']>;
/**
 * Captures a manually created event and sends it to Sentry.
 *
 * @param event The event to send to Sentry.
 * @returns The generated eventId.
 */
declare function captureEvent(event: Event, hint?: EventHint): ReturnType<Hub['captureEvent']>;
/**
 * Callback to set context information onto the scope.
 * @param callback Callback function that receives Scope.
 */
declare function configureScope(callback: (scope: Scope) => void): ReturnType<Hub['configureScope']>;
/**
 * Records a new breadcrumb which will be attached to future events.
 *
 * Breadcrumbs will be added to subsequent events to provide more context on
 * user's actions prior to an error or crash.
 *
 * @param breadcrumb The breadcrumb to record.
 */
declare function addBreadcrumb(breadcrumb: Breadcrumb): ReturnType<Hub['addBreadcrumb']>;
/**
 * Sets context data with the given name.
 * @param name of the context
 * @param context Any kind of data. This data will be normalized.
 */
declare function setContext(name: string, context: {
    [key: string]: any;
} | null): ReturnType<Hub['setContext']>;
/**
 * Set an object that will be merged sent as extra data with the event.
 * @param extras Extras object to merge into current context.
 */
declare function setExtras(extras: Extras): ReturnType<Hub['setExtras']>;
/**
 * Set key:value that will be sent as extra data with the event.
 * @param key String of extra
 * @param extra Any kind of data. This data will be normalized.
 */
declare function setExtra(key: string, extra: Extra): ReturnType<Hub['setExtra']>;
/**
 * Set an object that will be merged sent as tags data with the event.
 * @param tags Tags context object to merge into current context.
 */
declare function setTags(tags: {
    [key: string]: Primitive;
}): ReturnType<Hub['setTags']>;
/**
 * Set key:value that will be sent as tags data with the event.
 *
 * Can also be used to unset a tag, by passing `undefined`.
 *
 * @param key String key of tag
 * @param value Value of tag
 */
declare function setTag(key: string, value: Primitive): ReturnType<Hub['setTag']>;
/**
 * Updates user context information for future events.
 *
 * @param user User context object to be set in the current context. Pass `null` to unset the user.
 */
declare function setUser(user: User | null): ReturnType<Hub['setUser']>;
/**
 * Creates a new scope with and executes the given operation within.
 * The scope is automatically removed once the operation
 * finishes or throws.
 *
 * This is essentially a convenience function for:
 *
 *     pushScope();
 *     callback();
 *     popScope();
 *
 * @param callback that will be enclosed into push/popScope.
 */
declare function withScope(callback: (scope: Scope) => void): ReturnType<Hub['withScope']>;
/**
 * Starts a new `Transaction` and returns it. This is the entry point to manual tracing instrumentation.
 *
 * A tree structure can be built by adding child spans to the transaction, and child spans to other spans. To start a
 * new child span within the transaction or any span, call the respective `.startChild()` method.
 *
 * Every child span must be finished before the transaction is finished, otherwise the unfinished spans are discarded.
 *
 * The transaction must be finished with a call to its `.finish()` method, at which point the transaction with all its
 * finished child spans will be sent to Sentry.
 *
 * NOTE: This function should only be used for *manual* instrumentation. Auto-instrumentation should call
 * `startTransaction` directly on the hub.
 *
 * @param context Properties of the new `Transaction`.
 * @param customSamplingContext Information given to the transaction sampling function (along with context-dependent
 * default values). See {@link Options.tracesSampler}.
 *
 * @returns The transaction which was just started
 */
declare function startTransaction(context: TransactionContext, customSamplingContext?: CustomSamplingContext): ReturnType<Hub['startTransaction']>;
/**
 * Create a cron monitor check in and send it to Sentry.
 *
 * @param checkIn An object that describes a check in.
 * @param upsertMonitorConfig An optional object that describes a monitor config. Use this if you want
 * to create a monitor automatically when sending a check in.
 */
declare function captureCheckIn(checkIn: CheckIn, upsertMonitorConfig?: MonitorConfig): string;
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
 * This is the getter for lastEventId.
 *
 * @returns The last event id of a captured event.
 */
declare function lastEventId(): string | undefined;

/**
 * Add a EventProcessor to be kept globally.
 * @param callback EventProcessor to add
 */
declare function addGlobalEventProcessor(callback: EventProcessor): void;

/**
 * Creates an instance of a Sentry `Transport`
 *
 * @param options
 * @param makeRequest
 */
declare function createTransport(options: InternalBaseTransportOptions, makeRequest: TransportRequestExecutor, buffer?: PromiseBuffer<void | TransportMakeRequestResponse>): Transport;

declare const SDK_VERSION = "7.74.2-alpha.1";

/** Patch toString calls to return proper name for wrapped functions */
declare class FunctionToString implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    constructor();
    /**
     * @inheritDoc
     */
    setupOnce(): void;
}

/** Options for the InboundFilters integration */
interface InboundFiltersOptions {
    allowUrls: Array<string | RegExp>;
    denyUrls: Array<string | RegExp>;
    ignoreErrors: Array<string | RegExp>;
    ignoreTransactions: Array<string | RegExp>;
    ignoreInternal: boolean;
    disableErrorDefaults: boolean;
    disableTransactionDefaults: boolean;
}
/** Inbound filters configurable by the user */
declare class InboundFilters implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    private readonly _options;
    constructor(options?: Partial<InboundFiltersOptions>);
    /**
     * @inheritDoc
     */
    setupOnce(_addGlobaleventProcessor: unknown, _getCurrentHub: unknown): void;
    /** @inheritDoc */
    processEvent(event: Event, _eventHint: EventHint, client: Client): Event | null;
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

/** JSDoc */
interface BreadcrumbsOptions {
    console: boolean;
    dom: boolean | {
        serializeAttribute?: string | string[];
        maxStringLength?: number;
    };
    fetch: boolean;
    history: boolean;
    sentry: boolean;
    xhr: boolean;
}
/**
 * Default Breadcrumbs instrumentations
 * TODO: Deprecated - with v6, this will be renamed to `Instrument`
 */
declare class Breadcrumbs implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    /**
     * Options of the breadcrumbs integration.
     */
    readonly options: Readonly<BreadcrumbsOptions>;
    /**
     * @inheritDoc
     */
    constructor(options?: Partial<BreadcrumbsOptions>);
    /**
     * Instrument browser built-ins w/ breadcrumb capturing
     *  - Console API
     *  - DOM API (click/typing)
     *  - XMLHttpRequest API
     *  - Fetch API
     *  - History API
     */
    setupOnce(): void;
}

interface LinkedErrorsOptions {
    key: string;
    limit: number;
}
/** Adds SDK info to an event. */
declare class LinkedErrors implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    readonly name: string;
    /**
     * @inheritDoc
     */
    private readonly _key;
    /**
     * @inheritDoc
     */
    private readonly _limit;
    /**
     * @inheritDoc
     */
    constructor(options?: Partial<LinkedErrorsOptions>);
    /** @inheritdoc */
    setupOnce(): void;
    /**
     * @inheritDoc
     */
    preprocessEvent(event: Event, hint: EventHint | undefined, client: Client): void;
}

/** Deduplication filter */
declare class Dedupe implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    /**
     * @inheritDoc
     */
    private _previousEvent?;
    constructor();
    /** @inheritDoc */
    setupOnce(_addGlobaleventProcessor: unknown, _getCurrentHub: unknown): void;
    /**
     * @inheritDoc
     */
    processEvent(currentEvent: Event): Event | null;
}

/** Adds Electron context to events. */
declare class DenoContext implements Integration {
    /** @inheritDoc */
    static id: string;
    /** @inheritDoc */
    name: string;
    /** @inheritDoc */
    setupOnce(addGlobalEventProcessor: (callback: EventProcessor) => void): void;
}

type GlobalHandlersIntegrationsOptionKeys = 'error' | 'unhandledrejection';
/** JSDoc */
type GlobalHandlersIntegrations = Record<GlobalHandlersIntegrationsOptionKeys, boolean>;
/** Global handlers */
declare class GlobalHandlers implements Integration {
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    /** JSDoc */
    private readonly _options;
    /**
     * Stores references functions to installing handlers. Will set to undefined
     * after they have been run so that they are not used twice.
     */
    private _installFunc;
    /** JSDoc */
    constructor(options?: GlobalHandlersIntegrations);
    /**
     * @inheritDoc
     */
    setupOnce(): void;
}

/** Normalises paths to the app root directory. */
declare class NormalizePaths implements Integration {
    /** @inheritDoc */
    static id: string;
    /** @inheritDoc */
    name: string;
    /** @inheritDoc */
    setupOnce(addGlobalEventProcessor: (callback: EventProcessor) => void): void;
}

interface ContextLinesOptions {
    /**
     * Sets the number of context lines for each frame when loading a file.
     * Defaults to 7.
     *
     * Set to 0 to disable loading and inclusion of source files.
     */
    frameContextLines?: number;
}
/** Add node modules / packages to the event */
declare class ContextLines implements Integration {
    private readonly _options;
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    name: string;
    constructor(_options?: ContextLinesOptions);
    /** Get's the number of context lines to add */
    private get _contextLines();
    /**
     * @inheritDoc
     */
    setupOnce(addGlobalEventProcessor: (callback: EventProcessor) => void): void;
    /** Processes an event and adds context lines */
    addSourceContext(event: Event): Promise<Event>;
    /** Adds context lines to frames */
    addSourceContextToFrames(frames: StackFrame[]): Promise<void>;
}

declare const defaultIntegrations: (DenoContext | GlobalHandlers | NormalizePaths | ContextLines | InboundFilters | FunctionToString | Dedupe | LinkedErrors | Breadcrumbs)[];
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
 * import { configureScope } from 'npm:@sentry/deno';
 * configureScope((scope: Scope) => {
 *   scope.setExtra({ battery: 0.7 });
 *   scope.setTag({ user_mode: 'admin' });
 *   scope.setUser({ id: '4711' });
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
declare function init(options?: DenoOptions): void;

declare const INTEGRATIONS: {
    DenoContext: typeof DenoContext;
    GlobalHandlers: typeof GlobalHandlers;
    NormalizePaths: typeof NormalizePaths;
    ContextLines: typeof ContextLines;
    FunctionToString: typeof FunctionToString;
    InboundFilters: typeof InboundFilters;
};

export { type AddRequestDataToEventOptions, type Breadcrumb, type BreadcrumbHint, DenoClient, type DenoOptions, type Event, type EventHint, type Exception, Hub, INTEGRATIONS as Integrations, type PolymorphicRequest, type Request, SDK_VERSION, Scope, type SdkInfo, type Session, Severity, type SeverityLevel, type Span$1 as Span, type SpanStatusType, type StackFrame, type Stacktrace, type Thread, type Transaction, type User, addBreadcrumb, addGlobalEventProcessor, captureCheckIn, captureEvent, captureException, captureMessage, close, configureScope, createTransport, defaultIntegrations, extractTraceparentData, flush, getActiveSpan, getActiveTransaction, getCurrentHub, getHubFromCarrier, init, lastEventId, makeMain, runWithAsyncContext, setContext, setExtra, setExtras, setMeasurement, setTag, setTags, setUser, spanStatusfromHttpCode, startInactiveSpan, startSpan, startSpanManual, startTransaction, trace, withScope };
