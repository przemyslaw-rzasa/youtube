import { defaultsDeep, pickBy } from "lodash";

export type FromData = (obj: Object) => void;

interface Config {
  insensitiveKeys: string[];
}

const DEFAULT_CONFIG = {
  insensitiveKeys: []
};

const fromData: FromData = function(data) {
  Object.entries(data).forEach(([key, value]) => (this[key] = value));
};

export const YoutubeEntity = (userConfig?: Config) => target => {
  const { insensitiveKeys } = defaultsDeep(userConfig, DEFAULT_CONFIG);

  target.prototype.fromData = fromData;

  target.prototype.getSafeData = function() {
    return this;
  };

  Object.defineProperty(target.prototype, "insensitiveData", {
    get: function(): Object {
      return pickBy(this, (value, key) => !insensitiveKeys.includes(key));
    }
  });

  return target;
};
