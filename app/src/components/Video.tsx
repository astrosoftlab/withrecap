export default function Video(props: VideoProps) {
  return (
    <div
      className={`w-4 h-4 relative text-white text-center font-semibold overflow-clip font-['SF_Pro_Rounded']`}
    >
      <p className="h-4 w-4 left-0 top-0 absolute text-xs leading-5 m-0">
        􀍊
      </p>
    </div>
  );
}

Video.defaultProps = {
  className: "",
};

interface VideoProps {
  className: string;
}

/**
 * This component was generated from Figma with FireJet.
 * Learn more at https://www.firejet.io
 *
 * README:
 * The output code may look slightly different when copied to your codebase. To fix this:
 * 1. Include the necessary fonts. The required fonts are imported from public/index.html
 * 2. Include the global styles. They can be found in App.css
 *
 * Note: Step 2 is not required for tailwind.css output
 */
