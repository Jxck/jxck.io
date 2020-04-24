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

interface MediaSession {
  metadata?: MediaMetadata;
  playbackState?: MediaSessionPlaybackState;
  setActionHandler(action: MediaSessionAction, handler?: MediaSessionActionHandler): void;
  setPositionState(state?: MediaPositionState): void;
}

declare var MediaMetadata: {
  prototype: MediaMetadata;
  new(init?: MediaMetadataInit): MediaMetadata;
}

type DOMString = string;
interface MediaMetadata {
  title:   DOMString;
  artist:  DOMString;
  album:   DOMString;
  artwork: ReadonlyArray<MediaImage>;
}

type USVString = string;
interface MediaImage {
  src:   USVString;
  sizes?: DOMString;
  type?:  DOMString;
}

interface MediaSessionActionHandler {
  (details: MediaSessionActionDetails): void;
}

interface MediaPositionState {
  duration?: number;
  playbackRate?: number;
  position?: number;
}

interface MediaMetadataInit {
  album?: string;
  artist?: string;
  artwork?: MediaImage[];
  title?: string;
}

interface MediaSessionActionDetails {
  action: MediaSessionAction;
}

type MediaSessionAction        = "nexttrack" | "pause" | "play" | "previoustrack" | "seekbackward" | "seekforward" | "seekto" | "skipad" | "stop";
type MediaSessionPlaybackState = "none" | "paused" | "playing";
