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
          {type === "external" ? (
            <svg
              className="w-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                className={styles.iconPath()}
                d="M9,16c-.26,0-.51-.1-.71-.29-.39-.39-.39-1.02,0-1.41l6-6c.39-.39,1.02-.39,1.41,0s.39,1.02,0,1.41l-6,6c-.2.2-.45.29-.71.29ZM18.66,13.76l.59-.51c1.13-1.13,1.76-2.64,1.76-4.24s-.62-3.11-1.76-4.24c-2.34-2.34-6.15-2.34-8.54.05l-.46.54c-.36.42-.31,1.05.1,1.41.42.36,1.05.32,1.41-.1l.41-.48c1.56-1.56,4.1-1.56,5.66,0,1.56,1.56,1.56,4.1.05,5.61l-.53.46c-.42.36-.46.99-.1,1.41.2.23.48.34.75.34.23,0,.47-.08.66-.25ZM13.31,19.25s.07-.07.1-.12l.4-.53c.33-.44.24-1.07-.21-1.4-.44-.33-1.07-.24-1.4.21l-.35.47c-1.58,1.51-4.11,1.49-5.67-.05-.75-.75-1.17-1.74-1.18-2.8,0-1.06.4-2.06,1.14-2.81l.52-.46c.41-.37.45-1,.09-1.41-.37-.41-1-.45-1.41-.09l-.52.46s-.07.07-.09.09c-1.12,1.13-1.73,2.64-1.73,4.23,0,1.6.64,3.09,1.77,4.21,1.18,1.16,2.72,1.74,4.27,1.74s3.09-.58,4.27-1.74Z"
              />
            </svg>
          ) : (
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
          )}
        </span>
      </span>
    </a>
  );
};

export default Link;
