import { ToolRedirect } from "./ToolRedirect";

export const BrokenURLShortener = () => {
  return (
    <ToolRedirect
      toolName="URL Shortener"
      description="Create short, shareable links from long URLs"
      alternativeUrl="https://tinyurl.com/"
      alternativeName="TinyURL"
      reason="Our URL shortening service is currently being upgraded for better reliability"
    />
  );
};