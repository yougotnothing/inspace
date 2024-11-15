export interface GSAPComponent {
  className: string;
  delay: number;
  duration: number;
  top?: MeasurementUnits;
  marginTop?: MeasurementUnits;
  boxShadow?: string;
  gap?: MeasurementUnits;
}

type MeasurementUnits =
  | number
  | `${string}%`
  | `${string}px`
  | `${string}em`
  | `${string}rem`
  | `${string}svw`
  | `${string}svh`;
