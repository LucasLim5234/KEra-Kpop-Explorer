import { format, formatDistanceToNow } from "date-fns";

export const formatDateWithDiff = (dateString) => {
    const date = new Date(dateString);

    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
        return formatDistanceToNow(date, { addSuffix: true });
    }

    return format(date, "dd MMM yyyy");
};
