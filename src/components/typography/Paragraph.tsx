import Typography, { TypographyProps } from "@mui/material/Typography";

export type ParagraphProps = TypographyProps & {
    fontWeight?: number | string;
    fontSize?: number | string;
};

export const Paragraph = ({
    children,
    color = "inherit",
    fontWeight = 400,
    fontSize = 14,
    fontFamily = "var(--font-euclid-circular-b), sans-serif",
    ...rest
}: ParagraphProps) => {
    return (
        <Typography
            color={color}
            fontWeight={fontWeight}
            fontSize={fontSize}
            fontFamily={fontFamily}
            {...rest}
        >
            {children}
        </Typography>
    );
};
