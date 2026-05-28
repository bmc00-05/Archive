import { Figure } from "@/components/mdx/Figure";
import { Slide } from "@/components/mdx/Slide";
import TroubleshootingList from "@/components/molecules/TroubleshootingList";
import FeatureList from "@/components/molecules/FeatureList";
import ArchitectureDiagram from "@/components/molecules/ArchitectureDiagram";
import {
  Box,
  Center,
  Cols,
  FullBleed,
  Hero,
  Row,
  Stack,
  Stat,
} from "@/components/mdx/layout";

/**
 * MDX 본문에서 import 없이 사용 가능한 전역 컴포넌트.
 * 각 페이지에서 `<Content components={mdxComponents} />` 로 전달.
 */
export const mdxComponents = {
  Slide,
  Figure,
  Cols,
  Row,
  Stack,
  Center,
  Hero,
  Stat,
  FullBleed,
  Box,
  TroubleshootingList,
  FeatureList,
  ArchitectureDiagram,
};
