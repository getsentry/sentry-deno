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

type Instrumenter = 'sentry' | 'otel';

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

type DataCategory = 'default' | 'error' | 'transaction' | 'replay' | 'security' | 'attachment' | 'session' | 'internal' | 'profile' | 'monitor' | 'feedback' | 'unknown';

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

/**
 * An interface describing a user of an application or a handled request.
 */
interface User {
    [key: string]: any;
    id?: string | number;
    ip_address?: string;
    email?: string;
    username?: string;
    /**
     * @deprecated Functonality for segment has been removed. Use a custom tag or context instead to capture this information.
     */
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
    /** @deprecated This will be removed in v8. */
    transactionName?: string;
    span?: Span;
}
/**
 * Holds additional event information. {@link Scope.applyToEvent} will be called by the client before an event is sent.
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
    getClient(): Client | undefined;
    /** Add new event processor that will be called after {@link applyToEvent}. */
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
    setLevel(level: Severity | SeverityLevel): this;
    /**
     * Sets the transaction name on the scope for future events.
     * @deprecated Use extra or tags instead.
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
     * @deprecated Instead of setting a span on a scope, use `startSpan()`/`startSpanManual()` instead.
     */
    setSpan(span?: Span): this;
    /**
     * Returns the `Span` if there is one.
     * @deprecated Use `getActiveSpan()` instead.
     */
    getSpan(): Span | undefined;
    /**
     * Returns the `Transaction` attached to the scope (if there is one).
     * @deprecated You should not rely on the transaction, but just use `startSpan()` APIs instead.
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
    /**
     * Capture an exception for this scope.
     *
     * @param exception The exception to capture.
     * @param hint Optinal additional data to attach to the Sentry event.
     * @returns the id of the captured Sentry event.
     */
    captureException(exception: unknown, hint?: EventHint): string;
    /**
     * Capture a message for this scope.
     *
     * @param exception The exception to capture.
     * @param level An optional severity level to report the message with.
     * @param hint Optional additional data to attach to the Sentry event.
     * @returns the id of the captured message.
     */
    captureMessage(message: string, level?: SeverityLevel, hint?: EventHint): string;
    /**
     * Capture a Sentry event for this scope.
     *
     * @param exception The event to capture.
     * @param hint Optional additional data to attach to the Sentry event.
     * @returns the id of the captured event.
     */
    captureEvent(event: Event, hint?: EventHint): string;
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
    logentry?: {
        message?: string;
        params?: string[];
    };
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
    spans?: Span[];
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

interface FeedbackContext extends Record<string, unknown> {
    message: string;
    contact_email?: string;
    name?: string;
    replay_id?: string;
    url?: string;
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

type ThreadId = string;
type FrameId = number;
type StackId = number;
interface ThreadCpuSample {
    stack_id: StackId;
    thread_id: ThreadId;
    queue_address?: string;
    elapsed_since_start_ns: string;
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
interface Profile {
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
    /**
     * @deprecated Functonality for segment has been removed.
     */
    user_segment?: string;
    replay_id?: string;
    sampled?: string;
};
type EnvelopeItemType = 'client_report' | 'user_report' | 'feedback' | 'session' | 'sessions' | 'transaction' | 'attachment' | 'event' | 'profile' | 'replay_event' | 'replay_recording' | 'check_in' | 'statsd';
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
    attachment_type?: string;
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
type StatsdItemHeaders = {
    type: 'statsd';
    length: number;
};
type ProfileItemHeaders = {
    type: 'profile';
};
type EventItem = BaseEnvelopeItem<EventItemHeaders, Event>;
type AttachmentItem = BaseEnvelopeItem<AttachmentItemHeaders, string | Uint8Array>;
type UserFeedbackItem = BaseEnvelopeItem<UserFeedbackItemHeaders, UserFeedback>;
type SessionItem = BaseEnvelopeItem<SessionItemHeaders, Session | SerializedSession> | BaseEnvelopeItem<SessionAggregatesItemHeaders, SessionAggregates>;
type ClientReportItem = BaseEnvelopeItem<ClientReportItemHeaders, ClientReport>;
type CheckInItem = BaseEnvelopeItem<CheckInItemHeaders, SerializedCheckIn>;
type ReplayEventItem = BaseEnvelopeItem<ReplayEventItemHeaders, ReplayEvent>;
type ReplayRecordingItem = BaseEnvelopeItem<ReplayRecordingItemHeaders, ReplayRecordingData>;
type StatsdItem = BaseEnvelopeItem<StatsdItemHeaders, string>;
type FeedbackItem = BaseEnvelopeItem<FeedbackItemHeaders, FeedbackEvent>;
type ProfileItem = BaseEnvelopeItem<ProfileItemHeaders, Profile>;
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
type StatsdEnvelopeHeaders = BaseEnvelopeHeaders;
type EventEnvelope = BaseEnvelope<EventEnvelopeHeaders, EventItem | AttachmentItem | UserFeedbackItem | FeedbackItem | ProfileItem>;
type SessionEnvelope = BaseEnvelope<SessionEnvelopeHeaders, SessionItem>;
type ClientReportEnvelope = BaseEnvelope<ClientReportEnvelopeHeaders, ClientReportItem>;
type ReplayEnvelope = [ReplayEnvelopeHeaders, [ReplayEventItem, ReplayRecordingItem]];
type CheckInEnvelope = BaseEnvelope<CheckInEnvelopeHeaders, CheckInItem>;
type StatsdEnvelope = BaseEnvelope<StatsdEnvelopeHeaders, StatsdItem>;
type Envelope = EventEnvelope | SessionEnvelope | ClientReportEnvelope | ReplayEnvelope | CheckInEnvelope | StatsdEnvelope;

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
     * @deprecated Use attributes or store data on the scope instead.
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
interface Transaction extends TransactionContext, Omit<Span, 'setName' | 'name'> {
    /**
     * Human-readable identifier for the transaction.
     * @deprecated Use `spanToJSON(span).description` instead.
     */
    name: string;
    /**
     * The ID of the transaction.
     * @deprecated Use `spanContext().spanId` instead.
     */
    spanId: string;
    /**
     * The ID of the trace.
     * @deprecated Use `spanContext().traceId` instead.
     */
    traceId: string;
    /**
     * Was this transaction chosen to be sent as part of the sample?
     * @deprecated Use `spanIsSampled(transaction)` instead.
     */
    sampled?: boolean;
    /**
     * @inheritDoc
     */
    startTimestamp: number;
    /**
     * Tags for the transaction.
     * @deprecated Use `getSpanAttributes(transaction)` instead.
     */
    tags: {
        [key: string]: Primitive;
    };
    /**
     * Data for the transaction.
     * @deprecated Use `getSpanAttributes(transaction)` instead.
     */
    data: {
        [key: string]: any;
    };
    /**
     * Attributes for the transaction.
     * @deprecated Use `getSpanAttributes(transaction)` instead.
     */
    attributes: SpanAttributes;
    /**
     * Metadata about the transaction.
     * @deprecated Use attributes or store data on the scope instead.
     */
    metadata: TransactionMetadata;
    /**
     * The instrumenter that created this transaction.
     *
     * @deprecated This field will be removed in v8.
     */
    instrumenter: Instrumenter;
    /**
     * Set the name of the transaction
     *
     * @deprecated Use `.updateName()` and `.setAttribute()` instead.
     */
    setName(name: string, source?: TransactionMetadata['source']): void;
    /**
     * Set the context of a transaction event.
     * @deprecated Use either `.setAttribute()`, or set the context on the scope before creating the transaction.
     */
    setContext(key: string, context: Context): void;
    /**
     * Set observed measurement for this transaction.
     *
     * @param name Name of the measurement
     * @param value Value of the measurement
     * @param unit Unit of the measurement. (Defaults to an empty string)
     *
     * @deprecated Use top-level `setMeasurement()` instead.
     */
    setMeasurement(name: string, value: number, unit: MeasurementUnit): void;
    /**
     * Returns the current transaction properties as a `TransactionContext`.
     * @deprecated Use `toJSON()` or access the fields directly instead.
     */
    toContext(): TransactionContext;
    /**
     * Updates the current transaction with a new `TransactionContext`.
     * @deprecated Update the fields directly instead.
     */
    updateWithContext(transactionContext: TransactionContext): this;
    /**
     * Set metadata for this transaction.
     * @deprecated Use attributes or store data on the scope instead.
     */
    setMetadata(newMetadata: Partial<TransactionMetadata>): void;
    /**
     * Return the current Dynamic Sampling Context of this transaction
     *
     * @deprecated Use top-level `getDynamicSamplingContextFromSpan` instead.
     */
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
    /**
     * The sample rate used when sampling this transaction.
     * @deprecated Use `SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE` attribute instead.
     */
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
    /**
     * Information on how a transaction name was generated.
     * @deprecated Use `SEMANTIC_ATTRIBUTE_SENTRY_SOURCE` attribute instead.
     */
    source: TransactionSource;
    /**
     * Metadata for the transaction's spans, keyed by spanId.
     * @deprecated This will be removed in v8.
     */
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
type SpanAttributeValue = string | number | boolean | Array<null | undefined | string> | Array<null | undefined | number> | Array<null | undefined | boolean>;
type SpanAttributes = Partial<{
    'sentry.origin': string;
    'sentry.op': string;
    'sentry.source': string;
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
    tags?: {
        [key: string]: Primitive;
    };
    timestamp?: number;
    trace_id: string;
    origin?: SpanOrigin;
    _metrics_summary?: Record<string, Array<MetricSummary>>;
}
type TraceFlagNone = 0x0;
type TraceFlagSampled = 0x1;
type TraceFlag = TraceFlagNone | TraceFlagSampled;
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
     * Only true if the SpanContext was propagated from a remote parent.
     */
    isRemote?: boolean;
    /**
     * Trace flags to propagate.
     *
     * It is represented as 1 byte (bitmap). Bit to represent whether trace is
     * sampled or not. When set, the least significant bit documents that the
     * caller may have recorded trace data. A caller who does not record trace
     * data out-of-band leaves this flag unset.
     */
    traceFlags: TraceFlag;
}
/** Interface holding all properties that can be set on a Span on creation. */
interface SpanContext {
    /**
     * Description of the Span.
     *
     * @deprecated Use `name` instead.
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
     * @deprecated Pass `attributes` instead.
     */
    tags?: {
        [key: string]: Primitive;
    };
    /**
     * Data of the Span.
     * @deprecated Pass `attributes` instead.
     */
    data?: {
        [key: string]: any;
    };
    /**
     * Attributes of the Span.
     */
    attributes?: SpanAttributes;
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
interface Span extends Omit<SpanContext, 'op' | 'status' | 'origin'> {
    /**
     * Human-readable identifier for the span. Identical to span.description.
     * @deprecated Use `spanToJSON(span).description` instead.
     */
    name: string;
    /**
     * Operation of the Span.
     *
     * @deprecated Use `startSpan()` functions to set, `span.setAttribute(SEMANTIC_ATTRIBUTE_SENTRY_OP, 'op')
     * to update and `spanToJSON().op` to read the op instead
     */
    op?: string;
    /**
     * The ID of the span.
     * @deprecated Use `spanContext().spanId` instead.
     */
    spanId: string;
    /**
     * Parent Span ID
     *
     * @deprecated Use `spanToJSON(span).parent_span_id` instead.
     */
    parentSpanId?: string;
    /**
     * The ID of the trace.
     * @deprecated Use `spanContext().traceId` instead.
     */
    traceId: string;
    /**
     * Was this span chosen to be sent as part of the sample?
     * @deprecated Use `isRecording()` instead.
     */
    sampled?: boolean;
    /**
     * Timestamp in seconds (epoch time) indicating when the span started.
     * @deprecated Use `spanToJSON()` instead.
     */
    startTimestamp: number;
    /**
     * Timestamp in seconds (epoch time) indicating when the span ended.
     * @deprecated Use `spanToJSON()` instead.
     */
    endTimestamp?: number;
    /**
     * Tags for the span.
     * @deprecated Use `spanToJSON(span).atttributes` instead.
     */
    tags: {
        [key: string]: Primitive;
    };
    /**
     * Data for the span.
     * @deprecated Use `spanToJSON(span).atttributes` instead.
     */
    data: {
        [key: string]: any;
    };
    /**
     * Attributes for the span.
     * @deprecated Use `spanToJSON(span).atttributes` instead.
     */
    attributes: SpanAttributes;
    /**
     * The transaction containing this span
     * @deprecated Use top level `Sentry.getRootSpan()` instead
     */
    transaction?: Transaction;
    /**
     * The instrumenter that created this span.
     *
     * @deprecated this field will be removed.
     */
    instrumenter: Instrumenter;
    /**
     * Completion status of the Span.
     *
     * See: {@sentry/tracing SpanStatus} for possible values
     *
     * @deprecated Use `.setStatus` to set or update and `spanToJSON()` to read the status.
     */
    status?: string;
    /**
     * The origin of the span, giving context about what created the span.
     *
     * @deprecated Use `startSpan` function to set and `spanToJSON(span).origin` to read the origin instead.
     */
    origin?: SpanOrigin;
    /**
     * Get context data for this span.
     * This includes the spanId & the traceId.
     */
    spanContext(): SpanContextData;
    /**
     * Sets the finish timestamp on the current span.
     *
     * @param endTimestamp Takes an endTimestamp if the end should not be the time when you call this function.
     *
     * @deprecated Use `.end()` instead.
     */
    finish(endTimestamp?: number): void;
    /**
     * End the current span.
     */
    end(endTimestamp?: SpanTimeInput): void;
    /**
     * Sets the tag attribute on the current span.
     *
     * Can also be used to unset a tag, by passing `undefined`.
     *
     * @param key Tag key
     * @param value Tag value
     * @deprecated Use `setAttribute()` instead.
     */
    setTag(key: string, value: Primitive): this;
    /**
     * Sets the data attribute on the current span
     * @param key Data key
     * @param value Data value
     * @deprecated Use `setAttribute()` instead.
     */
    setData(key: string, value: any): this;
    /**
     * Set a single attribute on the span.
     * Set it to `undefined` to remove the attribute.
     */
    setAttribute(key: string, value: SpanAttributeValue | undefined): void;
    /**
     * Set multiple attributes on the span.
     * Any attribute set to `undefined` will be removed.
     */
    setAttributes(attributes: SpanAttributes): void;
    /**
     * Sets the status attribute on the current span
     * See: {@sentry/tracing SpanStatus} for possible values
     * @param status http code used to set the status
     */
    setStatus(status: string): this;
    /**
     * Sets the status attribute on the current span based on the http code
     * @param httpStatus http code used to set the status
     * @deprecated Use top-level `setHttpStatus()` instead.
     */
    setHttpStatus(httpStatus: number): this;
    /**
     * Set the name of the span.
     *
     * @deprecated Use `updateName()` instead.
     */
    setName(name: string): void;
    /**
     * Update the name of the span.
     */
    updateName(name: string): this;
    /**
     * Creates a new `Span` while setting the current `Span.id` as `parentSpanId`.
     * Also the `sampled` decision will be inherited.
     *
     * @deprecated Use `startSpan()`, `startSpanManual()` or `startInactiveSpan()` instead.
     */
    startChild(spanContext?: Pick<SpanContext, Exclude<keyof SpanContext, 'sampled' | 'traceId' | 'parentSpanId'>>): Span;
    /**
     * Determines whether span was successful (HTTP200)
     *
     * @deprecated Use `spanToJSON(span).status === 'ok'` instead.
     */
    isSuccess(): boolean;
    /**
     * Return a traceparent compatible header string.
     * @deprecated Use `spanToTraceHeader()` instead.
     */
    toTraceparent(): string;
    /**
     * Returns the current span properties as a `SpanContext`.
     * @deprecated Use `toJSON()` or access the fields directly instead.
     */
    toContext(): SpanContext;
    /**
     * Updates the current span with a new `SpanContext`.
     * @deprecated Update the fields directly instead.
     */
    updateWithContext(spanContext: SpanContext): this;
    /**
     * Convert the object to JSON for w. spans array info only.
     * @deprecated Use `spanToTraceContext()` util function instead.
     */
    getTraceContext(): TraceContext;
    /**
     * Convert the object to JSON.
     * @deprecated Use `spanToJSON(span)` instead.
     */
    toJSON(): SpanJSON;
    /**
     * If this is span is actually recording data.
     * This will return false if tracing is disabled, this span was not sampled or if the span is already finished.
     */
    isRecording(): boolean;
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
interface HeartbeatCheckIn {
    monitorSlug: SerializedCheckIn['monitor_slug'];
    status: 'ok' | 'error';
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
type CheckIn = HeartbeatCheckIn | InProgressCheckIn | FinishedCheckIn;
type SerializedMonitorConfig = NonNullable<SerializedCheckIn['monitor_config']>;
interface MonitorConfig {
    schedule: MonitorSchedule;
    checkinMargin?: SerializedMonitorConfig['checkin_margin'];
    maxRuntime?: SerializedMonitorConfig['max_runtime'];
    timezone?: SerializedMonitorConfig['timezone'];
    failure_issue_threshold?: number;
    recovery_threshold?: number;
}

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
     * @deprecated This will be removed in v8.
     */
    isOlderThan(version: number): boolean;
    /**
     * This binds the given client to the current scope.
     * @param client An SDK client (client) instance.
     *
     * @deprecated Use `initAndBind()` directly.
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
     *
     * @deprecated Use `withScope` instead.
     */
    pushScope(): Scope$1;
    /**
     * Removes a previously pushed scope from the stack.
     *
     * This restores the state before the scope was pushed. All breadcrumbs and
     * context information added since the last call to {@link this.pushScope} are
     * discarded.
     *
     * @deprecated Use `withScope` instead.
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
     *
     * @deprecated Use `Sentry.withScope()` instead.
     */
    withScope<T>(callback: (scope: Scope$1) => T): T;
    /**
     * Returns the client of the top stack.
     * @deprecated Use `Sentry.getClient()` instead.
     */
    getClient(): Client | undefined;
    /**
     * Returns the scope of the top stack.
     * @deprecated Use `Sentry.getCurrentScope()` instead.
     */
    getScope(): Scope$1;
    /**
     * Get the currently active isolation scope.
     * The isolation scope is used to isolate data between different hubs.
     *
     * @deprecated Use `Sentry.getIsolationScope()` instead.
     */
    getIsolationScope(): Scope$1;
    /**
     * Captures an exception event and sends it to Sentry.
     *
     * @param exception An exception-like object.
     * @param hint May contain additional information about the original exception.
     * @returns The generated eventId.
     *
     * @deprecated Use `Sentry.captureException()` instead.
     */
    captureException(exception: any, hint?: EventHint): string;
    /**
     * Captures a message event and sends it to Sentry.
     *
     * @param message The message to send to Sentry.
     * @param level Define the level of the message.
     * @param hint May contain additional information about the original exception.
     * @returns The generated eventId.
     *
     * @deprecated Use `Sentry.captureMessage()` instead.
     */
    captureMessage(message: string, level?: Severity | SeverityLevel, hint?: EventHint): string;
    /**
     * Captures a manually created event and sends it to Sentry.
     *
     * @param event The event to send to Sentry.
     * @param hint May contain additional information about the original exception.
     *
     * @deprecated Use `Sentry.captureEvent()` instead.
     */
    captureEvent(event: Event, hint?: EventHint): string;
    /**
     * This is the getter for lastEventId.
     *
     * @returns The last event id of a captured event.
     *
     * @deprecated This will be removed in v8.
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
     *
     * @deprecated Use `Sentry.addBreadcrumb()` instead.
     */
    addBreadcrumb(breadcrumb: Breadcrumb, hint?: BreadcrumbHint): void;
    /**
     * Updates user context information for future events.
     *
     * @param user User context object to be set in the current context. Pass `null` to unset the user.
     *
     * @deprecated Use `Sentry.setUser()` instead.
     */
    setUser(user: User | null): void;
    /**
     * Set an object that will be merged sent as tags data with the event.
     *
     * @param tags Tags context object to merge into current context.
     *
     * @deprecated Use `Sentry.setTags()` instead.
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
     *
     * @deprecated Use `Sentry.setTag()` instead.
     */
    setTag(key: string, value: Primitive): void;
    /**
     * Set key:value that will be sent as extra data with the event.
     * @param key String of extra
     * @param extra Any kind of data. This data will be normalized.
     *
     * @deprecated Use `Sentry.setExtra()` instead.
     */
    setExtra(key: string, extra: Extra): void;
    /**
     * Set an object that will be merged sent as extra data with the event.
     * @param extras Extras object to merge into current context.
     *
     * @deprecated Use `Sentry.setExtras()` instead.
     */
    setExtras(extras: Extras): void;
    /**
     * Sets context data with the given name.
     * @param name of the context
     * @param context Any kind of data. This data will be normalized.
     *
     * @deprecated Use `Sentry.setContext()` instead.
     */
    setContext(name: string, context: {
        [key: string]: any;
    } | null): void;
    /**
     * Callback to set context information onto the scope.
     *
     * @param callback Callback function that receives Scope.
     * @deprecated Use `getScope()` directly.
     */
    configureScope(callback: (scope: Scope$1) => void): void;
    /**
     * For the duration of the callback, this hub will be set as the global current Hub.
     * This function is useful if you want to run your own client and hook into an already initialized one
     * e.g.: Reporting issues to your own sentry when running in your component while still using the users configuration.
     *
     * TODO v8: This will be merged with `withScope()`
     */
    run(callback: (hub: Hub$1) => void): void;
    /**
     * Returns the integration if installed on the current client.
     *
     * @deprecated Use `Sentry.getClient().getIntegration()` instead.
     */
    getIntegration<T extends Integration>(integration: IntegrationClass<T>): T | null;
    /**
     * Returns all trace headers that are currently on the top scope.
     *
     * @deprecated Use `spanToTraceHeader()` instead.
     */
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
     * The transaction must be finished with a call to its `.end()` method, at which point the transaction with all its
     * finished child spans will be sent to Sentry.
     *
     * @param context Properties of the new `Transaction`.
     * @param customSamplingContext Information given to the transaction sampling function (along with context-dependent
     * default values). See {@link Options.tracesSampler}.
     *
     * @returns The transaction which was just started
     *
     * @deprecated Use `startSpan()`, `startSpanManual()` or `startInactiveSpan()` instead.
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
     *
     * @deprecated Use top-level `startSession` instead.
     */
    startSession(context?: Session): Session;
    /**
     * Ends the session that lives on the current scope and sends it to Sentry
     *
     * @deprecated Use top-level `endSession` instead.
     */
    endSession(): void;
    /**
     * Sends the current session on the scope to Sentry
     *
     * @param endSession If set the session will be marked as exited and removed from the scope
     *
     * @deprecated Use top-level `captureSession` instead.
     */
    captureSession(endSession?: boolean): void;
    /**
     * Returns if default PII should be sent to Sentry and propagated in outgoing requests
     * when Tracing is used.
     *
     * @deprecated Use top-level `getClient().getOptions().sendDefaultPii` instead. This function
     * only unnecessarily increased API surface but only wrapped accessing the option.
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
/** Integration interface.
 * This is more or less the same as `Integration`, but with a slimmer `setupOnce` siganture. */
interface IntegrationFnResult {
    /**
     * The name of the integration.
     */
    name: string;
    /**
     * This hook is only called once, even if multiple clients are created.
     * It does not receives any arguments, and should only use for e.g. global monkey patching and similar things.
     *
     * NOTE: In v8, this will become optional.
     */
    setupOnce(): void;
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
/** Integration interface */
interface Integration {
    /**
     * The name of the integration.
     */
    name: string;
    /**
     * This hook is only called once, even if multiple clients are created.
     * It does not receives any arguments, and should only use for e.g. global monkey patching and similar things.
     *
     * NOTE: In v8, this will become optional, and not receive any arguments anymore.
     */
    setupOnce(addGlobalEventProcessor: (callback: EventProcessor) => void, getCurrentHub: () => Hub$1): void;
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
 * An abstract definition of the minimum required API
 * for a metric instance.
 */
interface MetricInstance {
    /**
     * Returns the weight of the metric.
     */
    weight: number;
    /**
     * Adds a value to a metric.
     */
    add(value: number | string): void;
    /**
     * Serializes the metric into a statsd format string.
     */
    toString(): string;
}
interface MetricBucketItem {
    metric: MetricInstance;
    timestamp: number;
    metricType: 'c' | 'g' | 's' | 'd';
    name: string;
    unit: MeasurementUnit;
    tags: Record<string, string>;
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

type ParameterizedString = string & {
    __sentry_template_string__?: string;
    __sentry_template_values__?: string[];
};

interface StartSpanOptions extends TransactionContext {
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
     * The origin of the span - if it comes from auto instrumentation or manual instrumentation.
     *
     * @deprecated Set `attributes[SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]` instead.
     */
    origin?: SpanOrigin;
    /** Attributes for the span. */
    attributes?: SpanAttributes;
    /**
     * @deprecated Manually set the end timestamp instead.
     */
    trimEnd?: boolean;
    /**
     * @deprecated This cannot be set manually anymore.
     */
    parentSampled?: boolean;
    /**
     * @deprecated Use attributes or set data on scopes instead.
     */
    metadata?: Partial<TransactionMetadata>;
    /**
     * The name thingy.
     * @deprecated Use `name` instead.
     */
    description?: string;
    /**
     * @deprecated Use `span.setStatus()` instead.
     */
    status?: string;
    /**
     * @deprecated Use `scope` instead.
     */
    parentSpanId?: string;
    /**
     * @deprecated You cannot manually set the span to sampled anymore.
     */
    sampled?: boolean;
    /**
     * @deprecated You cannot manually set the spanId anymore.
     */
    spanId?: string;
    /**
     * @deprecated You cannot manually set the traceId anymore.
     */
    traceId?: string;
    /**
     * @deprecated Use an attribute instead.
     */
    source?: TransactionSource;
    /**
     * @deprecated Use attributes or set tags on the scope instead.
     */
    tags?: {
        [key: string]: Primitive;
    };
    /**
     * @deprecated Use attributes instead.
     */
    data?: {
        [key: string]: any;
    };
    /**
     * @deprecated Use `startTime` instead.
     */
    startTimestamp?: number;
    /**
     * @deprecated Use `span.end()` instead.
     */
    endTimestamp?: number;
    /**
     * @deprecated You cannot set the instrumenter manually anymore.
     */
    instrumenter?: Instrumenter;
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
    /**
     * Returns the client's instance of the given integration class, it any.
     * @deprecated Use `getIntegrationByName()` instead.
     */
    getIntegration<T extends Integration>(integration: IntegrationClass<T>): T | null;
    /** Get the instance of the integration with the given name on the client, if it was added. */
    getIntegrationByName?<T extends Integration = Integration>(name: string): T | undefined;
    /**
     * Add an integration to the client.
     * This can be used to e.g. lazy load integrations.
     * In most cases, this should not be necessary, and you're better off just passing the integrations via `integrations: []` at initialization time.
     * However, if you find the need to conditionally load & add an integration, you can use `addIntegration` to do so.
     *
     * TODO (v8): Make this a required method.
     * */
    addIntegration?(integration: Integration): void;
    /**
     * This is an internal function to setup all integrations that should run on the client.
     * @deprecated Use `client.init()` instead.
     */
    setupIntegrations(forceInitialize?: boolean): void;
    /**
     * Initialize this client.
     * Call this after the client was set on a scope.
     */
    init?(): void;
    /** Creates an {@link Event} from all inputs to `captureException` and non-primitive inputs to `captureMessage`. */
    eventFromException(exception: any, hint?: EventHint): PromiseLike<Event>;
    /** Creates an {@link Event} from primitive inputs to `captureMessage`. */
    eventFromMessage(message: ParameterizedString, level?: Severity | SeverityLevel, hint?: EventHint): PromiseLike<Event>;
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
     * Captures serialized metrics and sends them to Sentry.
     *
     * @experimental This API is experimental and might experience breaking changes
     */
    captureAggregateMetrics?(metricBucketItems: Array<MetricBucketItem>): void;
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
     * Register a callback when a Feedback event has been prepared.
     * This should be used to mutate the event. The options argument can hint
     * about what kind of mutation it expects.
     */
    on?(hook: 'beforeSendFeedback', callback: (feedback: FeedbackEvent, options?: {
        includeReplay?: boolean;
    }) => void): void;
    /**
     * A hook for BrowserTracing to trigger a span start for a page load.
     */
    on?(hook: 'startPageLoadSpan', callback: (options: StartSpanOptions) => void): void;
    /**
     * A hook for BrowserTracing to trigger a span for a navigation.
     */
    on?(hook: 'startNavigationSpan', callback: (options: StartSpanOptions) => void): void;
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
    /**
     * Fire a hook event for after preparing a feedback event. Events to be given
     * a feedback event as the second argument, and an optional options object as
     * third argument.
     */
    emit?(hook: 'beforeSendFeedback', feedback: FeedbackEvent, options?: {
        includeReplay?: boolean;
    }): void;
    /**
     * Emit a hook event for BrowserTracing to trigger a span start for a page load.
     */
    emit?(hook: 'startPageLoadSpan', options: StartSpanOptions): void;
    /**
     * Emit a hook event for BrowserTracing to trigger a span for a navigation.
     */
    emit?(hook: 'startNavigationSpan', options: StartSpanOptions): void;
}

interface PromiseBuffer<T> {
    $: Array<PromiseLike<T>>;
    add(taskProducer: () => PromiseLike<T>): PromiseLike<T>;
    drain(timeout?: number): PromiseLike<boolean>;
}

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
type TransactionNamingScheme = 'path' | 'methodPath' | 'handler';

/**
 * Takes a baggage header and turns it into Dynamic Sampling Context, by extracting all the "sentry-" prefixed values
 * from it.
 *
 * @param baggageHeader A very bread definition of a baggage header as it might appear in various frameworks.
 * @returns The Dynamic Sampling Context that was found on `baggageHeader`, if there was any, `undefined` otherwise.
 */
declare function baggageHeaderToDynamicSamplingContext(baggageHeader: string | string[] | number | null | undefined | boolean): Partial<DynamicSamplingContext> | undefined;

/**
 * Extract transaction context data from a `sentry-trace` header.
 *
 * @param traceparent Traceparent string
 *
 * @returns Object containing data from the header, or undefined if traceparent string is malformed
 */
declare function extractTraceparentData$1(traceparent?: string): TraceparentData | undefined;
/**
 * Create tracing context from incoming headers.
 *
 * @deprecated Use `propagationContextFromHeaders` instead.
 */
declare function tracingContextFromHeaders(sentryTrace: Parameters<typeof extractTraceparentData$1>[0], baggage: Parameters<typeof baggageHeaderToDynamicSamplingContext>[0]): {
    traceparentData: ReturnType<typeof extractTraceparentData$1>;
    dynamicSamplingContext: ReturnType<typeof baggageHeaderToDynamicSamplingContext>;
    propagationContext: PropagationContext;
};

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
 * Make the given client the current client.
 */
declare function setCurrentClient(client: Client): void;

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
    /**
     * Transaction Name
     */
    protected _transactionName?: string;
    /** Span */
    protected _span?: Span;
    /** Session */
    protected _session?: Session;
    /** Request Mode Session Status */
    protected _requestSession?: RequestSession;
    /** The client on this scope */
    protected _client?: Client;
    constructor();
    /**
     * Inherit values from the parent scope.
     * @deprecated Use `scope.clone()` and `new Scope()` instead.
     */
    static clone(scope?: Scope): Scope;
    /**
     * Clone this scope instance.
     */
    clone(): Scope;
    /** Update the client on the scope. */
    setClient(client: Client | undefined): void;
    /**
     * Get the client assigned to this scope.
     *
     * It is generally recommended to use the global function `Sentry.getClient()` instead, unless you know what you are doing.
     */
    getClient(): Client | undefined;
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
     * Sets the transaction name on the scope for future events.
     * @deprecated Use extra or tags instead.
     */
    setTransactionName(name?: string): this;
    /**
     * @inheritDoc
     */
    setContext(key: string, context: Context | null): this;
    /**
     * Sets the Span on the scope.
     * @param span Span
     * @deprecated Instead of setting a span on a scope, use `startSpan()`/`startSpanManual()` instead.
     */
    setSpan(span?: Span): this;
    /**
     * Returns the `Span` if there is one.
     * @deprecated Use `getActiveSpan()` instead.
     */
    getSpan(): Span | undefined;
    /**
     * Returns the `Transaction` attached to the scope (if there is one).
     * @deprecated You should not rely on the transaction, but just use `startSpan()` APIs instead.
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
     * @deprecated Use `getScopeData()` instead.
     */
    getAttachments(): Attachment[];
    /**
     * @inheritDoc
     */
    clearAttachments(): this;
    /** @inheritDoc */
    getScopeData(): ScopeData;
    /**
     * Applies data from the scope to the event and runs all event processors on it.
     *
     * @param event Event
     * @param hint Object containing additional information about the original exception, for use by the event processors.
     * @hidden
     * @deprecated Use `applyScopeDataToEvent()` directly
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
     * Capture an exception for this scope.
     *
     * @param exception The exception to capture.
     * @param hint Optinal additional data to attach to the Sentry event.
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
     * Captures a manually created event for this scope and sends it to Sentry.
     *
     * @param exception The event to capture.
     * @param hint Optional additional data to attach to the Sentry event.
     * @returns the id of the captured event.
     */
    captureEvent(event: Event, hint?: EventHint): string;
    /**
     * This will be called on every set call.
     */
    protected _notifyScopeListeners(): void;
}
/**
 * Get the global scope.
 * This scope is applied to _all_ events.
 */
declare function getGlobalScope(): Scope$1;

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
    private _isolationScope;
    /**
     * Creates a new instance of the hub, will push one {@link Layer} into the
     * internal stack on creation.
     *
     * @param client bound to the hub.
     * @param scope bound to the hub.
     * @param version number, higher number means higher priority.
     *
     * @deprecated Instantiation of Hub objects is deprecated and the constructor will be removed in version 8 of the SDK.
     *
     * If you are currently using the Hub for multi-client use like so:
     *
     * ```
     * // OLD
     * const hub = new Hub();
     * hub.bindClient(client);
     * makeMain(hub)
     * ```
     *
     * instead initialize the client as follows:
     *
     * ```
     * // NEW
     * Sentry.withIsolationScope(() => {
     *    Sentry.setCurrentClient(client);
     *    client.init();
     * });
     * ```
     *
     * If you are using the Hub to capture events like so:
     *
     * ```
     * // OLD
     * const client = new Client();
     * const hub = new Hub(client);
     * hub.captureException()
     * ```
     *
     * instead capture isolated events as follows:
     *
     * ```
     * // NEW
     * const client = new Client();
     * const scope = new Scope();
     * scope.setClient(client);
     * scope.captureException();
     * ```
     */
    constructor(client?: Client, scope?: Scope, isolationScope?: Scope, _version?: number);
    /**
     * Checks if this hub's version is older than the given version.
     *
     * @param version A version number to compare to.
     * @return True if the given version is newer; otherwise false.
     *
     * @deprecated This will be removed in v8.
     */
    isOlderThan(version: number): boolean;
    /**
     * This binds the given client to the current scope.
     * @param client An SDK client (client) instance.
     *
     * @deprecated Use `initAndBind()` directly, or `setCurrentClient()` and/or `client.init()` instead.
     */
    bindClient(client?: Client): void;
    /**
     * @inheritDoc
     *
     * @deprecated Use `withScope` instead.
     */
    pushScope(): Scope;
    /**
     * @inheritDoc
     *
     * @deprecated Use `withScope` instead.
     */
    popScope(): boolean;
    /**
     * @inheritDoc
     *
     * @deprecated Use `Sentry.withScope()` instead.
     */
    withScope<T>(callback: (scope: Scope) => T): T;
    /**
     * @inheritDoc
     *
     * @deprecated Use `Sentry.getClient()` instead.
     */
    getClient<C extends Client>(): C | undefined;
    /**
     * Returns the scope of the top stack.
     *
     * @deprecated Use `Sentry.getCurrentScope()` instead.
     */
    getScope(): Scope;
    /**
     * @deprecated Use `Sentry.getIsolationScope()` instead.
     */
    getIsolationScope(): Scope;
    /**
     * Returns the scope stack for domains or the process.
     * @deprecated This will be removed in v8.
     */
    getStack(): Layer[];
    /**
     * Returns the topmost scope layer in the order domain > local > process.
     * @deprecated This will be removed in v8.
     */
    getStackTop(): Layer;
    /**
     * @inheritDoc
     *
     * @deprecated Use `Sentry.captureException()` instead.
     */
    captureException(exception: unknown, hint?: EventHint): string;
    /**
     * @inheritDoc
     *
     * @deprecated Use  `Sentry.captureMessage()` instead.
     */
    captureMessage(message: string, level?: Severity | SeverityLevel, hint?: EventHint): string;
    /**
     * @inheritDoc
     *
     * @deprecated Use `Sentry.captureEvent()` instead.
     */
    captureEvent(event: Event, hint?: EventHint): string;
    /**
     * @inheritDoc
     *
     * @deprecated This will be removed in v8.
     */
    lastEventId(): string | undefined;
    /**
     * @inheritDoc
     *
     * @deprecated Use `Sentry.addBreadcrumb()` instead.
     */
    addBreadcrumb(breadcrumb: Breadcrumb, hint?: BreadcrumbHint): void;
    /**
     * @inheritDoc
     * @deprecated Use `Sentry.setUser()` instead.
     */
    setUser(user: User | null): void;
    /**
     * @inheritDoc
     * @deprecated Use `Sentry.setTags()` instead.
     */
    setTags(tags: {
        [key: string]: Primitive;
    }): void;
    /**
     * @inheritDoc
     * @deprecated Use `Sentry.setExtras()` instead.
     */
    setExtras(extras: Extras): void;
    /**
     * @inheritDoc
     * @deprecated Use `Sentry.setTag()` instead.
     */
    setTag(key: string, value: Primitive): void;
    /**
     * @inheritDoc
     * @deprecated Use `Sentry.setExtra()` instead.
     */
    setExtra(key: string, extra: Extra): void;
    /**
     * @inheritDoc
     * @deprecated Use `Sentry.setContext()` instead.
     */
    setContext(name: string, context: {
        [key: string]: any;
    } | null): void;
    /**
     * @inheritDoc
     *
     * @deprecated Use `getScope()` directly.
     */
    configureScope(callback: (scope: Scope) => void): void;
    /**
     * @inheritDoc
     */
    run(callback: (hub: Hub) => void): void;
    /**
     * @inheritDoc
     * @deprecated Use `Sentry.getClient().getIntegrationByName()` instead.
     */
    getIntegration<T extends Integration>(integration: IntegrationClass<T>): T | null;
    /**
     * Starts a new `Transaction` and returns it. This is the entry point to manual tracing instrumentation.
     *
     * A tree structure can be built by adding child spans to the transaction, and child spans to other spans. To start a
     * new child span within the transaction or any span, call the respective `.startChild()` method.
     *
     * Every child span must be finished before the transaction is finished, otherwise the unfinished spans are discarded.
     *
     * The transaction must be finished with a call to its `.end()` method, at which point the transaction with all its
     * finished child spans will be sent to Sentry.
     *
     * @param context Properties of the new `Transaction`.
     * @param customSamplingContext Information given to the transaction sampling function (along with context-dependent
     * default values). See {@link Options.tracesSampler}.
     *
     * @returns The transaction which was just started
     *
     * @deprecated Use `startSpan()`, `startSpanManual()` or `startInactiveSpan()` instead.
     */
    startTransaction(context: TransactionContext, customSamplingContext?: CustomSamplingContext): Transaction;
    /**
     * @inheritDoc
     * @deprecated Use `spanToTraceHeader()` instead.
     */
    traceHeaders(): {
        [key: string]: string;
    };
    /**
     * @inheritDoc
     *
     * @deprecated Use top level `captureSession` instead.
     */
    captureSession(endSession?: boolean): void;
    /**
     * @inheritDoc
     * @deprecated Use top level `endSession` instead.
     */
    endSession(): void;
    /**
     * @inheritDoc
     * @deprecated Use top level `startSession` instead.
     */
    startSession(context?: SessionContext): Session;
    /**
     * Returns if default PII should be sent to Sentry and propagated in ourgoing requests
     * when Tracing is used.
     *
     * @deprecated Use top-level `getClient().getOptions().sendDefaultPii` instead. This function
     * only unnecessarily increased API surface but only wrapped accessing the option.
     */
    shouldSendDefaultPii(): boolean;
    /**
     * Sends the current Session on the scope
     */
    private _sendSessionUpdate;
    /**
     * Calls global extension method and binding current instance to the function call
     */
    private _callExtensionMethod;
}
/**
 * Replaces the current main hub with the passed one on the global object
 *
 * @returns The old replaced hub
 *
 * @deprecated Use `setCurrentClient()` instead.
 */
declare function makeMain(hub: Hub): Hub;
/**
 * Returns the default hub instance.
 *
 * If a hub is already registered in the global carrier but this module
 * contains a more recent version, it replaces the registered version.
 * Otherwise, the currently registered hub will be returned.
 *
 * @deprecated Use the respective replacement method directly instead.
 */
declare function getCurrentHub(): Hub;
/**
 * Get the currently active isolation scope.
 * The isolation scope is active for the current exection context,
 * meaning that it will remain stable for the same Hub.
 */
declare function getIsolationScope(): Scope;
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
    /**
     * A reference to a metrics aggregator
     *
     * @experimental Note this is alpha API. It may experience breaking changes in the future.
     */
    metricsAggregator?: MetricsAggregator;
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
    captureException(exception: any, hint?: EventHint, scope?: Scope): string | undefined;
    /**
     * @inheritDoc
     */
    captureMessage(message: ParameterizedString, level?: Severity | SeverityLevel, hint?: EventHint, scope?: Scope): string | undefined;
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
     * This is an internal function to setup all integrations that should run on the client.
     * @deprecated Use `client.init()` instead.
     */
    setupIntegrations(forceInitialize?: boolean): void;
    /** @inheritdoc */
    init(): void;
    /**
     * Gets an installed integration by its `id`.
     *
     * @returns The installed integration or `undefined` if no integration with that `id` was installed.
     * @deprecated Use `getIntegrationByName()` instead.
     */
    getIntegrationById(integrationId: string): Integration | undefined;
    /**
     * Gets an installed integration by its name.
     *
     * @returns The installed integration or `undefined` if no integration with that `name` was installed.
     */
    getIntegrationByName<T extends Integration = Integration>(integrationName: string): T | undefined;
    /**
     * Returns the client's instance of the given integration class, it any.
     * @deprecated Use `getIntegrationByName()` instead.
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
    /**
     * @inheritDoc
     */
    captureAggregateMetrics(metricBucketItems: Array<MetricBucketItem>): void;
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
    on(hook: 'beforeSendFeedback', callback: (feedback: FeedbackEvent, options?: {
        includeReplay: boolean;
    }) => void): void;
    /** @inheritdoc */
    on(hook: 'startPageLoadSpan', callback: (options: StartSpanOptions) => void): void;
    /** @inheritdoc */
    on(hook: 'startNavigationSpan', callback: (options: StartSpanOptions) => void): void;
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
    /** @inheritdoc */
    emit(hook: 'beforeSendFeedback', feedback: FeedbackEvent, options?: {
        includeReplay: boolean;
    }): void;
    /** @inheritdoc */
    emit(hook: 'startPageLoadSpan', options: StartSpanOptions): void;
    /** @inheritdoc */
    emit(hook: 'startNavigationSpan', options: StartSpanOptions): void;
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
     * @param scope A scope containing event metadata.
     * @returns A new event with more information.
     */
    protected _prepareEvent(event: Event, hint: EventHint, scope?: Scope, isolationScope?: Scope): PromiseLike<Event | null>;
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
    abstract eventFromMessage(_message: ParameterizedString, _level?: Severity | SeverityLevel, _hint?: EventHint): PromiseLike<Event>;
}
/**
 * Add an event processor to the current client.
 * This event processor will run for all events processed by this client.
 */
declare function addEventProcessor(callback: EventProcessor): void;

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
    eventFromMessage(message: ParameterizedString, level?: Severity | SeverityLevel, hint?: EventHint): PromiseLike<Event>;
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
    protected _prepareEvent(event: Event, hint: EventHint, scope?: Scope, isolationScope?: Scope): PromiseLike<Event | null>;
    /** Extract trace information from scope */
    private _getTraceInfoFromScope;
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
    /** Whether to identify transactions by parameterized path, parameterized path with method, or handler name */
    transactionNamingScheme?: TransactionNamingScheme;
};
declare const requestDataIntegration: (options?: RequestDataIntegrationOptions | undefined) => IntegrationFnResult;

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
declare function getSpanStatusFromHttpCode(httpStatus: number): SpanStatusType;
/**
 * Converts a HTTP status code into a {@link SpanStatusType}.
 *
 * @deprecated Use {@link spanStatusFromHttpCode} instead.
 * This export will be removed in v8 as the signature contains a typo.
 *
 * @param httpStatus The HTTP response status code.
 * @returns The span status or unknown_error.
 */
declare const spanStatusfromHttpCode: typeof getSpanStatusFromHttpCode;
/**
 * Sets the Http status attributes on the current span based on the http code.
 * Additionally, the span's status is updated, depending on the http code.
 */
declare function setHttpStatus(span: Span, httpStatus: number): void;

/**
 * Grabs active transaction off scope.
 *
 * @deprecated You should not rely on the transaction, but just use `startSpan()` APIs instead.
 */
declare function getActiveTransaction<T extends Transaction>(maybeHub?: Hub): T | undefined;

/**
 * The `extractTraceparentData` function and `TRACEPARENT_REGEXP` constant used
 * to be declared in this file. It was later moved into `@sentry/utils` as part of a
 * move to remove `@sentry/tracing` dependencies from `@sentry/node` (`extractTraceparentData`
 * is the only tracing function used by `@sentry/node`).
 *
 * These exports are kept here for backwards compatability's sake.
 *
 * See https://github.com/getsentry/sentry-javascript/issues/4642 for more details.
 *
 * @deprecated Import this function from `@sentry/utils` instead
 */
declare const extractTraceparentData: typeof extractTraceparentData$1;

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
 *
 * @deprecated Use `startSpan` instead.
 */
declare function trace<T>(context: TransactionContext, callback: (span?: Span) => T, onError?: (error: unknown, span?: Span) => void, afterFinish?: () => void): T;
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
declare function startSpan<T>(context: StartSpanOptions, callback: (span: Span | undefined) => T): T;
/**
 * Similar to `Sentry.startSpan`. Wraps a function with a transaction/span, but does not finish the span
 * after the function is done automatically. You'll have to call `span.end()` manually.
 *
 * The created span is the active span and will be used as parent by other spans created inside the function
 * and can be accessed via `Sentry.getActiveSpan()`, as long as the function is executed while the scope is active.
 *
 * Note that if you have not enabled tracing extensions via `addTracingExtensions`
 * or you didn't set `tracesSampleRate`, this function will not generate spans
 * and the `span` returned from the callback will be undefined.
 */
declare function startSpanManual<T>(context: StartSpanOptions, callback: (span: Span | undefined, finish: () => void) => T): T;
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
declare function startInactiveSpan(context: StartSpanOptions): Span | undefined;
/**
 * Returns the currently active span.
 */
declare function getActiveSpan(): Span | undefined;
interface ContinueTrace {
    /**
     * Continue a trace from `sentry-trace` and `baggage` values.
     * These values can be obtained from incoming request headers,
     * or in the browser from `<meta name="sentry-trace">` and `<meta name="baggage">` HTML tags.
     *
     * @deprecated Use the version of this function taking a callback as second parameter instead:
     *
     * ```
     * Sentry.continueTrace(sentryTrace: '...', baggage: '...' }, () => {
     *    // ...
     * })
     * ```
     *
     */
    ({ sentryTrace, baggage, }: {
        sentryTrace: Parameters<typeof tracingContextFromHeaders>[0];
        baggage: Parameters<typeof tracingContextFromHeaders>[1];
    }): Partial<TransactionContext>;
    /**
     * Continue a trace from `sentry-trace` and `baggage` values.
     * These values can be obtained from incoming request headers, or in the browser from `<meta name="sentry-trace">`
     * and `<meta name="baggage">` HTML tags.
     *
     * Spans started with `startSpan`, `startSpanManual` and `startInactiveSpan`, within the callback will automatically
     * be attached to the incoming trace.
     *
     * Deprecation notice: In the next major version of the SDK the provided callback will not receive a transaction
     * context argument.
     */
    <V>({ sentryTrace, baggage, }: {
        sentryTrace: Parameters<typeof tracingContextFromHeaders>[0];
        baggage: Parameters<typeof tracingContextFromHeaders>[1];
    }, callback: (transactionContext: Partial<TransactionContext>) => V): V;
}
declare const continueTrace: ContinueTrace;

/**
 * Adds a measurement to the current active transaction.
 */
declare function setMeasurement(name: string, value: number, unit: MeasurementUnit): void;

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
declare function captureException(exception: any, hint?: ExclusiveEventHintOrCaptureContext): string;
/**
 * Captures a message event and sends it to Sentry.
 *
 * @param exception The exception to capture.
 * @param captureContext Define the level of the message or pass in additional data to attach to the message.
 * @returns the id of the captured message.
 */
declare function captureMessage(message: string, captureContext?: CaptureContext | Severity | SeverityLevel): string;
/**
 * Captures a manually created event and sends it to Sentry.
 *
 * @param exception The event to send to Sentry.
 * @param hint Optional additional data to attach to the Sentry event.
 * @returns the id of the captured event.
 */
declare function captureEvent(event: Event, hint?: EventHint): string;
/**
 * Callback to set context information onto the scope.
 * @param callback Callback function that receives Scope.
 *
 * @deprecated Use getCurrentScope() directly.
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
declare function addBreadcrumb(breadcrumb: Breadcrumb, hint?: BreadcrumbHint): ReturnType<Hub['addBreadcrumb']>;
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
 */
declare function withScope<T>(callback: (scope: Scope) => T): T;
/**
 * Set the given scope as the active scope in the callback.
 */
declare function withScope<T>(scope: Scope$1 | undefined, callback: (scope: Scope) => T): T;
/**
 * Attempts to fork the current isolation scope and the current scope based on the current async context strategy. If no
 * async context strategy is set, the isolation scope and the current scope will not be forked (this is currently the
 * case, for example, in the browser).
 *
 * Usage of this function in environments without async context strategy is discouraged and may lead to unexpected behaviour.
 *
 * This function is intended for Sentry SDK and SDK integration development. It is not recommended to be used in "normal"
 * applications directly because it comes with pitfalls. Use at your own risk!
 *
 * @param callback The callback in which the passed isolation scope is active. (Note: In environments without async
 * context strategy, the currently active isolation scope may change within execution of the callback.)
 * @returns The same value that `callback` returns.
 */
declare function withIsolationScope<T>(callback: (isolationScope: Scope) => T): T;
/**
 * Starts a new `Transaction` and returns it. This is the entry point to manual tracing instrumentation.
 *
 * A tree structure can be built by adding child spans to the transaction, and child spans to other spans. To start a
 * new child span within the transaction or any span, call the respective `.startChild()` method.
 *
 * Every child span must be finished before the transaction is finished, otherwise the unfinished spans are discarded.
 *
 * The transaction must be finished with a call to its `.end()` method, at which point the transaction with all its
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
 *
 * @deprecated Use `startSpan()`, `startSpanManual()` or `startInactiveSpan()` instead.
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
 * This is the getter for lastEventId.
 *
 * @returns The last event id of a captured event.
 * @deprecated This function will be removed in the next major version of the Sentry SDK.
 */
declare function lastEventId(): string | undefined;
/**
 * Get the currently active client.
 */
declare function getClient<C extends Client>(): C | undefined;
/**
 * Returns true if Sentry has been properly initialized.
 */
declare function isInitialized(): boolean;
/**
 * Get the currently active scope.
 */
declare function getCurrentScope(): Scope;

/**
 * Add a EventProcessor to be kept globally.
 * @deprecated Use `addEventProcessor` instead. Global event processors will be removed in v8.
 */
declare function addGlobalEventProcessor(callback: EventProcessor): void;

/**
 * Creates an instance of a Sentry `Transport`
 *
 * @param options
 * @param makeRequest
 */
declare function createTransport(options: InternalBaseTransportOptions, makeRequest: TransportRequestExecutor, buffer?: PromiseBuffer<void | TransportMakeRequestResponse>): Transport;

declare const SDK_VERSION = "7.101.0";

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
declare const inboundFiltersIntegration: (options?: Partial<InboundFiltersOptions> | undefined) => IntegrationFnResult;

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
declare const functionToStringIntegration: () => IntegrationFnResult;

interface LinkedErrorsOptions {
    key?: string;
    limit?: number;
}
declare const linkedErrorsIntegration: (options?: LinkedErrorsOptions | undefined) => IntegrationFnResult;

interface MetricData {
    unit?: MeasurementUnit;
    tags?: Record<string, Primitive>;
    timestamp?: number;
}
/**
 * Adds a value to a counter metric
 *
 * @experimental This API is experimental and might have breaking changes in the future.
 */
declare function increment(name: string, value?: number, data?: MetricData): void;
/**
 * Adds a value to a distribution metric
 *
 * @experimental This API is experimental and might have breaking changes in the future.
 */
declare function distribution(name: string, value: number, data?: MetricData): void;
/**
 * Adds a value to a set metric. Value must be a string or integer.
 *
 * @experimental This API is experimental and might have breaking changes in the future.
 */
declare function set(name: string, value: number | string, data?: MetricData): void;
/**
 * Adds a value to a gauge metric
 *
 * @experimental This API is experimental and might have breaking changes in the future.
 */
declare function gauge(name: string, value: number, data?: MetricData): void;
declare const metrics: {
    increment: typeof increment;
    distribution: typeof distribution;
    set: typeof set;
    gauge: typeof gauge;
    /** @deprecated Use `metrics.metricsAggregratorIntegration()` instead. */
    MetricsAggregator: IntegrationClass<Integration & {
        setup: (client: Client<ClientOptions<BaseTransportOptions>>) => void;
    }>;
    metricsAggregatorIntegration: () => IntegrationFnResult;
};

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

/** @deprecated Use `getDefaultIntegrations(options)` instead. */
declare const defaultIntegrations: IntegrationFnResult[];
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
declare const breadcrumbsIntegration: (options?: Partial<BreadcrumbsOptions> | undefined) => IntegrationFnResult;

declare const dedupeIntegration: () => IntegrationFnResult;

declare const denoContextIntegration: () => IntegrationFnResult;

type GlobalHandlersIntegrationsOptionKeys = 'error' | 'unhandledrejection';
type GlobalHandlersIntegrations = Record<GlobalHandlersIntegrationsOptionKeys, boolean>;
declare const globalHandlersIntegration: (options?: GlobalHandlersIntegrations | undefined) => IntegrationFnResult;

declare const normalizePathsIntegration: () => IntegrationFnResult;

interface ContextLinesOptions {
    /**
     * Sets the number of context lines for each frame when loading a file.
     * Defaults to 7.
     *
     * Set to 0 to disable loading and inclusion of source files.
     */
    frameContextLines?: number;
}
declare const contextLinesIntegration: (options?: ContextLinesOptions | undefined) => IntegrationFnResult;

declare const denoCronIntegration: () => IntegrationFnResult;

/** @deprecated Import the integration function directly, e.g. `inboundFiltersIntegration()` instead of `new Integrations.InboundFilter(). */
declare const Integrations: {
    DenoContext: IntegrationClass<Integration & {
        processEvent: (event: Event) => Promise<Event>;
    }>;
    GlobalHandlers: IntegrationClass<Integration & {
        setup: (client: Client<ClientOptions<BaseTransportOptions>>) => void;
    }>;
    NormalizePaths: IntegrationClass<Integration & {
        processEvent: (event: Event) => Event;
    }>;
    ContextLines: IntegrationClass<Integration & {
        processEvent: (event: Event) => Promise<Event>;
    }>;
    DenoCron: IntegrationClass<Integration & {
        setup: (client: Client<ClientOptions<BaseTransportOptions>>) => void;
    }>;
    FunctionToString: IntegrationClass<Integration & {
        setupOnce: () => void;
    }>;
    InboundFilters: IntegrationClass<Integration & {
        preprocessEvent: (event: Event, hint: EventHint, client: Client<ClientOptions<BaseTransportOptions>>) => void;
    }> & (new (options?: Partial<{
        allowUrls: (string | RegExp)[];
        denyUrls: (string | RegExp)[];
        ignoreErrors: (string | RegExp)[];
        ignoreTransactions: (string | RegExp)[];
        ignoreInternal: boolean;
        disableErrorDefaults: boolean;
        disableTransactionDefaults: boolean;
    }> | undefined) => Integration);
    LinkedErrors: IntegrationClass<Integration & {
        preprocessEvent: (event: Event, hint: EventHint, client: Client<ClientOptions<BaseTransportOptions>>) => void;
    }> & (new (options?: {
        key?: string | undefined;
        limit?: number | undefined;
    } | undefined) => Integration);
};

export { type AddRequestDataToEventOptions, type Breadcrumb, type BreadcrumbHint, DenoClient, type DenoOptions, type Event, type EventHint, type Exception, Hub, Integrations, type PolymorphicRequest, type Request, SDK_VERSION, SEMANTIC_ATTRIBUTE_SENTRY_OP, SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN, SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, Scope, type SdkInfo, type Session, Severity, type SeverityLevel, type Span, type SpanStatusType, type StackFrame, type Stacktrace, type Thread, type Transaction, type User, addBreadcrumb, addEventProcessor, addGlobalEventProcessor, breadcrumbsIntegration, captureCheckIn, captureEvent, captureException, captureMessage, close, configureScope, contextLinesIntegration, continueTrace, createTransport, dedupeIntegration, defaultIntegrations, denoContextIntegration, denoCronIntegration, extractTraceparentData, flush, functionToStringIntegration, getActiveSpan, getActiveTransaction, getClient, getCurrentHub, getCurrentScope, getDefaultIntegrations, getGlobalScope, getHubFromCarrier, getIsolationScope, getSpanStatusFromHttpCode, globalHandlersIntegration, inboundFiltersIntegration, init, isInitialized, lastEventId, linkedErrorsIntegration, makeMain, metrics, normalizePathsIntegration, requestDataIntegration, runWithAsyncContext, setContext, setCurrentClient, setExtra, setExtras, setHttpStatus, setMeasurement, setTag, setTags, setUser, spanStatusfromHttpCode, startInactiveSpan, startSpan, startSpanManual, startTransaction, trace, withIsolationScope, withMonitor, withScope };
