import { ReactElement } from "react";
import ControlVariationComponent from "../components/ControlVariationComponent";
import TestVariationComponent from "../components/TestVariationComponent";

interface Variation {
  id: string;
  component: ReactElement;
}

const variations: Variation[] = [
  {
    id: "control-variation",
    component: <ControlVariationComponent />,
  },
  {
    id: "test-variation",
    component: <TestVariationComponent />,
  },
];

export default variations;
