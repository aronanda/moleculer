const { MoleculerError } = require("../../../src/errors");
const Cachers = require("../../../src/cachers");

describe("Test Cacher resolver", () => {

	it("should resolve null from undefined", () => {
		let cacher = Cachers.resolve();
		expect(cacher).toBeNull();
	});

	it("should resolve MemoryCacher from true", () => {
		let cacher = Cachers.resolve(true);
		expect(cacher).toBeInstanceOf(Cachers.Memory);
	});

	it("should resolve MemoryCacher from string", () => {
		let cacher = Cachers.resolve("memory");
		expect(cacher).toBeInstanceOf(Cachers.Memory);
	});

	it("should resolve MemoryLRUCacher from string", () => {
		let cacher = Cachers.resolve("MemoryLRU");
		expect(cacher).toBeInstanceOf(Cachers.MemoryLRU);
	});

	it("should resolve RedisCacher from string", () => {
		let cacher = Cachers.resolve("Redis");
		expect(cacher).toBeInstanceOf(Cachers.Redis);
	});

	it("should resolve MemoryCacher from obj without type", () => {
		let options = { ttl: 100 };
		let cacher = Cachers.resolve({ options });
		expect(cacher).toBeInstanceOf(Cachers.Memory);
		expect(cacher.opts).toEqual({ keygen: null, maxParamsLength: null, ttl: 100 });
	});

	it("should resolve MemoryCacher from obj", () => {
		let options = { ttl: 100 };
		let cacher = Cachers.resolve({ type: "Memory", options });
		expect(cacher).toBeInstanceOf(Cachers.Memory);
		expect(cacher.opts).toEqual({ keygen: null, maxParamsLength: null, ttl: 100 });
	});

	it("should resolve MemoryLRUCacher from obj", () => {
		let options = { ttl: 100, max: 1000 };
		let cacher = Cachers.resolve({ type: "MemoryLRU", options });
		expect(cacher).toBeInstanceOf(Cachers.MemoryLRU);
		expect(cacher.opts).toEqual({ keygen: null, maxParamsLength: null, ttl: 100, max: 1000 });
	});

	it("should resolve RedisCacher from obj with Redis type", () => {
		let options = { ttl: 100 };
		let cacher = Cachers.resolve({ type: "Redis", options });
		expect(cacher).toBeInstanceOf(Cachers.Redis);
		expect(cacher.opts).toEqual({ prefix: null, keygen: null, maxParamsLength: null, ttl: 100 });
	});

	it("should resolve RedisCacher from obj with Redis type", () => {
		let options = { ttl: 80, redis: { db: 3 } };
		let cacher = Cachers.resolve({ type: "redis", options });
		expect(cacher).toBeInstanceOf(Cachers.Redis);
		expect(cacher.opts).toEqual({ prefix: null, keygen: null, maxParamsLength: null, ttl: 80, redis: { db: 3 } });
	});

	it("should resolve RedisCacher from connection string", () => {
		let cacher = Cachers.resolve("redis://localhost");
		expect(cacher).toBeInstanceOf(Cachers.Redis);
	});

	it("should throw error if type if not correct", () => {
		expect(() => {
			Cachers.resolve({ type: "xyz" });
		}).toThrowError(MoleculerError);

		expect(() => {
			Cachers.resolve("xyz");
		}).toThrowError(MoleculerError);
	});

});
