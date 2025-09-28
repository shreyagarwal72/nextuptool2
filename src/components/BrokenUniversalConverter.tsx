import { ToolRedirect } from "./ToolRedirect";

export const BrokenUniversalConverter = () => {
  return (
    <ToolRedirect
      toolName="Universal File Converter"
      description="Convert between multiple file formats"
      alternativeUrl="https://convertio.co/"
      alternativeName="Convertio"
      reason="Our conversion engine is being updated to support more file formats"
    />
  );
};