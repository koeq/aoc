interface obj<T> {
  name: string;
  version: number;
  id: string;
  data: T;
}

interface data {
  size: string;
  format: "ts" | "js-" | "rs";
}

const obj: obj<data> = {
  name: "tsfile",
  version: 0.5,
  id: "id",
  data: {
    size: "400kb",
    format: "ts",
  },
};
