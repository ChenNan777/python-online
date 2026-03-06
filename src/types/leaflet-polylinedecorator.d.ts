import * as L from 'leaflet';

declare module 'leaflet' {
  namespace Symbol {
    function circle(options: {
      pixelSize: number;
      pathOptions: L.PathOptions;
    }): unknown;

    function arrowHead(options: {
      pixelSize?: number;
      polygon?: boolean;
      pathOptions?: L.PathOptions;
    }): unknown;

    function dash(options: {
      pixelSize?: number;
      pathOptions?: L.PathOptions;
    }): unknown;
  }

  interface PolylineDecoratorPattern {
    offset?: number | string;
    repeat?: number | string;
    symbol: unknown;
  }

  function polylineDecorator(
    paths: L.Polyline | L.Polyline[] | L.LatLng[] | L.LatLng[][],
    options?: {
      patterns?: PolylineDecoratorPattern[];
    }
  ): L.FeatureGroup & {
    setPatterns(patterns: PolylineDecoratorPattern[]): void;
  };
}

declare module 'leaflet-polylinedecorator' {
  import * as L from 'leaflet';
  export = L;
}
