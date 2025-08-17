import Typography, { TypographyProps } from "@mui/material/Typography";

export type HeadingProps = TypographyProps & {
    fontWeight?: number | string;
    fontSize?: number | string;
};

export const Heading = ({
    children,
    color = "inherit",
    variant = "h1",
    fontWeight = 600,
    fontSize = 20,
    fontFamily = "var(--font-euclid-circular-b), sans-serif",
    ...rest
}: HeadingProps) => (
    <Typography
        color={color}
        variant={variant}
        fontWeight={fontWeight}
        fontSize={fontSize}
        fontFamily={fontFamily}
        {...rest}
    >
        {children}
    </Typography>
);
