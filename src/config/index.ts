import BullMQConfig from "./bullMq.config";
import RedisConfig from "./redis.config";


export const redisConfig = RedisConfig.getInstance();
export const bullMQConfig = BullMQConfig.getInstance();