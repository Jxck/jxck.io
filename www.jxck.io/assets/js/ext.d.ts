// CSS Shadow Parts
// https://drafts.csswg.org/css-shadow-parts-1/#idl
interface Element {
  readonly part: DOMTokenList;
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
