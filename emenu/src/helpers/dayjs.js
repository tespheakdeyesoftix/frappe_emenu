import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/km";

dayjs.extend(relativeTime);
dayjs.locale("km");

const oldFormat = dayjs.prototype.format;

dayjs.prototype.format = function (formatStr) {
  return oldFormat.call(this, formatStr || "DD-MM-YYYY");
};

export default dayjs;
