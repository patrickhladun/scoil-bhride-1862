import { tv } from "tailwind-variants";
import mergeClasses from "../../../public/utils/mergeClasses";

type LinkType = "download" | "link" | "external";

type LinkProps = {
  href: string;
  label: string;
  type?: LinkType;
  className?: string;
};

const linkStyles = tv({
  slots: {
    base: "flex justify-between items-center rounded-sm px-5 py-3 text-sm font-semibold transition",
    iconWrap: "inline-block w-8 h-8 p-2 rounded-full",
    iconPath: "",
  },
  variants: {
    type: {
      link: {
        base: "bg-primary-100 text-primary-700 hover:bg-primary-200",
        iconWrap: "bg-primary-600 text-white",
        iconPath: "fill-primary-100",
      },
      download: {
        base: "bg-secondary-100 text-secondary-700 hover:bg-secondary-200",
        iconWrap: "bg-secondary-600 text-white",
        iconPath: "fill-secondary-100",
      },
      external: {
        base: "bg-primary-100 text-primary-700 hover:bg-primary-200",
        iconWrap: "bg-primary-600 text-white",
        iconPath: "fill-primary-100",
      },
    },
  },
  defaultVariants: {
    type: "link",
  },
});

const Link = ({ href, label, type = "link", className }: LinkProps) => {
  const isDownload = type === "download";
  const isExternal = type === "external";
  const styles = linkStyles({ type });

  return (
    <a
      href={href}
      download={isDownload || undefined}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={mergeClasses(styles.base(), className)}
    >
      <span>{label}</span>
      <span className="flex justify-between items-center">
        <span className={styles.iconWrap()}>
          <svg
            className="w-full"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              className={styles.iconPath()}
              d="M21,17v2c0,1.7-1.3,3-3,3H6c-1.7,0-3-1.3-3-3v-2c0-.6.4-1,1-1s1,.4,1,1v2c0,.6.4,1,1,1h12c.6,0,1-.4,1-1v-2c0-.6.4-1,1-1s1,.4,1,1ZM11.3,16.7c0,0,.2.2.3.2.1,0,.3,0,.4,0s.3,0,.4,0c.1,0,.2-.1.3-.2l5-5c.4-.4.4-1,0-1.4s-1-.4-1.4,0l-3.3,3.3V4c0-.6-.4-1-1-1s-1,.4-1,1v9.6l-3.3-3.3c-.4-.4-1-.4-1.4,0s-.4,1,0,1.4l5,5Z"
            />
          </svg>
        </span>
      </span>
    </a>
  );
};

export default Link;