// CSS Shadow Parts
// https://drafts.csswg.org/css-shadow-parts-1/#idl
interface Element {
  readonly part: DOMTokenList;
}

interface EventTarget {
  on(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void;
  emit(event: Event): boolean;
  off(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
}

// Web Share
// https://w3c.github.io/web-share/#idl-index
interface Navigator {
  share(data?: ShareData): Promise<void>;
}

interface ShareData {
  title: USVString;
  text:  USVString;
  url:   USVString;
}


// Badging API
// https://wicg.github.io/badging/#webidl-1814560553
interface Navigator {
  setAppBadge(contents?: number): Promise<void>;
  clearAppBadge():                Promise<void>;
}


// MediaSession
// https://w3c.github.io/mediasession/#the-mediasession-interface
interface Navigator {
  readonly mediaSession: MediaSession;
}
type MediaSessionPlaybackState = "none" | "paused" | "playing";

type MediaSessionAction = "play" | "pause" | "seekbackward" | "seekforward" | "previoustrack" | "nexttrack" | "skipad" | "stop" | "seekto";

interface MediaSessionActionHandler {
  (details: MediaSessionActionDetails): void;
}

interface MediaSession {
  metadata?:     MediaMetadata;
  playbackState: MediaSessionPlaybackState;
  setActionHandler(action: MediaSessionAction, handler?: MediaSessionActionHandler): void;
  setPositionState(state?: MediaPositionState): void;
}

type DOMString = string;
interface MediaMetadata {
  title:   DOMString;
  artist:  DOMString;
  album:   DOMString;
  artwork: ReadonlyArray<MediaImage>;
}

declare var MediaMetadata: {
  prototype: MediaMetadata;
  new(init?: MediaMetadataInit): MediaMetadata;
}

interface MediaMetadataInit {
  title?:   DOMString;
  artist?:  DOMString;
  album?:   DOMString;
  artwork?: MediaImage[];
}

type USVString = string;
interface MediaImage {
  src:    USVString;
  sizes?: DOMString;
  type?:  DOMString;
}

type Double = number;
interface MediaPositionState {
  duration?:     Double;
  playbackRate?: Double;
  position?:     Double;
}

interface MediaSessionActionDetails {
  action: MediaSessionAction;
  seekOffset?: Double;
  seekTime?:   Double;
  fastSeek?:   boolean;
}


// Portal
// https://wicg.github.io/portals/#idl-index
interface HTMLPortalElement extends HTMLElement {
}

declare var HTMLPortalElement: {
  prototype: HTMLPortalElement;
  new():     HTMLPortalElement;
}


// ReportingObserver
// https://w3c.github.io/reporting/#idl-index

interface ReportBody {
  toJSON(): any;
}

interface Report {
  toJSON(): any;
  type:     DOMString;
  url:      DOMString;
  body?:    ReportBody;
}

interface ReportingObserver {
  observe():     void;
  disconnect():  void;
  takeRecords(): ReportList;
}

declare var ReportingObserver: {
  prototype: ReportingObserver;
  new(callback: ReportingObserverCallback, options?: ReportingObserverOptions);
}

interface ReportingObserverCallback {
  (reports: Report[], observer: ReportingObserver): void;
}


interface ReportingObserverOptions {
  types:     DOMString[];
  buffered?: boolean;
}

type ReportList = Report[];

type EventHandler = (event: Event) => any;
// Background Fetch
// https://wicg.github.io/background-fetch/#idl-index
//partial interface ServiceWorkerGlobalScope {
//  attribute EventHandler onbackgroundfetchsuccess;
//  attribute EventHandler onbackgroundfetchfail;
//  attribute EventHandler onbackgroundfetchabort;
//  attribute EventHandler onbackgroundfetchclick;
//};

interface ServiceWorkerRegistration {
  backgroundFetch: BackgroundFetchManager;
}

interface BackgroundFetchManager {
  fetch(id: DOMString, requests: (RequestInfo | RequestInfo[]), options?: BackgroundFetchOptions): Promise<BackgroundFetchRegistration>;
  get(id: DOMString): Promise<BackgroundFetchRegistration>;
  getIds():           Promise<DOMString[]>;
}

interface BackgroundFetchUIOptions {
  icons: ImageResource[];
  title: DOMString;
}

interface ImageResource {
  src:       USVString;
  sizes?:    DOMString;
  type:      USVString;
  purpose?:  USVString;
  platform?: USVString;
}

interface BackgroundFetchOptions extends BackgroundFetchUIOptions {
  downloadTotal?: number;
}

interface BackgroundFetchRegistration extends EventTarget {
  id:               DOMString;
  uploadTotal:      number;
  uploaded:         number;
  downloadTotal:    number;
  downloaded:       number;
  result:           BackgroundFetchResult;
  failureReason:    BackgroundFetchFailureReason;
  recordsAvailable: boolean;
  onprogress:       EventHandler;
  abort():                                                      Promise<boolean>;
  match(request: RequestInfo, options?: CacheQueryOptions):     Promise<BackgroundFetchRecord>;
  matchAll(request?: RequestInfo, options?: CacheQueryOptions): Promise<BackgroundFetchRecord[]>;
}

type BackgroundFetchResult = "" | "success" | "failure";

type BackgroundFetchFailureReason =
  // The background fetch has not completed yet, or was successful.
  "" |
  // The operation was aborted by the user, or abort() was called.
  "aborted" |
  // A response had a not-ok-status.
  "bad-status" |
  // A fetch failed for other reasons, e.g. CORS, MIX, an invalid partial response,
  // or a general network failure for a fetch that cannot be retried.
  "fetch-error" |
  // Storage quota was reached during the operation.
  "quota-exceeded" |
  // The provided downloadTotal was exceeded.
  "download-total-exceeded";


interface BackgroundFetchRecord {
  request:       Request;
  responseReady: Promise<Response>;
}

interface ExtendableEvent extends Event {
   waitUntil(f: Promise<any>): void;
}

interface ExtendableEventInit extends EventInit {
}

declare var ExtendableEvent: {
  prototype: ExtendableEvent;
  new(type: DOMString, eventInitDict?: ExtendableEventInit);
}

interface BackgroundFetchEvent extends ExtendableEvent {
  registration: BackgroundFetchRegistration;
}

declare var BackgroundFetchEvent: {
  prototype: BackgroundFetchEvent;
  new(type: DOMString, init: BackgroundFetchEventInit);
}

interface BackgroundFetchEventInit extends ExtendableEventInit {
  registration: BackgroundFetchRegistration;
}

interface BackgroundFetchUpdateUIEvent extends BackgroundFetchEvent {
  updateUI(options?: BackgroundFetchUIOptions): Promise<void>;
}

declare var BackgroundFetchUpdateUIEvent: {
  prototype: BackgroundFetchUpdateUIEvent;
  new(type: DOMString, init: BackgroundFetchEventInit);
}
