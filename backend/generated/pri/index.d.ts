
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Movie
 * 
 */
export type Movie = $Result.DefaultSelection<Prisma.$MoviePayload>
/**
 * Model Genre
 * 
 */
export type Genre = $Result.DefaultSelection<Prisma.$GenrePayload>
/**
 * Model Director
 * 
 */
export type Director = $Result.DefaultSelection<Prisma.$DirectorPayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model DiaryEntry
 * 
 */
export type DiaryEntry = $Result.DefaultSelection<Prisma.$DiaryEntryPayload>
/**
 * Model EntryTag
 * 
 */
export type EntryTag = $Result.DefaultSelection<Prisma.$EntryTagPayload>
/**
 * Model MovieGenre
 * 
 */
export type MovieGenre = $Result.DefaultSelection<Prisma.$MovieGenrePayload>
/**
 * Model MovieDirector
 * 
 */
export type MovieDirector = $Result.DefaultSelection<Prisma.$MovieDirectorPayload>
/**
 * Model UserFollow
 * 
 */
export type UserFollow = $Result.DefaultSelection<Prisma.$UserFollowPayload>
/**
 * Model EntryLike
 * 
 */
export type EntryLike = $Result.DefaultSelection<Prisma.$EntryLikePayload>
/**
 * Model ActivityLog
 * 
 */
export type ActivityLog = $Result.DefaultSelection<Prisma.$ActivityLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  USER: 'USER'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.movie`: Exposes CRUD operations for the **Movie** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Movies
    * const movies = await prisma.movie.findMany()
    * ```
    */
  get movie(): Prisma.MovieDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.genre`: Exposes CRUD operations for the **Genre** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Genres
    * const genres = await prisma.genre.findMany()
    * ```
    */
  get genre(): Prisma.GenreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.director`: Exposes CRUD operations for the **Director** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Directors
    * const directors = await prisma.director.findMany()
    * ```
    */
  get director(): Prisma.DirectorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.diaryEntry`: Exposes CRUD operations for the **DiaryEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DiaryEntries
    * const diaryEntries = await prisma.diaryEntry.findMany()
    * ```
    */
  get diaryEntry(): Prisma.DiaryEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.entryTag`: Exposes CRUD operations for the **EntryTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EntryTags
    * const entryTags = await prisma.entryTag.findMany()
    * ```
    */
  get entryTag(): Prisma.EntryTagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.movieGenre`: Exposes CRUD operations for the **MovieGenre** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MovieGenres
    * const movieGenres = await prisma.movieGenre.findMany()
    * ```
    */
  get movieGenre(): Prisma.MovieGenreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.movieDirector`: Exposes CRUD operations for the **MovieDirector** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MovieDirectors
    * const movieDirectors = await prisma.movieDirector.findMany()
    * ```
    */
  get movieDirector(): Prisma.MovieDirectorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userFollow`: Exposes CRUD operations for the **UserFollow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserFollows
    * const userFollows = await prisma.userFollow.findMany()
    * ```
    */
  get userFollow(): Prisma.UserFollowDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.entryLike`: Exposes CRUD operations for the **EntryLike** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EntryLikes
    * const entryLikes = await prisma.entryLike.findMany()
    * ```
    */
  get entryLike(): Prisma.EntryLikeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activityLog`: Exposes CRUD operations for the **ActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityLogs
    * const activityLogs = await prisma.activityLog.findMany()
    * ```
    */
  get activityLog(): Prisma.ActivityLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Movie: 'Movie',
    Genre: 'Genre',
    Director: 'Director',
    Tag: 'Tag',
    DiaryEntry: 'DiaryEntry',
    EntryTag: 'EntryTag',
    MovieGenre: 'MovieGenre',
    MovieDirector: 'MovieDirector',
    UserFollow: 'UserFollow',
    EntryLike: 'EntryLike',
    ActivityLog: 'ActivityLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "movie" | "genre" | "director" | "tag" | "diaryEntry" | "entryTag" | "movieGenre" | "movieDirector" | "userFollow" | "entryLike" | "activityLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Movie: {
        payload: Prisma.$MoviePayload<ExtArgs>
        fields: Prisma.MovieFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MovieFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MovieFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          findFirst: {
            args: Prisma.MovieFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MovieFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          findMany: {
            args: Prisma.MovieFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>[]
          }
          create: {
            args: Prisma.MovieCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          createMany: {
            args: Prisma.MovieCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MovieCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>[]
          }
          delete: {
            args: Prisma.MovieDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          update: {
            args: Prisma.MovieUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          deleteMany: {
            args: Prisma.MovieDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MovieUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MovieUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>[]
          }
          upsert: {
            args: Prisma.MovieUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoviePayload>
          }
          aggregate: {
            args: Prisma.MovieAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMovie>
          }
          groupBy: {
            args: Prisma.MovieGroupByArgs<ExtArgs>
            result: $Utils.Optional<MovieGroupByOutputType>[]
          }
          count: {
            args: Prisma.MovieCountArgs<ExtArgs>
            result: $Utils.Optional<MovieCountAggregateOutputType> | number
          }
        }
      }
      Genre: {
        payload: Prisma.$GenrePayload<ExtArgs>
        fields: Prisma.GenreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GenreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GenreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          findFirst: {
            args: Prisma.GenreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GenreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          findMany: {
            args: Prisma.GenreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>[]
          }
          create: {
            args: Prisma.GenreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          createMany: {
            args: Prisma.GenreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GenreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>[]
          }
          delete: {
            args: Prisma.GenreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          update: {
            args: Prisma.GenreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          deleteMany: {
            args: Prisma.GenreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GenreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GenreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>[]
          }
          upsert: {
            args: Prisma.GenreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenrePayload>
          }
          aggregate: {
            args: Prisma.GenreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGenre>
          }
          groupBy: {
            args: Prisma.GenreGroupByArgs<ExtArgs>
            result: $Utils.Optional<GenreGroupByOutputType>[]
          }
          count: {
            args: Prisma.GenreCountArgs<ExtArgs>
            result: $Utils.Optional<GenreCountAggregateOutputType> | number
          }
        }
      }
      Director: {
        payload: Prisma.$DirectorPayload<ExtArgs>
        fields: Prisma.DirectorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DirectorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DirectorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectorPayload>
          }
          findFirst: {
            args: Prisma.DirectorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DirectorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectorPayload>
          }
          findMany: {
            args: Prisma.DirectorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectorPayload>[]
          }
          create: {
            args: Prisma.DirectorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectorPayload>
          }
          createMany: {
            args: Prisma.DirectorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DirectorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectorPayload>[]
          }
          delete: {
            args: Prisma.DirectorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectorPayload>
          }
          update: {
            args: Prisma.DirectorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectorPayload>
          }
          deleteMany: {
            args: Prisma.DirectorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DirectorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DirectorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectorPayload>[]
          }
          upsert: {
            args: Prisma.DirectorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DirectorPayload>
          }
          aggregate: {
            args: Prisma.DirectorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDirector>
          }
          groupBy: {
            args: Prisma.DirectorGroupByArgs<ExtArgs>
            result: $Utils.Optional<DirectorGroupByOutputType>[]
          }
          count: {
            args: Prisma.DirectorCountArgs<ExtArgs>
            result: $Utils.Optional<DirectorCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      DiaryEntry: {
        payload: Prisma.$DiaryEntryPayload<ExtArgs>
        fields: Prisma.DiaryEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DiaryEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiaryEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DiaryEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiaryEntryPayload>
          }
          findFirst: {
            args: Prisma.DiaryEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiaryEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DiaryEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiaryEntryPayload>
          }
          findMany: {
            args: Prisma.DiaryEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiaryEntryPayload>[]
          }
          create: {
            args: Prisma.DiaryEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiaryEntryPayload>
          }
          createMany: {
            args: Prisma.DiaryEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DiaryEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiaryEntryPayload>[]
          }
          delete: {
            args: Prisma.DiaryEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiaryEntryPayload>
          }
          update: {
            args: Prisma.DiaryEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiaryEntryPayload>
          }
          deleteMany: {
            args: Prisma.DiaryEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DiaryEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DiaryEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiaryEntryPayload>[]
          }
          upsert: {
            args: Prisma.DiaryEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DiaryEntryPayload>
          }
          aggregate: {
            args: Prisma.DiaryEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDiaryEntry>
          }
          groupBy: {
            args: Prisma.DiaryEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<DiaryEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.DiaryEntryCountArgs<ExtArgs>
            result: $Utils.Optional<DiaryEntryCountAggregateOutputType> | number
          }
        }
      }
      EntryTag: {
        payload: Prisma.$EntryTagPayload<ExtArgs>
        fields: Prisma.EntryTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EntryTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EntryTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryTagPayload>
          }
          findFirst: {
            args: Prisma.EntryTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EntryTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryTagPayload>
          }
          findMany: {
            args: Prisma.EntryTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryTagPayload>[]
          }
          create: {
            args: Prisma.EntryTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryTagPayload>
          }
          createMany: {
            args: Prisma.EntryTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EntryTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryTagPayload>[]
          }
          delete: {
            args: Prisma.EntryTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryTagPayload>
          }
          update: {
            args: Prisma.EntryTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryTagPayload>
          }
          deleteMany: {
            args: Prisma.EntryTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EntryTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EntryTagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryTagPayload>[]
          }
          upsert: {
            args: Prisma.EntryTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryTagPayload>
          }
          aggregate: {
            args: Prisma.EntryTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEntryTag>
          }
          groupBy: {
            args: Prisma.EntryTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<EntryTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.EntryTagCountArgs<ExtArgs>
            result: $Utils.Optional<EntryTagCountAggregateOutputType> | number
          }
        }
      }
      MovieGenre: {
        payload: Prisma.$MovieGenrePayload<ExtArgs>
        fields: Prisma.MovieGenreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MovieGenreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MovieGenreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload>
          }
          findFirst: {
            args: Prisma.MovieGenreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MovieGenreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload>
          }
          findMany: {
            args: Prisma.MovieGenreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload>[]
          }
          create: {
            args: Prisma.MovieGenreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload>
          }
          createMany: {
            args: Prisma.MovieGenreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MovieGenreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload>[]
          }
          delete: {
            args: Prisma.MovieGenreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload>
          }
          update: {
            args: Prisma.MovieGenreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload>
          }
          deleteMany: {
            args: Prisma.MovieGenreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MovieGenreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MovieGenreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload>[]
          }
          upsert: {
            args: Prisma.MovieGenreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieGenrePayload>
          }
          aggregate: {
            args: Prisma.MovieGenreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMovieGenre>
          }
          groupBy: {
            args: Prisma.MovieGenreGroupByArgs<ExtArgs>
            result: $Utils.Optional<MovieGenreGroupByOutputType>[]
          }
          count: {
            args: Prisma.MovieGenreCountArgs<ExtArgs>
            result: $Utils.Optional<MovieGenreCountAggregateOutputType> | number
          }
        }
      }
      MovieDirector: {
        payload: Prisma.$MovieDirectorPayload<ExtArgs>
        fields: Prisma.MovieDirectorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MovieDirectorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieDirectorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MovieDirectorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieDirectorPayload>
          }
          findFirst: {
            args: Prisma.MovieDirectorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieDirectorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MovieDirectorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieDirectorPayload>
          }
          findMany: {
            args: Prisma.MovieDirectorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieDirectorPayload>[]
          }
          create: {
            args: Prisma.MovieDirectorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieDirectorPayload>
          }
          createMany: {
            args: Prisma.MovieDirectorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MovieDirectorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieDirectorPayload>[]
          }
          delete: {
            args: Prisma.MovieDirectorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieDirectorPayload>
          }
          update: {
            args: Prisma.MovieDirectorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieDirectorPayload>
          }
          deleteMany: {
            args: Prisma.MovieDirectorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MovieDirectorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MovieDirectorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieDirectorPayload>[]
          }
          upsert: {
            args: Prisma.MovieDirectorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovieDirectorPayload>
          }
          aggregate: {
            args: Prisma.MovieDirectorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMovieDirector>
          }
          groupBy: {
            args: Prisma.MovieDirectorGroupByArgs<ExtArgs>
            result: $Utils.Optional<MovieDirectorGroupByOutputType>[]
          }
          count: {
            args: Prisma.MovieDirectorCountArgs<ExtArgs>
            result: $Utils.Optional<MovieDirectorCountAggregateOutputType> | number
          }
        }
      }
      UserFollow: {
        payload: Prisma.$UserFollowPayload<ExtArgs>
        fields: Prisma.UserFollowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFollowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFollowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFollowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFollowPayload>
          }
          findFirst: {
            args: Prisma.UserFollowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFollowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFollowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFollowPayload>
          }
          findMany: {
            args: Prisma.UserFollowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFollowPayload>[]
          }
          create: {
            args: Prisma.UserFollowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFollowPayload>
          }
          createMany: {
            args: Prisma.UserFollowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserFollowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFollowPayload>[]
          }
          delete: {
            args: Prisma.UserFollowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFollowPayload>
          }
          update: {
            args: Prisma.UserFollowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFollowPayload>
          }
          deleteMany: {
            args: Prisma.UserFollowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserFollowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserFollowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFollowPayload>[]
          }
          upsert: {
            args: Prisma.UserFollowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserFollowPayload>
          }
          aggregate: {
            args: Prisma.UserFollowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserFollow>
          }
          groupBy: {
            args: Prisma.UserFollowGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserFollowGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserFollowCountArgs<ExtArgs>
            result: $Utils.Optional<UserFollowCountAggregateOutputType> | number
          }
        }
      }
      EntryLike: {
        payload: Prisma.$EntryLikePayload<ExtArgs>
        fields: Prisma.EntryLikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EntryLikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EntryLikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLikePayload>
          }
          findFirst: {
            args: Prisma.EntryLikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EntryLikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLikePayload>
          }
          findMany: {
            args: Prisma.EntryLikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLikePayload>[]
          }
          create: {
            args: Prisma.EntryLikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLikePayload>
          }
          createMany: {
            args: Prisma.EntryLikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EntryLikeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLikePayload>[]
          }
          delete: {
            args: Prisma.EntryLikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLikePayload>
          }
          update: {
            args: Prisma.EntryLikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLikePayload>
          }
          deleteMany: {
            args: Prisma.EntryLikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EntryLikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EntryLikeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLikePayload>[]
          }
          upsert: {
            args: Prisma.EntryLikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EntryLikePayload>
          }
          aggregate: {
            args: Prisma.EntryLikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEntryLike>
          }
          groupBy: {
            args: Prisma.EntryLikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EntryLikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.EntryLikeCountArgs<ExtArgs>
            result: $Utils.Optional<EntryLikeCountAggregateOutputType> | number
          }
        }
      }
      ActivityLog: {
        payload: Prisma.$ActivityLogPayload<ExtArgs>
        fields: Prisma.ActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findFirst: {
            args: Prisma.ActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findMany: {
            args: Prisma.ActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          create: {
            args: Prisma.ActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          createMany: {
            args: Prisma.ActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          delete: {
            args: Prisma.ActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          update: {
            args: Prisma.ActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.ActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          upsert: {
            args: Prisma.ActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          aggregate: {
            args: Prisma.ActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityLog>
          }
          groupBy: {
            args: Prisma.ActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    movie?: MovieOmit
    genre?: GenreOmit
    director?: DirectorOmit
    tag?: TagOmit
    diaryEntry?: DiaryEntryOmit
    entryTag?: EntryTagOmit
    movieGenre?: MovieGenreOmit
    movieDirector?: MovieDirectorOmit
    userFollow?: UserFollowOmit
    entryLike?: EntryLikeOmit
    activityLog?: ActivityLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    DiaryEntry: number
    followers: number
    following: number
    EntryLike: number
    ActivityLog: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    DiaryEntry?: boolean | UserCountOutputTypeCountDiaryEntryArgs
    followers?: boolean | UserCountOutputTypeCountFollowersArgs
    following?: boolean | UserCountOutputTypeCountFollowingArgs
    EntryLike?: boolean | UserCountOutputTypeCountEntryLikeArgs
    ActivityLog?: boolean | UserCountOutputTypeCountActivityLogArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDiaryEntryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiaryEntryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserFollowWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserFollowWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEntryLikeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntryLikeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivityLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
  }


  /**
   * Count Type MovieCountOutputType
   */

  export type MovieCountOutputType = {
    DiaryEntry: number
    genres: number
    directors: number
  }

  export type MovieCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    DiaryEntry?: boolean | MovieCountOutputTypeCountDiaryEntryArgs
    genres?: boolean | MovieCountOutputTypeCountGenresArgs
    directors?: boolean | MovieCountOutputTypeCountDirectorsArgs
  }

  // Custom InputTypes
  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieCountOutputType
     */
    select?: MovieCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeCountDiaryEntryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiaryEntryWhereInput
  }

  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeCountGenresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieGenreWhereInput
  }

  /**
   * MovieCountOutputType without action
   */
  export type MovieCountOutputTypeCountDirectorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieDirectorWhereInput
  }


  /**
   * Count Type GenreCountOutputType
   */

  export type GenreCountOutputType = {
    movies: number
  }

  export type GenreCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movies?: boolean | GenreCountOutputTypeCountMoviesArgs
  }

  // Custom InputTypes
  /**
   * GenreCountOutputType without action
   */
  export type GenreCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GenreCountOutputType
     */
    select?: GenreCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GenreCountOutputType without action
   */
  export type GenreCountOutputTypeCountMoviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieGenreWhereInput
  }


  /**
   * Count Type DirectorCountOutputType
   */

  export type DirectorCountOutputType = {
    movies: number
  }

  export type DirectorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movies?: boolean | DirectorCountOutputTypeCountMoviesArgs
  }

  // Custom InputTypes
  /**
   * DirectorCountOutputType without action
   */
  export type DirectorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DirectorCountOutputType
     */
    select?: DirectorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DirectorCountOutputType without action
   */
  export type DirectorCountOutputTypeCountMoviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieDirectorWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    entries: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entries?: boolean | TagCountOutputTypeCountEntriesArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntryTagWhereInput
  }


  /**
   * Count Type DiaryEntryCountOutputType
   */

  export type DiaryEntryCountOutputType = {
    tags: number
    likes: number
  }

  export type DiaryEntryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | DiaryEntryCountOutputTypeCountTagsArgs
    likes?: boolean | DiaryEntryCountOutputTypeCountLikesArgs
  }

  // Custom InputTypes
  /**
   * DiaryEntryCountOutputType without action
   */
  export type DiaryEntryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiaryEntryCountOutputType
     */
    select?: DiaryEntryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DiaryEntryCountOutputType without action
   */
  export type DiaryEntryCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntryTagWhereInput
  }

  /**
   * DiaryEntryCountOutputType without action
   */
  export type DiaryEntryCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntryLikeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    photoUrl: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    photoUrl: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password: number
    photoUrl: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    photoUrl?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    photoUrl?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password?: true
    photoUrl?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    email: string
    password: string
    photoUrl: string | null
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    photoUrl?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    DiaryEntry?: boolean | User$DiaryEntryArgs<ExtArgs>
    followers?: boolean | User$followersArgs<ExtArgs>
    following?: boolean | User$followingArgs<ExtArgs>
    EntryLike?: boolean | User$EntryLikeArgs<ExtArgs>
    ActivityLog?: boolean | User$ActivityLogArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    photoUrl?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    photoUrl?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password?: boolean
    photoUrl?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password" | "photoUrl" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    DiaryEntry?: boolean | User$DiaryEntryArgs<ExtArgs>
    followers?: boolean | User$followersArgs<ExtArgs>
    following?: boolean | User$followingArgs<ExtArgs>
    EntryLike?: boolean | User$EntryLikeArgs<ExtArgs>
    ActivityLog?: boolean | User$ActivityLogArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      DiaryEntry: Prisma.$DiaryEntryPayload<ExtArgs>[]
      followers: Prisma.$UserFollowPayload<ExtArgs>[]
      following: Prisma.$UserFollowPayload<ExtArgs>[]
      EntryLike: Prisma.$EntryLikePayload<ExtArgs>[]
      ActivityLog: Prisma.$ActivityLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string
      password: string
      photoUrl: string | null
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    DiaryEntry<T extends User$DiaryEntryArgs<ExtArgs> = {}>(args?: Subset<T, User$DiaryEntryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiaryEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    followers<T extends User$followersArgs<ExtArgs> = {}>(args?: Subset<T, User$followersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    following<T extends User$followingArgs<ExtArgs> = {}>(args?: Subset<T, User$followingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    EntryLike<T extends User$EntryLikeArgs<ExtArgs> = {}>(args?: Subset<T, User$EntryLikeArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ActivityLog<T extends User$ActivityLogArgs<ExtArgs> = {}>(args?: Subset<T, User$ActivityLogArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly photoUrl: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.DiaryEntry
   */
  export type User$DiaryEntryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiaryEntry
     */
    select?: DiaryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiaryEntry
     */
    omit?: DiaryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiaryEntryInclude<ExtArgs> | null
    where?: DiaryEntryWhereInput
    orderBy?: DiaryEntryOrderByWithRelationInput | DiaryEntryOrderByWithRelationInput[]
    cursor?: DiaryEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DiaryEntryScalarFieldEnum | DiaryEntryScalarFieldEnum[]
  }

  /**
   * User.followers
   */
  export type User$followersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFollow
     */
    select?: UserFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFollow
     */
    omit?: UserFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFollowInclude<ExtArgs> | null
    where?: UserFollowWhereInput
    orderBy?: UserFollowOrderByWithRelationInput | UserFollowOrderByWithRelationInput[]
    cursor?: UserFollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserFollowScalarFieldEnum | UserFollowScalarFieldEnum[]
  }

  /**
   * User.following
   */
  export type User$followingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFollow
     */
    select?: UserFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFollow
     */
    omit?: UserFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFollowInclude<ExtArgs> | null
    where?: UserFollowWhereInput
    orderBy?: UserFollowOrderByWithRelationInput | UserFollowOrderByWithRelationInput[]
    cursor?: UserFollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserFollowScalarFieldEnum | UserFollowScalarFieldEnum[]
  }

  /**
   * User.EntryLike
   */
  export type User$EntryLikeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLike
     */
    select?: EntryLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLike
     */
    omit?: EntryLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLikeInclude<ExtArgs> | null
    where?: EntryLikeWhereInput
    orderBy?: EntryLikeOrderByWithRelationInput | EntryLikeOrderByWithRelationInput[]
    cursor?: EntryLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EntryLikeScalarFieldEnum | EntryLikeScalarFieldEnum[]
  }

  /**
   * User.ActivityLog
   */
  export type User$ActivityLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    cursor?: ActivityLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Movie
   */

  export type AggregateMovie = {
    _count: MovieCountAggregateOutputType | null
    _avg: MovieAvgAggregateOutputType | null
    _sum: MovieSumAggregateOutputType | null
    _min: MovieMinAggregateOutputType | null
    _max: MovieMaxAggregateOutputType | null
  }

  export type MovieAvgAggregateOutputType = {
    year: number | null
    duration: number | null
  }

  export type MovieSumAggregateOutputType = {
    year: number | null
    duration: number | null
  }

  export type MovieMinAggregateOutputType = {
    id: string | null
    title: string | null
    year: number | null
    duration: number | null
    description: string | null
    posterUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MovieMaxAggregateOutputType = {
    id: string | null
    title: string | null
    year: number | null
    duration: number | null
    description: string | null
    posterUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MovieCountAggregateOutputType = {
    id: number
    title: number
    year: number
    duration: number
    description: number
    posterUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MovieAvgAggregateInputType = {
    year?: true
    duration?: true
  }

  export type MovieSumAggregateInputType = {
    year?: true
    duration?: true
  }

  export type MovieMinAggregateInputType = {
    id?: true
    title?: true
    year?: true
    duration?: true
    description?: true
    posterUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MovieMaxAggregateInputType = {
    id?: true
    title?: true
    year?: true
    duration?: true
    description?: true
    posterUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MovieCountAggregateInputType = {
    id?: true
    title?: true
    year?: true
    duration?: true
    description?: true
    posterUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MovieAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Movie to aggregate.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Movies
    **/
    _count?: true | MovieCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MovieAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MovieSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MovieMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MovieMaxAggregateInputType
  }

  export type GetMovieAggregateType<T extends MovieAggregateArgs> = {
        [P in keyof T & keyof AggregateMovie]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMovie[P]>
      : GetScalarType<T[P], AggregateMovie[P]>
  }




  export type MovieGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieWhereInput
    orderBy?: MovieOrderByWithAggregationInput | MovieOrderByWithAggregationInput[]
    by: MovieScalarFieldEnum[] | MovieScalarFieldEnum
    having?: MovieScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MovieCountAggregateInputType | true
    _avg?: MovieAvgAggregateInputType
    _sum?: MovieSumAggregateInputType
    _min?: MovieMinAggregateInputType
    _max?: MovieMaxAggregateInputType
  }

  export type MovieGroupByOutputType = {
    id: string
    title: string
    year: number
    duration: number
    description: string
    posterUrl: string
    createdAt: Date
    updatedAt: Date
    _count: MovieCountAggregateOutputType | null
    _avg: MovieAvgAggregateOutputType | null
    _sum: MovieSumAggregateOutputType | null
    _min: MovieMinAggregateOutputType | null
    _max: MovieMaxAggregateOutputType | null
  }

  type GetMovieGroupByPayload<T extends MovieGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MovieGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MovieGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MovieGroupByOutputType[P]>
            : GetScalarType<T[P], MovieGroupByOutputType[P]>
        }
      >
    >


  export type MovieSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    year?: boolean
    duration?: boolean
    description?: boolean
    posterUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    DiaryEntry?: boolean | Movie$DiaryEntryArgs<ExtArgs>
    genres?: boolean | Movie$genresArgs<ExtArgs>
    directors?: boolean | Movie$directorsArgs<ExtArgs>
    _count?: boolean | MovieCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movie"]>

  export type MovieSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    year?: boolean
    duration?: boolean
    description?: boolean
    posterUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["movie"]>

  export type MovieSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    year?: boolean
    duration?: boolean
    description?: boolean
    posterUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["movie"]>

  export type MovieSelectScalar = {
    id?: boolean
    title?: boolean
    year?: boolean
    duration?: boolean
    description?: boolean
    posterUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MovieOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "year" | "duration" | "description" | "posterUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["movie"]>
  export type MovieInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    DiaryEntry?: boolean | Movie$DiaryEntryArgs<ExtArgs>
    genres?: boolean | Movie$genresArgs<ExtArgs>
    directors?: boolean | Movie$directorsArgs<ExtArgs>
    _count?: boolean | MovieCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MovieIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MovieIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MoviePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Movie"
    objects: {
      DiaryEntry: Prisma.$DiaryEntryPayload<ExtArgs>[]
      genres: Prisma.$MovieGenrePayload<ExtArgs>[]
      directors: Prisma.$MovieDirectorPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      year: number
      duration: number
      description: string
      posterUrl: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["movie"]>
    composites: {}
  }

  type MovieGetPayload<S extends boolean | null | undefined | MovieDefaultArgs> = $Result.GetResult<Prisma.$MoviePayload, S>

  type MovieCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MovieFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MovieCountAggregateInputType | true
    }

  export interface MovieDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Movie'], meta: { name: 'Movie' } }
    /**
     * Find zero or one Movie that matches the filter.
     * @param {MovieFindUniqueArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MovieFindUniqueArgs>(args: SelectSubset<T, MovieFindUniqueArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Movie that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MovieFindUniqueOrThrowArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MovieFindUniqueOrThrowArgs>(args: SelectSubset<T, MovieFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Movie that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieFindFirstArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MovieFindFirstArgs>(args?: SelectSubset<T, MovieFindFirstArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Movie that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieFindFirstOrThrowArgs} args - Arguments to find a Movie
     * @example
     * // Get one Movie
     * const movie = await prisma.movie.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MovieFindFirstOrThrowArgs>(args?: SelectSubset<T, MovieFindFirstOrThrowArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Movies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Movies
     * const movies = await prisma.movie.findMany()
     * 
     * // Get first 10 Movies
     * const movies = await prisma.movie.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const movieWithIdOnly = await prisma.movie.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MovieFindManyArgs>(args?: SelectSubset<T, MovieFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Movie.
     * @param {MovieCreateArgs} args - Arguments to create a Movie.
     * @example
     * // Create one Movie
     * const Movie = await prisma.movie.create({
     *   data: {
     *     // ... data to create a Movie
     *   }
     * })
     * 
     */
    create<T extends MovieCreateArgs>(args: SelectSubset<T, MovieCreateArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Movies.
     * @param {MovieCreateManyArgs} args - Arguments to create many Movies.
     * @example
     * // Create many Movies
     * const movie = await prisma.movie.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MovieCreateManyArgs>(args?: SelectSubset<T, MovieCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Movies and returns the data saved in the database.
     * @param {MovieCreateManyAndReturnArgs} args - Arguments to create many Movies.
     * @example
     * // Create many Movies
     * const movie = await prisma.movie.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Movies and only return the `id`
     * const movieWithIdOnly = await prisma.movie.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MovieCreateManyAndReturnArgs>(args?: SelectSubset<T, MovieCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Movie.
     * @param {MovieDeleteArgs} args - Arguments to delete one Movie.
     * @example
     * // Delete one Movie
     * const Movie = await prisma.movie.delete({
     *   where: {
     *     // ... filter to delete one Movie
     *   }
     * })
     * 
     */
    delete<T extends MovieDeleteArgs>(args: SelectSubset<T, MovieDeleteArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Movie.
     * @param {MovieUpdateArgs} args - Arguments to update one Movie.
     * @example
     * // Update one Movie
     * const movie = await prisma.movie.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MovieUpdateArgs>(args: SelectSubset<T, MovieUpdateArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Movies.
     * @param {MovieDeleteManyArgs} args - Arguments to filter Movies to delete.
     * @example
     * // Delete a few Movies
     * const { count } = await prisma.movie.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MovieDeleteManyArgs>(args?: SelectSubset<T, MovieDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Movies
     * const movie = await prisma.movie.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MovieUpdateManyArgs>(args: SelectSubset<T, MovieUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movies and returns the data updated in the database.
     * @param {MovieUpdateManyAndReturnArgs} args - Arguments to update many Movies.
     * @example
     * // Update many Movies
     * const movie = await prisma.movie.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Movies and only return the `id`
     * const movieWithIdOnly = await prisma.movie.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MovieUpdateManyAndReturnArgs>(args: SelectSubset<T, MovieUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Movie.
     * @param {MovieUpsertArgs} args - Arguments to update or create a Movie.
     * @example
     * // Update or create a Movie
     * const movie = await prisma.movie.upsert({
     *   create: {
     *     // ... data to create a Movie
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Movie we want to update
     *   }
     * })
     */
    upsert<T extends MovieUpsertArgs>(args: SelectSubset<T, MovieUpsertArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Movies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieCountArgs} args - Arguments to filter Movies to count.
     * @example
     * // Count the number of Movies
     * const count = await prisma.movie.count({
     *   where: {
     *     // ... the filter for the Movies we want to count
     *   }
     * })
    **/
    count<T extends MovieCountArgs>(
      args?: Subset<T, MovieCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MovieCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Movie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MovieAggregateArgs>(args: Subset<T, MovieAggregateArgs>): Prisma.PrismaPromise<GetMovieAggregateType<T>>

    /**
     * Group by Movie.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MovieGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MovieGroupByArgs['orderBy'] }
        : { orderBy?: MovieGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MovieGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMovieGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Movie model
   */
  readonly fields: MovieFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Movie.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MovieClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    DiaryEntry<T extends Movie$DiaryEntryArgs<ExtArgs> = {}>(args?: Subset<T, Movie$DiaryEntryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiaryEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    genres<T extends Movie$genresArgs<ExtArgs> = {}>(args?: Subset<T, Movie$genresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    directors<T extends Movie$directorsArgs<ExtArgs> = {}>(args?: Subset<T, Movie$directorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovieDirectorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Movie model
   */
  interface MovieFieldRefs {
    readonly id: FieldRef<"Movie", 'String'>
    readonly title: FieldRef<"Movie", 'String'>
    readonly year: FieldRef<"Movie", 'Int'>
    readonly duration: FieldRef<"Movie", 'Int'>
    readonly description: FieldRef<"Movie", 'String'>
    readonly posterUrl: FieldRef<"Movie", 'String'>
    readonly createdAt: FieldRef<"Movie", 'DateTime'>
    readonly updatedAt: FieldRef<"Movie", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Movie findUnique
   */
  export type MovieFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie findUniqueOrThrow
   */
  export type MovieFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie findFirst
   */
  export type MovieFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Movies.
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movies.
     */
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Movie findFirstOrThrow
   */
  export type MovieFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movie to fetch.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Movies.
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movies.
     */
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Movie findMany
   */
  export type MovieFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter, which Movies to fetch.
     */
    where?: MovieWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movies to fetch.
     */
    orderBy?: MovieOrderByWithRelationInput | MovieOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Movies.
     */
    cursor?: MovieWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movies.
     */
    skip?: number
    distinct?: MovieScalarFieldEnum | MovieScalarFieldEnum[]
  }

  /**
   * Movie create
   */
  export type MovieCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * The data needed to create a Movie.
     */
    data: XOR<MovieCreateInput, MovieUncheckedCreateInput>
  }

  /**
   * Movie createMany
   */
  export type MovieCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Movies.
     */
    data: MovieCreateManyInput | MovieCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Movie createManyAndReturn
   */
  export type MovieCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * The data used to create many Movies.
     */
    data: MovieCreateManyInput | MovieCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Movie update
   */
  export type MovieUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * The data needed to update a Movie.
     */
    data: XOR<MovieUpdateInput, MovieUncheckedUpdateInput>
    /**
     * Choose, which Movie to update.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie updateMany
   */
  export type MovieUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Movies.
     */
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyInput>
    /**
     * Filter which Movies to update
     */
    where?: MovieWhereInput
    /**
     * Limit how many Movies to update.
     */
    limit?: number
  }

  /**
   * Movie updateManyAndReturn
   */
  export type MovieUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * The data used to update Movies.
     */
    data: XOR<MovieUpdateManyMutationInput, MovieUncheckedUpdateManyInput>
    /**
     * Filter which Movies to update
     */
    where?: MovieWhereInput
    /**
     * Limit how many Movies to update.
     */
    limit?: number
  }

  /**
   * Movie upsert
   */
  export type MovieUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * The filter to search for the Movie to update in case it exists.
     */
    where: MovieWhereUniqueInput
    /**
     * In case the Movie found by the `where` argument doesn't exist, create a new Movie with this data.
     */
    create: XOR<MovieCreateInput, MovieUncheckedCreateInput>
    /**
     * In case the Movie was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MovieUpdateInput, MovieUncheckedUpdateInput>
  }

  /**
   * Movie delete
   */
  export type MovieDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
    /**
     * Filter which Movie to delete.
     */
    where: MovieWhereUniqueInput
  }

  /**
   * Movie deleteMany
   */
  export type MovieDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Movies to delete
     */
    where?: MovieWhereInput
    /**
     * Limit how many Movies to delete.
     */
    limit?: number
  }

  /**
   * Movie.DiaryEntry
   */
  export type Movie$DiaryEntryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiaryEntry
     */
    select?: DiaryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiaryEntry
     */
    omit?: DiaryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiaryEntryInclude<ExtArgs> | null
    where?: DiaryEntryWhereInput
    orderBy?: DiaryEntryOrderByWithRelationInput | DiaryEntryOrderByWithRelationInput[]
    cursor?: DiaryEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DiaryEntryScalarFieldEnum | DiaryEntryScalarFieldEnum[]
  }

  /**
   * Movie.genres
   */
  export type Movie$genresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    where?: MovieGenreWhereInput
    orderBy?: MovieGenreOrderByWithRelationInput | MovieGenreOrderByWithRelationInput[]
    cursor?: MovieGenreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovieGenreScalarFieldEnum | MovieGenreScalarFieldEnum[]
  }

  /**
   * Movie.directors
   */
  export type Movie$directorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieDirector
     */
    select?: MovieDirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieDirector
     */
    omit?: MovieDirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieDirectorInclude<ExtArgs> | null
    where?: MovieDirectorWhereInput
    orderBy?: MovieDirectorOrderByWithRelationInput | MovieDirectorOrderByWithRelationInput[]
    cursor?: MovieDirectorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovieDirectorScalarFieldEnum | MovieDirectorScalarFieldEnum[]
  }

  /**
   * Movie without action
   */
  export type MovieDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movie
     */
    select?: MovieSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movie
     */
    omit?: MovieOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieInclude<ExtArgs> | null
  }


  /**
   * Model Genre
   */

  export type AggregateGenre = {
    _count: GenreCountAggregateOutputType | null
    _min: GenreMinAggregateOutputType | null
    _max: GenreMaxAggregateOutputType | null
  }

  export type GenreMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type GenreMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type GenreCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type GenreMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type GenreMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type GenreCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type GenreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Genre to aggregate.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Genres
    **/
    _count?: true | GenreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GenreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GenreMaxAggregateInputType
  }

  export type GetGenreAggregateType<T extends GenreAggregateArgs> = {
        [P in keyof T & keyof AggregateGenre]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGenre[P]>
      : GetScalarType<T[P], AggregateGenre[P]>
  }




  export type GenreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GenreWhereInput
    orderBy?: GenreOrderByWithAggregationInput | GenreOrderByWithAggregationInput[]
    by: GenreScalarFieldEnum[] | GenreScalarFieldEnum
    having?: GenreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GenreCountAggregateInputType | true
    _min?: GenreMinAggregateInputType
    _max?: GenreMaxAggregateInputType
  }

  export type GenreGroupByOutputType = {
    id: string
    name: string
    _count: GenreCountAggregateOutputType | null
    _min: GenreMinAggregateOutputType | null
    _max: GenreMaxAggregateOutputType | null
  }

  type GetGenreGroupByPayload<T extends GenreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GenreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GenreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GenreGroupByOutputType[P]>
            : GetScalarType<T[P], GenreGroupByOutputType[P]>
        }
      >
    >


  export type GenreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    movies?: boolean | Genre$moviesArgs<ExtArgs>
    _count?: boolean | GenreCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["genre"]>

  export type GenreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["genre"]>

  export type GenreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["genre"]>

  export type GenreSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type GenreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["genre"]>
  export type GenreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movies?: boolean | Genre$moviesArgs<ExtArgs>
    _count?: boolean | GenreCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GenreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GenreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GenrePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Genre"
    objects: {
      movies: Prisma.$MovieGenrePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
    }, ExtArgs["result"]["genre"]>
    composites: {}
  }

  type GenreGetPayload<S extends boolean | null | undefined | GenreDefaultArgs> = $Result.GetResult<Prisma.$GenrePayload, S>

  type GenreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GenreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GenreCountAggregateInputType | true
    }

  export interface GenreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Genre'], meta: { name: 'Genre' } }
    /**
     * Find zero or one Genre that matches the filter.
     * @param {GenreFindUniqueArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GenreFindUniqueArgs>(args: SelectSubset<T, GenreFindUniqueArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Genre that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GenreFindUniqueOrThrowArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GenreFindUniqueOrThrowArgs>(args: SelectSubset<T, GenreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Genre that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreFindFirstArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GenreFindFirstArgs>(args?: SelectSubset<T, GenreFindFirstArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Genre that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreFindFirstOrThrowArgs} args - Arguments to find a Genre
     * @example
     * // Get one Genre
     * const genre = await prisma.genre.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GenreFindFirstOrThrowArgs>(args?: SelectSubset<T, GenreFindFirstOrThrowArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Genres that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Genres
     * const genres = await prisma.genre.findMany()
     * 
     * // Get first 10 Genres
     * const genres = await prisma.genre.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const genreWithIdOnly = await prisma.genre.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GenreFindManyArgs>(args?: SelectSubset<T, GenreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Genre.
     * @param {GenreCreateArgs} args - Arguments to create a Genre.
     * @example
     * // Create one Genre
     * const Genre = await prisma.genre.create({
     *   data: {
     *     // ... data to create a Genre
     *   }
     * })
     * 
     */
    create<T extends GenreCreateArgs>(args: SelectSubset<T, GenreCreateArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Genres.
     * @param {GenreCreateManyArgs} args - Arguments to create many Genres.
     * @example
     * // Create many Genres
     * const genre = await prisma.genre.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GenreCreateManyArgs>(args?: SelectSubset<T, GenreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Genres and returns the data saved in the database.
     * @param {GenreCreateManyAndReturnArgs} args - Arguments to create many Genres.
     * @example
     * // Create many Genres
     * const genre = await prisma.genre.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Genres and only return the `id`
     * const genreWithIdOnly = await prisma.genre.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GenreCreateManyAndReturnArgs>(args?: SelectSubset<T, GenreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Genre.
     * @param {GenreDeleteArgs} args - Arguments to delete one Genre.
     * @example
     * // Delete one Genre
     * const Genre = await prisma.genre.delete({
     *   where: {
     *     // ... filter to delete one Genre
     *   }
     * })
     * 
     */
    delete<T extends GenreDeleteArgs>(args: SelectSubset<T, GenreDeleteArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Genre.
     * @param {GenreUpdateArgs} args - Arguments to update one Genre.
     * @example
     * // Update one Genre
     * const genre = await prisma.genre.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GenreUpdateArgs>(args: SelectSubset<T, GenreUpdateArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Genres.
     * @param {GenreDeleteManyArgs} args - Arguments to filter Genres to delete.
     * @example
     * // Delete a few Genres
     * const { count } = await prisma.genre.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GenreDeleteManyArgs>(args?: SelectSubset<T, GenreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Genres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Genres
     * const genre = await prisma.genre.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GenreUpdateManyArgs>(args: SelectSubset<T, GenreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Genres and returns the data updated in the database.
     * @param {GenreUpdateManyAndReturnArgs} args - Arguments to update many Genres.
     * @example
     * // Update many Genres
     * const genre = await prisma.genre.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Genres and only return the `id`
     * const genreWithIdOnly = await prisma.genre.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GenreUpdateManyAndReturnArgs>(args: SelectSubset<T, GenreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Genre.
     * @param {GenreUpsertArgs} args - Arguments to update or create a Genre.
     * @example
     * // Update or create a Genre
     * const genre = await prisma.genre.upsert({
     *   create: {
     *     // ... data to create a Genre
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Genre we want to update
     *   }
     * })
     */
    upsert<T extends GenreUpsertArgs>(args: SelectSubset<T, GenreUpsertArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Genres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreCountArgs} args - Arguments to filter Genres to count.
     * @example
     * // Count the number of Genres
     * const count = await prisma.genre.count({
     *   where: {
     *     // ... the filter for the Genres we want to count
     *   }
     * })
    **/
    count<T extends GenreCountArgs>(
      args?: Subset<T, GenreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GenreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Genre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GenreAggregateArgs>(args: Subset<T, GenreAggregateArgs>): Prisma.PrismaPromise<GetGenreAggregateType<T>>

    /**
     * Group by Genre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GenreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GenreGroupByArgs['orderBy'] }
        : { orderBy?: GenreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GenreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGenreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Genre model
   */
  readonly fields: GenreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Genre.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GenreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    movies<T extends Genre$moviesArgs<ExtArgs> = {}>(args?: Subset<T, Genre$moviesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Genre model
   */
  interface GenreFieldRefs {
    readonly id: FieldRef<"Genre", 'String'>
    readonly name: FieldRef<"Genre", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Genre findUnique
   */
  export type GenreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre findUniqueOrThrow
   */
  export type GenreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre findFirst
   */
  export type GenreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Genres.
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Genres.
     */
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * Genre findFirstOrThrow
   */
  export type GenreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genre to fetch.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Genres.
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Genres.
     */
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * Genre findMany
   */
  export type GenreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter, which Genres to fetch.
     */
    where?: GenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Genres to fetch.
     */
    orderBy?: GenreOrderByWithRelationInput | GenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Genres.
     */
    cursor?: GenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Genres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Genres.
     */
    skip?: number
    distinct?: GenreScalarFieldEnum | GenreScalarFieldEnum[]
  }

  /**
   * Genre create
   */
  export type GenreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * The data needed to create a Genre.
     */
    data: XOR<GenreCreateInput, GenreUncheckedCreateInput>
  }

  /**
   * Genre createMany
   */
  export type GenreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Genres.
     */
    data: GenreCreateManyInput | GenreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Genre createManyAndReturn
   */
  export type GenreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * The data used to create many Genres.
     */
    data: GenreCreateManyInput | GenreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Genre update
   */
  export type GenreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * The data needed to update a Genre.
     */
    data: XOR<GenreUpdateInput, GenreUncheckedUpdateInput>
    /**
     * Choose, which Genre to update.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre updateMany
   */
  export type GenreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Genres.
     */
    data: XOR<GenreUpdateManyMutationInput, GenreUncheckedUpdateManyInput>
    /**
     * Filter which Genres to update
     */
    where?: GenreWhereInput
    /**
     * Limit how many Genres to update.
     */
    limit?: number
  }

  /**
   * Genre updateManyAndReturn
   */
  export type GenreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * The data used to update Genres.
     */
    data: XOR<GenreUpdateManyMutationInput, GenreUncheckedUpdateManyInput>
    /**
     * Filter which Genres to update
     */
    where?: GenreWhereInput
    /**
     * Limit how many Genres to update.
     */
    limit?: number
  }

  /**
   * Genre upsert
   */
  export type GenreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * The filter to search for the Genre to update in case it exists.
     */
    where: GenreWhereUniqueInput
    /**
     * In case the Genre found by the `where` argument doesn't exist, create a new Genre with this data.
     */
    create: XOR<GenreCreateInput, GenreUncheckedCreateInput>
    /**
     * In case the Genre was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GenreUpdateInput, GenreUncheckedUpdateInput>
  }

  /**
   * Genre delete
   */
  export type GenreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
    /**
     * Filter which Genre to delete.
     */
    where: GenreWhereUniqueInput
  }

  /**
   * Genre deleteMany
   */
  export type GenreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Genres to delete
     */
    where?: GenreWhereInput
    /**
     * Limit how many Genres to delete.
     */
    limit?: number
  }

  /**
   * Genre.movies
   */
  export type Genre$moviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    where?: MovieGenreWhereInput
    orderBy?: MovieGenreOrderByWithRelationInput | MovieGenreOrderByWithRelationInput[]
    cursor?: MovieGenreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovieGenreScalarFieldEnum | MovieGenreScalarFieldEnum[]
  }

  /**
   * Genre without action
   */
  export type GenreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Genre
     */
    select?: GenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Genre
     */
    omit?: GenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenreInclude<ExtArgs> | null
  }


  /**
   * Model Director
   */

  export type AggregateDirector = {
    _count: DirectorCountAggregateOutputType | null
    _min: DirectorMinAggregateOutputType | null
    _max: DirectorMaxAggregateOutputType | null
  }

  export type DirectorMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
  }

  export type DirectorMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
  }

  export type DirectorCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    _all: number
  }


  export type DirectorMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
  }

  export type DirectorMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
  }

  export type DirectorCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    _all?: true
  }

  export type DirectorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Director to aggregate.
     */
    where?: DirectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Directors to fetch.
     */
    orderBy?: DirectorOrderByWithRelationInput | DirectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DirectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Directors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Directors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Directors
    **/
    _count?: true | DirectorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DirectorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DirectorMaxAggregateInputType
  }

  export type GetDirectorAggregateType<T extends DirectorAggregateArgs> = {
        [P in keyof T & keyof AggregateDirector]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDirector[P]>
      : GetScalarType<T[P], AggregateDirector[P]>
  }




  export type DirectorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DirectorWhereInput
    orderBy?: DirectorOrderByWithAggregationInput | DirectorOrderByWithAggregationInput[]
    by: DirectorScalarFieldEnum[] | DirectorScalarFieldEnum
    having?: DirectorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DirectorCountAggregateInputType | true
    _min?: DirectorMinAggregateInputType
    _max?: DirectorMaxAggregateInputType
  }

  export type DirectorGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    _count: DirectorCountAggregateOutputType | null
    _min: DirectorMinAggregateOutputType | null
    _max: DirectorMaxAggregateOutputType | null
  }

  type GetDirectorGroupByPayload<T extends DirectorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DirectorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DirectorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DirectorGroupByOutputType[P]>
            : GetScalarType<T[P], DirectorGroupByOutputType[P]>
        }
      >
    >


  export type DirectorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    movies?: boolean | Director$moviesArgs<ExtArgs>
    _count?: boolean | DirectorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["director"]>

  export type DirectorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
  }, ExtArgs["result"]["director"]>

  export type DirectorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
  }, ExtArgs["result"]["director"]>

  export type DirectorSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
  }

  export type DirectorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName", ExtArgs["result"]["director"]>
  export type DirectorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movies?: boolean | Director$moviesArgs<ExtArgs>
    _count?: boolean | DirectorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DirectorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DirectorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DirectorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Director"
    objects: {
      movies: Prisma.$MovieDirectorPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
    }, ExtArgs["result"]["director"]>
    composites: {}
  }

  type DirectorGetPayload<S extends boolean | null | undefined | DirectorDefaultArgs> = $Result.GetResult<Prisma.$DirectorPayload, S>

  type DirectorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DirectorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DirectorCountAggregateInputType | true
    }

  export interface DirectorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Director'], meta: { name: 'Director' } }
    /**
     * Find zero or one Director that matches the filter.
     * @param {DirectorFindUniqueArgs} args - Arguments to find a Director
     * @example
     * // Get one Director
     * const director = await prisma.director.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DirectorFindUniqueArgs>(args: SelectSubset<T, DirectorFindUniqueArgs<ExtArgs>>): Prisma__DirectorClient<$Result.GetResult<Prisma.$DirectorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Director that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DirectorFindUniqueOrThrowArgs} args - Arguments to find a Director
     * @example
     * // Get one Director
     * const director = await prisma.director.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DirectorFindUniqueOrThrowArgs>(args: SelectSubset<T, DirectorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DirectorClient<$Result.GetResult<Prisma.$DirectorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Director that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectorFindFirstArgs} args - Arguments to find a Director
     * @example
     * // Get one Director
     * const director = await prisma.director.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DirectorFindFirstArgs>(args?: SelectSubset<T, DirectorFindFirstArgs<ExtArgs>>): Prisma__DirectorClient<$Result.GetResult<Prisma.$DirectorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Director that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectorFindFirstOrThrowArgs} args - Arguments to find a Director
     * @example
     * // Get one Director
     * const director = await prisma.director.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DirectorFindFirstOrThrowArgs>(args?: SelectSubset<T, DirectorFindFirstOrThrowArgs<ExtArgs>>): Prisma__DirectorClient<$Result.GetResult<Prisma.$DirectorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Directors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Directors
     * const directors = await prisma.director.findMany()
     * 
     * // Get first 10 Directors
     * const directors = await prisma.director.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const directorWithIdOnly = await prisma.director.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DirectorFindManyArgs>(args?: SelectSubset<T, DirectorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DirectorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Director.
     * @param {DirectorCreateArgs} args - Arguments to create a Director.
     * @example
     * // Create one Director
     * const Director = await prisma.director.create({
     *   data: {
     *     // ... data to create a Director
     *   }
     * })
     * 
     */
    create<T extends DirectorCreateArgs>(args: SelectSubset<T, DirectorCreateArgs<ExtArgs>>): Prisma__DirectorClient<$Result.GetResult<Prisma.$DirectorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Directors.
     * @param {DirectorCreateManyArgs} args - Arguments to create many Directors.
     * @example
     * // Create many Directors
     * const director = await prisma.director.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DirectorCreateManyArgs>(args?: SelectSubset<T, DirectorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Directors and returns the data saved in the database.
     * @param {DirectorCreateManyAndReturnArgs} args - Arguments to create many Directors.
     * @example
     * // Create many Directors
     * const director = await prisma.director.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Directors and only return the `id`
     * const directorWithIdOnly = await prisma.director.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DirectorCreateManyAndReturnArgs>(args?: SelectSubset<T, DirectorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DirectorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Director.
     * @param {DirectorDeleteArgs} args - Arguments to delete one Director.
     * @example
     * // Delete one Director
     * const Director = await prisma.director.delete({
     *   where: {
     *     // ... filter to delete one Director
     *   }
     * })
     * 
     */
    delete<T extends DirectorDeleteArgs>(args: SelectSubset<T, DirectorDeleteArgs<ExtArgs>>): Prisma__DirectorClient<$Result.GetResult<Prisma.$DirectorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Director.
     * @param {DirectorUpdateArgs} args - Arguments to update one Director.
     * @example
     * // Update one Director
     * const director = await prisma.director.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DirectorUpdateArgs>(args: SelectSubset<T, DirectorUpdateArgs<ExtArgs>>): Prisma__DirectorClient<$Result.GetResult<Prisma.$DirectorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Directors.
     * @param {DirectorDeleteManyArgs} args - Arguments to filter Directors to delete.
     * @example
     * // Delete a few Directors
     * const { count } = await prisma.director.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DirectorDeleteManyArgs>(args?: SelectSubset<T, DirectorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Directors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Directors
     * const director = await prisma.director.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DirectorUpdateManyArgs>(args: SelectSubset<T, DirectorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Directors and returns the data updated in the database.
     * @param {DirectorUpdateManyAndReturnArgs} args - Arguments to update many Directors.
     * @example
     * // Update many Directors
     * const director = await prisma.director.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Directors and only return the `id`
     * const directorWithIdOnly = await prisma.director.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DirectorUpdateManyAndReturnArgs>(args: SelectSubset<T, DirectorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DirectorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Director.
     * @param {DirectorUpsertArgs} args - Arguments to update or create a Director.
     * @example
     * // Update or create a Director
     * const director = await prisma.director.upsert({
     *   create: {
     *     // ... data to create a Director
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Director we want to update
     *   }
     * })
     */
    upsert<T extends DirectorUpsertArgs>(args: SelectSubset<T, DirectorUpsertArgs<ExtArgs>>): Prisma__DirectorClient<$Result.GetResult<Prisma.$DirectorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Directors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectorCountArgs} args - Arguments to filter Directors to count.
     * @example
     * // Count the number of Directors
     * const count = await prisma.director.count({
     *   where: {
     *     // ... the filter for the Directors we want to count
     *   }
     * })
    **/
    count<T extends DirectorCountArgs>(
      args?: Subset<T, DirectorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DirectorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Director.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DirectorAggregateArgs>(args: Subset<T, DirectorAggregateArgs>): Prisma.PrismaPromise<GetDirectorAggregateType<T>>

    /**
     * Group by Director.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DirectorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DirectorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DirectorGroupByArgs['orderBy'] }
        : { orderBy?: DirectorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DirectorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDirectorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Director model
   */
  readonly fields: DirectorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Director.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DirectorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    movies<T extends Director$moviesArgs<ExtArgs> = {}>(args?: Subset<T, Director$moviesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovieDirectorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Director model
   */
  interface DirectorFieldRefs {
    readonly id: FieldRef<"Director", 'String'>
    readonly firstName: FieldRef<"Director", 'String'>
    readonly lastName: FieldRef<"Director", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Director findUnique
   */
  export type DirectorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Director
     */
    select?: DirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Director
     */
    omit?: DirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectorInclude<ExtArgs> | null
    /**
     * Filter, which Director to fetch.
     */
    where: DirectorWhereUniqueInput
  }

  /**
   * Director findUniqueOrThrow
   */
  export type DirectorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Director
     */
    select?: DirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Director
     */
    omit?: DirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectorInclude<ExtArgs> | null
    /**
     * Filter, which Director to fetch.
     */
    where: DirectorWhereUniqueInput
  }

  /**
   * Director findFirst
   */
  export type DirectorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Director
     */
    select?: DirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Director
     */
    omit?: DirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectorInclude<ExtArgs> | null
    /**
     * Filter, which Director to fetch.
     */
    where?: DirectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Directors to fetch.
     */
    orderBy?: DirectorOrderByWithRelationInput | DirectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Directors.
     */
    cursor?: DirectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Directors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Directors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Directors.
     */
    distinct?: DirectorScalarFieldEnum | DirectorScalarFieldEnum[]
  }

  /**
   * Director findFirstOrThrow
   */
  export type DirectorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Director
     */
    select?: DirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Director
     */
    omit?: DirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectorInclude<ExtArgs> | null
    /**
     * Filter, which Director to fetch.
     */
    where?: DirectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Directors to fetch.
     */
    orderBy?: DirectorOrderByWithRelationInput | DirectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Directors.
     */
    cursor?: DirectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Directors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Directors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Directors.
     */
    distinct?: DirectorScalarFieldEnum | DirectorScalarFieldEnum[]
  }

  /**
   * Director findMany
   */
  export type DirectorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Director
     */
    select?: DirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Director
     */
    omit?: DirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectorInclude<ExtArgs> | null
    /**
     * Filter, which Directors to fetch.
     */
    where?: DirectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Directors to fetch.
     */
    orderBy?: DirectorOrderByWithRelationInput | DirectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Directors.
     */
    cursor?: DirectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Directors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Directors.
     */
    skip?: number
    distinct?: DirectorScalarFieldEnum | DirectorScalarFieldEnum[]
  }

  /**
   * Director create
   */
  export type DirectorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Director
     */
    select?: DirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Director
     */
    omit?: DirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectorInclude<ExtArgs> | null
    /**
     * The data needed to create a Director.
     */
    data: XOR<DirectorCreateInput, DirectorUncheckedCreateInput>
  }

  /**
   * Director createMany
   */
  export type DirectorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Directors.
     */
    data: DirectorCreateManyInput | DirectorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Director createManyAndReturn
   */
  export type DirectorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Director
     */
    select?: DirectorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Director
     */
    omit?: DirectorOmit<ExtArgs> | null
    /**
     * The data used to create many Directors.
     */
    data: DirectorCreateManyInput | DirectorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Director update
   */
  export type DirectorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Director
     */
    select?: DirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Director
     */
    omit?: DirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectorInclude<ExtArgs> | null
    /**
     * The data needed to update a Director.
     */
    data: XOR<DirectorUpdateInput, DirectorUncheckedUpdateInput>
    /**
     * Choose, which Director to update.
     */
    where: DirectorWhereUniqueInput
  }

  /**
   * Director updateMany
   */
  export type DirectorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Directors.
     */
    data: XOR<DirectorUpdateManyMutationInput, DirectorUncheckedUpdateManyInput>
    /**
     * Filter which Directors to update
     */
    where?: DirectorWhereInput
    /**
     * Limit how many Directors to update.
     */
    limit?: number
  }

  /**
   * Director updateManyAndReturn
   */
  export type DirectorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Director
     */
    select?: DirectorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Director
     */
    omit?: DirectorOmit<ExtArgs> | null
    /**
     * The data used to update Directors.
     */
    data: XOR<DirectorUpdateManyMutationInput, DirectorUncheckedUpdateManyInput>
    /**
     * Filter which Directors to update
     */
    where?: DirectorWhereInput
    /**
     * Limit how many Directors to update.
     */
    limit?: number
  }

  /**
   * Director upsert
   */
  export type DirectorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Director
     */
    select?: DirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Director
     */
    omit?: DirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectorInclude<ExtArgs> | null
    /**
     * The filter to search for the Director to update in case it exists.
     */
    where: DirectorWhereUniqueInput
    /**
     * In case the Director found by the `where` argument doesn't exist, create a new Director with this data.
     */
    create: XOR<DirectorCreateInput, DirectorUncheckedCreateInput>
    /**
     * In case the Director was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DirectorUpdateInput, DirectorUncheckedUpdateInput>
  }

  /**
   * Director delete
   */
  export type DirectorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Director
     */
    select?: DirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Director
     */
    omit?: DirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectorInclude<ExtArgs> | null
    /**
     * Filter which Director to delete.
     */
    where: DirectorWhereUniqueInput
  }

  /**
   * Director deleteMany
   */
  export type DirectorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Directors to delete
     */
    where?: DirectorWhereInput
    /**
     * Limit how many Directors to delete.
     */
    limit?: number
  }

  /**
   * Director.movies
   */
  export type Director$moviesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieDirector
     */
    select?: MovieDirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieDirector
     */
    omit?: MovieDirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieDirectorInclude<ExtArgs> | null
    where?: MovieDirectorWhereInput
    orderBy?: MovieDirectorOrderByWithRelationInput | MovieDirectorOrderByWithRelationInput[]
    cursor?: MovieDirectorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovieDirectorScalarFieldEnum | MovieDirectorScalarFieldEnum[]
  }

  /**
   * Director without action
   */
  export type DirectorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Director
     */
    select?: DirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Director
     */
    omit?: DirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DirectorInclude<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagMinAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type TagMaxAggregateOutputType = {
    id: string | null
    name: string | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type TagMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: string
    name: string
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    entries?: boolean | Tag$entriesArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entries?: boolean | Tag$entriesArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      entries: Prisma.$EntryTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {TagCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags and returns the data updated in the database.
     * @param {TagUpdateManyAndReturnArgs} args - Arguments to update many Tags.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TagUpdateManyAndReturnArgs>(args: SelectSubset<T, TagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    entries<T extends Tag$entriesArgs<ExtArgs> = {}>(args?: Subset<T, Tag$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'String'>
    readonly name: FieldRef<"Tag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag createManyAndReturn
   */
  export type TagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag updateManyAndReturn
   */
  export type TagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.entries
   */
  export type Tag$entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryTag
     */
    select?: EntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryTag
     */
    omit?: EntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryTagInclude<ExtArgs> | null
    where?: EntryTagWhereInput
    orderBy?: EntryTagOrderByWithRelationInput | EntryTagOrderByWithRelationInput[]
    cursor?: EntryTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EntryTagScalarFieldEnum | EntryTagScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model DiaryEntry
   */

  export type AggregateDiaryEntry = {
    _count: DiaryEntryCountAggregateOutputType | null
    _avg: DiaryEntryAvgAggregateOutputType | null
    _sum: DiaryEntrySumAggregateOutputType | null
    _min: DiaryEntryMinAggregateOutputType | null
    _max: DiaryEntryMaxAggregateOutputType | null
  }

  export type DiaryEntryAvgAggregateOutputType = {
    watchedCount: number | null
    rating: number | null
  }

  export type DiaryEntrySumAggregateOutputType = {
    watchedCount: number | null
    rating: number | null
  }

  export type DiaryEntryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    movieId: string | null
    lastWatchedDate: Date | null
    watchedCount: number | null
    rating: number | null
    review: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DiaryEntryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    movieId: string | null
    lastWatchedDate: Date | null
    watchedCount: number | null
    rating: number | null
    review: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DiaryEntryCountAggregateOutputType = {
    id: number
    userId: number
    movieId: number
    lastWatchedDate: number
    watchedCount: number
    rating: number
    review: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DiaryEntryAvgAggregateInputType = {
    watchedCount?: true
    rating?: true
  }

  export type DiaryEntrySumAggregateInputType = {
    watchedCount?: true
    rating?: true
  }

  export type DiaryEntryMinAggregateInputType = {
    id?: true
    userId?: true
    movieId?: true
    lastWatchedDate?: true
    watchedCount?: true
    rating?: true
    review?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DiaryEntryMaxAggregateInputType = {
    id?: true
    userId?: true
    movieId?: true
    lastWatchedDate?: true
    watchedCount?: true
    rating?: true
    review?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DiaryEntryCountAggregateInputType = {
    id?: true
    userId?: true
    movieId?: true
    lastWatchedDate?: true
    watchedCount?: true
    rating?: true
    review?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DiaryEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DiaryEntry to aggregate.
     */
    where?: DiaryEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiaryEntries to fetch.
     */
    orderBy?: DiaryEntryOrderByWithRelationInput | DiaryEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DiaryEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiaryEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiaryEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DiaryEntries
    **/
    _count?: true | DiaryEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DiaryEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DiaryEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DiaryEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DiaryEntryMaxAggregateInputType
  }

  export type GetDiaryEntryAggregateType<T extends DiaryEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateDiaryEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDiaryEntry[P]>
      : GetScalarType<T[P], AggregateDiaryEntry[P]>
  }




  export type DiaryEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DiaryEntryWhereInput
    orderBy?: DiaryEntryOrderByWithAggregationInput | DiaryEntryOrderByWithAggregationInput[]
    by: DiaryEntryScalarFieldEnum[] | DiaryEntryScalarFieldEnum
    having?: DiaryEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DiaryEntryCountAggregateInputType | true
    _avg?: DiaryEntryAvgAggregateInputType
    _sum?: DiaryEntrySumAggregateInputType
    _min?: DiaryEntryMinAggregateInputType
    _max?: DiaryEntryMaxAggregateInputType
  }

  export type DiaryEntryGroupByOutputType = {
    id: string
    userId: string
    movieId: string
    lastWatchedDate: Date
    watchedCount: number
    rating: number
    review: string | null
    createdAt: Date
    updatedAt: Date
    _count: DiaryEntryCountAggregateOutputType | null
    _avg: DiaryEntryAvgAggregateOutputType | null
    _sum: DiaryEntrySumAggregateOutputType | null
    _min: DiaryEntryMinAggregateOutputType | null
    _max: DiaryEntryMaxAggregateOutputType | null
  }

  type GetDiaryEntryGroupByPayload<T extends DiaryEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DiaryEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DiaryEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DiaryEntryGroupByOutputType[P]>
            : GetScalarType<T[P], DiaryEntryGroupByOutputType[P]>
        }
      >
    >


  export type DiaryEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    movieId?: boolean
    lastWatchedDate?: boolean
    watchedCount?: boolean
    rating?: boolean
    review?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    tags?: boolean | DiaryEntry$tagsArgs<ExtArgs>
    likes?: boolean | DiaryEntry$likesArgs<ExtArgs>
    _count?: boolean | DiaryEntryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["diaryEntry"]>

  export type DiaryEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    movieId?: boolean
    lastWatchedDate?: boolean
    watchedCount?: boolean
    rating?: boolean
    review?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    movie?: boolean | MovieDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["diaryEntry"]>

  export type DiaryEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    movieId?: boolean
    lastWatchedDate?: boolean
    watchedCount?: boolean
    rating?: boolean
    review?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    movie?: boolean | MovieDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["diaryEntry"]>

  export type DiaryEntrySelectScalar = {
    id?: boolean
    userId?: boolean
    movieId?: boolean
    lastWatchedDate?: boolean
    watchedCount?: boolean
    rating?: boolean
    review?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DiaryEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "movieId" | "lastWatchedDate" | "watchedCount" | "rating" | "review" | "createdAt" | "updatedAt", ExtArgs["result"]["diaryEntry"]>
  export type DiaryEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    tags?: boolean | DiaryEntry$tagsArgs<ExtArgs>
    likes?: boolean | DiaryEntry$likesArgs<ExtArgs>
    _count?: boolean | DiaryEntryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DiaryEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    movie?: boolean | MovieDefaultArgs<ExtArgs>
  }
  export type DiaryEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    movie?: boolean | MovieDefaultArgs<ExtArgs>
  }

  export type $DiaryEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DiaryEntry"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      movie: Prisma.$MoviePayload<ExtArgs>
      tags: Prisma.$EntryTagPayload<ExtArgs>[]
      likes: Prisma.$EntryLikePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      movieId: string
      lastWatchedDate: Date
      watchedCount: number
      rating: number
      review: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["diaryEntry"]>
    composites: {}
  }

  type DiaryEntryGetPayload<S extends boolean | null | undefined | DiaryEntryDefaultArgs> = $Result.GetResult<Prisma.$DiaryEntryPayload, S>

  type DiaryEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DiaryEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DiaryEntryCountAggregateInputType | true
    }

  export interface DiaryEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DiaryEntry'], meta: { name: 'DiaryEntry' } }
    /**
     * Find zero or one DiaryEntry that matches the filter.
     * @param {DiaryEntryFindUniqueArgs} args - Arguments to find a DiaryEntry
     * @example
     * // Get one DiaryEntry
     * const diaryEntry = await prisma.diaryEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DiaryEntryFindUniqueArgs>(args: SelectSubset<T, DiaryEntryFindUniqueArgs<ExtArgs>>): Prisma__DiaryEntryClient<$Result.GetResult<Prisma.$DiaryEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DiaryEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DiaryEntryFindUniqueOrThrowArgs} args - Arguments to find a DiaryEntry
     * @example
     * // Get one DiaryEntry
     * const diaryEntry = await prisma.diaryEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DiaryEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, DiaryEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DiaryEntryClient<$Result.GetResult<Prisma.$DiaryEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DiaryEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiaryEntryFindFirstArgs} args - Arguments to find a DiaryEntry
     * @example
     * // Get one DiaryEntry
     * const diaryEntry = await prisma.diaryEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DiaryEntryFindFirstArgs>(args?: SelectSubset<T, DiaryEntryFindFirstArgs<ExtArgs>>): Prisma__DiaryEntryClient<$Result.GetResult<Prisma.$DiaryEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DiaryEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiaryEntryFindFirstOrThrowArgs} args - Arguments to find a DiaryEntry
     * @example
     * // Get one DiaryEntry
     * const diaryEntry = await prisma.diaryEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DiaryEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, DiaryEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__DiaryEntryClient<$Result.GetResult<Prisma.$DiaryEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DiaryEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiaryEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DiaryEntries
     * const diaryEntries = await prisma.diaryEntry.findMany()
     * 
     * // Get first 10 DiaryEntries
     * const diaryEntries = await prisma.diaryEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const diaryEntryWithIdOnly = await prisma.diaryEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DiaryEntryFindManyArgs>(args?: SelectSubset<T, DiaryEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiaryEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DiaryEntry.
     * @param {DiaryEntryCreateArgs} args - Arguments to create a DiaryEntry.
     * @example
     * // Create one DiaryEntry
     * const DiaryEntry = await prisma.diaryEntry.create({
     *   data: {
     *     // ... data to create a DiaryEntry
     *   }
     * })
     * 
     */
    create<T extends DiaryEntryCreateArgs>(args: SelectSubset<T, DiaryEntryCreateArgs<ExtArgs>>): Prisma__DiaryEntryClient<$Result.GetResult<Prisma.$DiaryEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DiaryEntries.
     * @param {DiaryEntryCreateManyArgs} args - Arguments to create many DiaryEntries.
     * @example
     * // Create many DiaryEntries
     * const diaryEntry = await prisma.diaryEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DiaryEntryCreateManyArgs>(args?: SelectSubset<T, DiaryEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DiaryEntries and returns the data saved in the database.
     * @param {DiaryEntryCreateManyAndReturnArgs} args - Arguments to create many DiaryEntries.
     * @example
     * // Create many DiaryEntries
     * const diaryEntry = await prisma.diaryEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DiaryEntries and only return the `id`
     * const diaryEntryWithIdOnly = await prisma.diaryEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DiaryEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, DiaryEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiaryEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DiaryEntry.
     * @param {DiaryEntryDeleteArgs} args - Arguments to delete one DiaryEntry.
     * @example
     * // Delete one DiaryEntry
     * const DiaryEntry = await prisma.diaryEntry.delete({
     *   where: {
     *     // ... filter to delete one DiaryEntry
     *   }
     * })
     * 
     */
    delete<T extends DiaryEntryDeleteArgs>(args: SelectSubset<T, DiaryEntryDeleteArgs<ExtArgs>>): Prisma__DiaryEntryClient<$Result.GetResult<Prisma.$DiaryEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DiaryEntry.
     * @param {DiaryEntryUpdateArgs} args - Arguments to update one DiaryEntry.
     * @example
     * // Update one DiaryEntry
     * const diaryEntry = await prisma.diaryEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DiaryEntryUpdateArgs>(args: SelectSubset<T, DiaryEntryUpdateArgs<ExtArgs>>): Prisma__DiaryEntryClient<$Result.GetResult<Prisma.$DiaryEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DiaryEntries.
     * @param {DiaryEntryDeleteManyArgs} args - Arguments to filter DiaryEntries to delete.
     * @example
     * // Delete a few DiaryEntries
     * const { count } = await prisma.diaryEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DiaryEntryDeleteManyArgs>(args?: SelectSubset<T, DiaryEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DiaryEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiaryEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DiaryEntries
     * const diaryEntry = await prisma.diaryEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DiaryEntryUpdateManyArgs>(args: SelectSubset<T, DiaryEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DiaryEntries and returns the data updated in the database.
     * @param {DiaryEntryUpdateManyAndReturnArgs} args - Arguments to update many DiaryEntries.
     * @example
     * // Update many DiaryEntries
     * const diaryEntry = await prisma.diaryEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DiaryEntries and only return the `id`
     * const diaryEntryWithIdOnly = await prisma.diaryEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DiaryEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, DiaryEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DiaryEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DiaryEntry.
     * @param {DiaryEntryUpsertArgs} args - Arguments to update or create a DiaryEntry.
     * @example
     * // Update or create a DiaryEntry
     * const diaryEntry = await prisma.diaryEntry.upsert({
     *   create: {
     *     // ... data to create a DiaryEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DiaryEntry we want to update
     *   }
     * })
     */
    upsert<T extends DiaryEntryUpsertArgs>(args: SelectSubset<T, DiaryEntryUpsertArgs<ExtArgs>>): Prisma__DiaryEntryClient<$Result.GetResult<Prisma.$DiaryEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DiaryEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiaryEntryCountArgs} args - Arguments to filter DiaryEntries to count.
     * @example
     * // Count the number of DiaryEntries
     * const count = await prisma.diaryEntry.count({
     *   where: {
     *     // ... the filter for the DiaryEntries we want to count
     *   }
     * })
    **/
    count<T extends DiaryEntryCountArgs>(
      args?: Subset<T, DiaryEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DiaryEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DiaryEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiaryEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DiaryEntryAggregateArgs>(args: Subset<T, DiaryEntryAggregateArgs>): Prisma.PrismaPromise<GetDiaryEntryAggregateType<T>>

    /**
     * Group by DiaryEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiaryEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DiaryEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DiaryEntryGroupByArgs['orderBy'] }
        : { orderBy?: DiaryEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DiaryEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiaryEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DiaryEntry model
   */
  readonly fields: DiaryEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DiaryEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DiaryEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    movie<T extends MovieDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MovieDefaultArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tags<T extends DiaryEntry$tagsArgs<ExtArgs> = {}>(args?: Subset<T, DiaryEntry$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes<T extends DiaryEntry$likesArgs<ExtArgs> = {}>(args?: Subset<T, DiaryEntry$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DiaryEntry model
   */
  interface DiaryEntryFieldRefs {
    readonly id: FieldRef<"DiaryEntry", 'String'>
    readonly userId: FieldRef<"DiaryEntry", 'String'>
    readonly movieId: FieldRef<"DiaryEntry", 'String'>
    readonly lastWatchedDate: FieldRef<"DiaryEntry", 'DateTime'>
    readonly watchedCount: FieldRef<"DiaryEntry", 'Int'>
    readonly rating: FieldRef<"DiaryEntry", 'Int'>
    readonly review: FieldRef<"DiaryEntry", 'String'>
    readonly createdAt: FieldRef<"DiaryEntry", 'DateTime'>
    readonly updatedAt: FieldRef<"DiaryEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DiaryEntry findUnique
   */
  export type DiaryEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiaryEntry
     */
    select?: DiaryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiaryEntry
     */
    omit?: DiaryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiaryEntryInclude<ExtArgs> | null
    /**
     * Filter, which DiaryEntry to fetch.
     */
    where: DiaryEntryWhereUniqueInput
  }

  /**
   * DiaryEntry findUniqueOrThrow
   */
  export type DiaryEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiaryEntry
     */
    select?: DiaryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiaryEntry
     */
    omit?: DiaryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiaryEntryInclude<ExtArgs> | null
    /**
     * Filter, which DiaryEntry to fetch.
     */
    where: DiaryEntryWhereUniqueInput
  }

  /**
   * DiaryEntry findFirst
   */
  export type DiaryEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiaryEntry
     */
    select?: DiaryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiaryEntry
     */
    omit?: DiaryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiaryEntryInclude<ExtArgs> | null
    /**
     * Filter, which DiaryEntry to fetch.
     */
    where?: DiaryEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiaryEntries to fetch.
     */
    orderBy?: DiaryEntryOrderByWithRelationInput | DiaryEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DiaryEntries.
     */
    cursor?: DiaryEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiaryEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiaryEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DiaryEntries.
     */
    distinct?: DiaryEntryScalarFieldEnum | DiaryEntryScalarFieldEnum[]
  }

  /**
   * DiaryEntry findFirstOrThrow
   */
  export type DiaryEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiaryEntry
     */
    select?: DiaryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiaryEntry
     */
    omit?: DiaryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiaryEntryInclude<ExtArgs> | null
    /**
     * Filter, which DiaryEntry to fetch.
     */
    where?: DiaryEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiaryEntries to fetch.
     */
    orderBy?: DiaryEntryOrderByWithRelationInput | DiaryEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DiaryEntries.
     */
    cursor?: DiaryEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiaryEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiaryEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DiaryEntries.
     */
    distinct?: DiaryEntryScalarFieldEnum | DiaryEntryScalarFieldEnum[]
  }

  /**
   * DiaryEntry findMany
   */
  export type DiaryEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiaryEntry
     */
    select?: DiaryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiaryEntry
     */
    omit?: DiaryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiaryEntryInclude<ExtArgs> | null
    /**
     * Filter, which DiaryEntries to fetch.
     */
    where?: DiaryEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DiaryEntries to fetch.
     */
    orderBy?: DiaryEntryOrderByWithRelationInput | DiaryEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DiaryEntries.
     */
    cursor?: DiaryEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DiaryEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DiaryEntries.
     */
    skip?: number
    distinct?: DiaryEntryScalarFieldEnum | DiaryEntryScalarFieldEnum[]
  }

  /**
   * DiaryEntry create
   */
  export type DiaryEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiaryEntry
     */
    select?: DiaryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiaryEntry
     */
    omit?: DiaryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiaryEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a DiaryEntry.
     */
    data: XOR<DiaryEntryCreateInput, DiaryEntryUncheckedCreateInput>
  }

  /**
   * DiaryEntry createMany
   */
  export type DiaryEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DiaryEntries.
     */
    data: DiaryEntryCreateManyInput | DiaryEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DiaryEntry createManyAndReturn
   */
  export type DiaryEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiaryEntry
     */
    select?: DiaryEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DiaryEntry
     */
    omit?: DiaryEntryOmit<ExtArgs> | null
    /**
     * The data used to create many DiaryEntries.
     */
    data: DiaryEntryCreateManyInput | DiaryEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiaryEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DiaryEntry update
   */
  export type DiaryEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiaryEntry
     */
    select?: DiaryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiaryEntry
     */
    omit?: DiaryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiaryEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a DiaryEntry.
     */
    data: XOR<DiaryEntryUpdateInput, DiaryEntryUncheckedUpdateInput>
    /**
     * Choose, which DiaryEntry to update.
     */
    where: DiaryEntryWhereUniqueInput
  }

  /**
   * DiaryEntry updateMany
   */
  export type DiaryEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DiaryEntries.
     */
    data: XOR<DiaryEntryUpdateManyMutationInput, DiaryEntryUncheckedUpdateManyInput>
    /**
     * Filter which DiaryEntries to update
     */
    where?: DiaryEntryWhereInput
    /**
     * Limit how many DiaryEntries to update.
     */
    limit?: number
  }

  /**
   * DiaryEntry updateManyAndReturn
   */
  export type DiaryEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiaryEntry
     */
    select?: DiaryEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DiaryEntry
     */
    omit?: DiaryEntryOmit<ExtArgs> | null
    /**
     * The data used to update DiaryEntries.
     */
    data: XOR<DiaryEntryUpdateManyMutationInput, DiaryEntryUncheckedUpdateManyInput>
    /**
     * Filter which DiaryEntries to update
     */
    where?: DiaryEntryWhereInput
    /**
     * Limit how many DiaryEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiaryEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DiaryEntry upsert
   */
  export type DiaryEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiaryEntry
     */
    select?: DiaryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiaryEntry
     */
    omit?: DiaryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiaryEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the DiaryEntry to update in case it exists.
     */
    where: DiaryEntryWhereUniqueInput
    /**
     * In case the DiaryEntry found by the `where` argument doesn't exist, create a new DiaryEntry with this data.
     */
    create: XOR<DiaryEntryCreateInput, DiaryEntryUncheckedCreateInput>
    /**
     * In case the DiaryEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DiaryEntryUpdateInput, DiaryEntryUncheckedUpdateInput>
  }

  /**
   * DiaryEntry delete
   */
  export type DiaryEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiaryEntry
     */
    select?: DiaryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiaryEntry
     */
    omit?: DiaryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiaryEntryInclude<ExtArgs> | null
    /**
     * Filter which DiaryEntry to delete.
     */
    where: DiaryEntryWhereUniqueInput
  }

  /**
   * DiaryEntry deleteMany
   */
  export type DiaryEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DiaryEntries to delete
     */
    where?: DiaryEntryWhereInput
    /**
     * Limit how many DiaryEntries to delete.
     */
    limit?: number
  }

  /**
   * DiaryEntry.tags
   */
  export type DiaryEntry$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryTag
     */
    select?: EntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryTag
     */
    omit?: EntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryTagInclude<ExtArgs> | null
    where?: EntryTagWhereInput
    orderBy?: EntryTagOrderByWithRelationInput | EntryTagOrderByWithRelationInput[]
    cursor?: EntryTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EntryTagScalarFieldEnum | EntryTagScalarFieldEnum[]
  }

  /**
   * DiaryEntry.likes
   */
  export type DiaryEntry$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLike
     */
    select?: EntryLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLike
     */
    omit?: EntryLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLikeInclude<ExtArgs> | null
    where?: EntryLikeWhereInput
    orderBy?: EntryLikeOrderByWithRelationInput | EntryLikeOrderByWithRelationInput[]
    cursor?: EntryLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EntryLikeScalarFieldEnum | EntryLikeScalarFieldEnum[]
  }

  /**
   * DiaryEntry without action
   */
  export type DiaryEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiaryEntry
     */
    select?: DiaryEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the DiaryEntry
     */
    omit?: DiaryEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DiaryEntryInclude<ExtArgs> | null
  }


  /**
   * Model EntryTag
   */

  export type AggregateEntryTag = {
    _count: EntryTagCountAggregateOutputType | null
    _min: EntryTagMinAggregateOutputType | null
    _max: EntryTagMaxAggregateOutputType | null
  }

  export type EntryTagMinAggregateOutputType = {
    diaryEntryId: string | null
    tagId: string | null
  }

  export type EntryTagMaxAggregateOutputType = {
    diaryEntryId: string | null
    tagId: string | null
  }

  export type EntryTagCountAggregateOutputType = {
    diaryEntryId: number
    tagId: number
    _all: number
  }


  export type EntryTagMinAggregateInputType = {
    diaryEntryId?: true
    tagId?: true
  }

  export type EntryTagMaxAggregateInputType = {
    diaryEntryId?: true
    tagId?: true
  }

  export type EntryTagCountAggregateInputType = {
    diaryEntryId?: true
    tagId?: true
    _all?: true
  }

  export type EntryTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EntryTag to aggregate.
     */
    where?: EntryTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntryTags to fetch.
     */
    orderBy?: EntryTagOrderByWithRelationInput | EntryTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EntryTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntryTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntryTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EntryTags
    **/
    _count?: true | EntryTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EntryTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EntryTagMaxAggregateInputType
  }

  export type GetEntryTagAggregateType<T extends EntryTagAggregateArgs> = {
        [P in keyof T & keyof AggregateEntryTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEntryTag[P]>
      : GetScalarType<T[P], AggregateEntryTag[P]>
  }




  export type EntryTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntryTagWhereInput
    orderBy?: EntryTagOrderByWithAggregationInput | EntryTagOrderByWithAggregationInput[]
    by: EntryTagScalarFieldEnum[] | EntryTagScalarFieldEnum
    having?: EntryTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EntryTagCountAggregateInputType | true
    _min?: EntryTagMinAggregateInputType
    _max?: EntryTagMaxAggregateInputType
  }

  export type EntryTagGroupByOutputType = {
    diaryEntryId: string
    tagId: string
    _count: EntryTagCountAggregateOutputType | null
    _min: EntryTagMinAggregateOutputType | null
    _max: EntryTagMaxAggregateOutputType | null
  }

  type GetEntryTagGroupByPayload<T extends EntryTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EntryTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EntryTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EntryTagGroupByOutputType[P]>
            : GetScalarType<T[P], EntryTagGroupByOutputType[P]>
        }
      >
    >


  export type EntryTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    diaryEntryId?: boolean
    tagId?: boolean
    entry?: boolean | DiaryEntryDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entryTag"]>

  export type EntryTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    diaryEntryId?: boolean
    tagId?: boolean
    entry?: boolean | DiaryEntryDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entryTag"]>

  export type EntryTagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    diaryEntryId?: boolean
    tagId?: boolean
    entry?: boolean | DiaryEntryDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entryTag"]>

  export type EntryTagSelectScalar = {
    diaryEntryId?: boolean
    tagId?: boolean
  }

  export type EntryTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"diaryEntryId" | "tagId", ExtArgs["result"]["entryTag"]>
  export type EntryTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | DiaryEntryDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type EntryTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | DiaryEntryDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type EntryTagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | DiaryEntryDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $EntryTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EntryTag"
    objects: {
      entry: Prisma.$DiaryEntryPayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      diaryEntryId: string
      tagId: string
    }, ExtArgs["result"]["entryTag"]>
    composites: {}
  }

  type EntryTagGetPayload<S extends boolean | null | undefined | EntryTagDefaultArgs> = $Result.GetResult<Prisma.$EntryTagPayload, S>

  type EntryTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EntryTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EntryTagCountAggregateInputType | true
    }

  export interface EntryTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EntryTag'], meta: { name: 'EntryTag' } }
    /**
     * Find zero or one EntryTag that matches the filter.
     * @param {EntryTagFindUniqueArgs} args - Arguments to find a EntryTag
     * @example
     * // Get one EntryTag
     * const entryTag = await prisma.entryTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EntryTagFindUniqueArgs>(args: SelectSubset<T, EntryTagFindUniqueArgs<ExtArgs>>): Prisma__EntryTagClient<$Result.GetResult<Prisma.$EntryTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EntryTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EntryTagFindUniqueOrThrowArgs} args - Arguments to find a EntryTag
     * @example
     * // Get one EntryTag
     * const entryTag = await prisma.entryTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EntryTagFindUniqueOrThrowArgs>(args: SelectSubset<T, EntryTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EntryTagClient<$Result.GetResult<Prisma.$EntryTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EntryTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryTagFindFirstArgs} args - Arguments to find a EntryTag
     * @example
     * // Get one EntryTag
     * const entryTag = await prisma.entryTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EntryTagFindFirstArgs>(args?: SelectSubset<T, EntryTagFindFirstArgs<ExtArgs>>): Prisma__EntryTagClient<$Result.GetResult<Prisma.$EntryTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EntryTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryTagFindFirstOrThrowArgs} args - Arguments to find a EntryTag
     * @example
     * // Get one EntryTag
     * const entryTag = await prisma.entryTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EntryTagFindFirstOrThrowArgs>(args?: SelectSubset<T, EntryTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__EntryTagClient<$Result.GetResult<Prisma.$EntryTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EntryTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EntryTags
     * const entryTags = await prisma.entryTag.findMany()
     * 
     * // Get first 10 EntryTags
     * const entryTags = await prisma.entryTag.findMany({ take: 10 })
     * 
     * // Only select the `diaryEntryId`
     * const entryTagWithDiaryEntryIdOnly = await prisma.entryTag.findMany({ select: { diaryEntryId: true } })
     * 
     */
    findMany<T extends EntryTagFindManyArgs>(args?: SelectSubset<T, EntryTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EntryTag.
     * @param {EntryTagCreateArgs} args - Arguments to create a EntryTag.
     * @example
     * // Create one EntryTag
     * const EntryTag = await prisma.entryTag.create({
     *   data: {
     *     // ... data to create a EntryTag
     *   }
     * })
     * 
     */
    create<T extends EntryTagCreateArgs>(args: SelectSubset<T, EntryTagCreateArgs<ExtArgs>>): Prisma__EntryTagClient<$Result.GetResult<Prisma.$EntryTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EntryTags.
     * @param {EntryTagCreateManyArgs} args - Arguments to create many EntryTags.
     * @example
     * // Create many EntryTags
     * const entryTag = await prisma.entryTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EntryTagCreateManyArgs>(args?: SelectSubset<T, EntryTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EntryTags and returns the data saved in the database.
     * @param {EntryTagCreateManyAndReturnArgs} args - Arguments to create many EntryTags.
     * @example
     * // Create many EntryTags
     * const entryTag = await prisma.entryTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EntryTags and only return the `diaryEntryId`
     * const entryTagWithDiaryEntryIdOnly = await prisma.entryTag.createManyAndReturn({
     *   select: { diaryEntryId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EntryTagCreateManyAndReturnArgs>(args?: SelectSubset<T, EntryTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EntryTag.
     * @param {EntryTagDeleteArgs} args - Arguments to delete one EntryTag.
     * @example
     * // Delete one EntryTag
     * const EntryTag = await prisma.entryTag.delete({
     *   where: {
     *     // ... filter to delete one EntryTag
     *   }
     * })
     * 
     */
    delete<T extends EntryTagDeleteArgs>(args: SelectSubset<T, EntryTagDeleteArgs<ExtArgs>>): Prisma__EntryTagClient<$Result.GetResult<Prisma.$EntryTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EntryTag.
     * @param {EntryTagUpdateArgs} args - Arguments to update one EntryTag.
     * @example
     * // Update one EntryTag
     * const entryTag = await prisma.entryTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EntryTagUpdateArgs>(args: SelectSubset<T, EntryTagUpdateArgs<ExtArgs>>): Prisma__EntryTagClient<$Result.GetResult<Prisma.$EntryTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EntryTags.
     * @param {EntryTagDeleteManyArgs} args - Arguments to filter EntryTags to delete.
     * @example
     * // Delete a few EntryTags
     * const { count } = await prisma.entryTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EntryTagDeleteManyArgs>(args?: SelectSubset<T, EntryTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EntryTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EntryTags
     * const entryTag = await prisma.entryTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EntryTagUpdateManyArgs>(args: SelectSubset<T, EntryTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EntryTags and returns the data updated in the database.
     * @param {EntryTagUpdateManyAndReturnArgs} args - Arguments to update many EntryTags.
     * @example
     * // Update many EntryTags
     * const entryTag = await prisma.entryTag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EntryTags and only return the `diaryEntryId`
     * const entryTagWithDiaryEntryIdOnly = await prisma.entryTag.updateManyAndReturn({
     *   select: { diaryEntryId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EntryTagUpdateManyAndReturnArgs>(args: SelectSubset<T, EntryTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EntryTag.
     * @param {EntryTagUpsertArgs} args - Arguments to update or create a EntryTag.
     * @example
     * // Update or create a EntryTag
     * const entryTag = await prisma.entryTag.upsert({
     *   create: {
     *     // ... data to create a EntryTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EntryTag we want to update
     *   }
     * })
     */
    upsert<T extends EntryTagUpsertArgs>(args: SelectSubset<T, EntryTagUpsertArgs<ExtArgs>>): Prisma__EntryTagClient<$Result.GetResult<Prisma.$EntryTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EntryTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryTagCountArgs} args - Arguments to filter EntryTags to count.
     * @example
     * // Count the number of EntryTags
     * const count = await prisma.entryTag.count({
     *   where: {
     *     // ... the filter for the EntryTags we want to count
     *   }
     * })
    **/
    count<T extends EntryTagCountArgs>(
      args?: Subset<T, EntryTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EntryTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EntryTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EntryTagAggregateArgs>(args: Subset<T, EntryTagAggregateArgs>): Prisma.PrismaPromise<GetEntryTagAggregateType<T>>

    /**
     * Group by EntryTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EntryTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EntryTagGroupByArgs['orderBy'] }
        : { orderBy?: EntryTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EntryTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntryTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EntryTag model
   */
  readonly fields: EntryTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EntryTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EntryTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    entry<T extends DiaryEntryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DiaryEntryDefaultArgs<ExtArgs>>): Prisma__DiaryEntryClient<$Result.GetResult<Prisma.$DiaryEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EntryTag model
   */
  interface EntryTagFieldRefs {
    readonly diaryEntryId: FieldRef<"EntryTag", 'String'>
    readonly tagId: FieldRef<"EntryTag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EntryTag findUnique
   */
  export type EntryTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryTag
     */
    select?: EntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryTag
     */
    omit?: EntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryTagInclude<ExtArgs> | null
    /**
     * Filter, which EntryTag to fetch.
     */
    where: EntryTagWhereUniqueInput
  }

  /**
   * EntryTag findUniqueOrThrow
   */
  export type EntryTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryTag
     */
    select?: EntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryTag
     */
    omit?: EntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryTagInclude<ExtArgs> | null
    /**
     * Filter, which EntryTag to fetch.
     */
    where: EntryTagWhereUniqueInput
  }

  /**
   * EntryTag findFirst
   */
  export type EntryTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryTag
     */
    select?: EntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryTag
     */
    omit?: EntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryTagInclude<ExtArgs> | null
    /**
     * Filter, which EntryTag to fetch.
     */
    where?: EntryTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntryTags to fetch.
     */
    orderBy?: EntryTagOrderByWithRelationInput | EntryTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EntryTags.
     */
    cursor?: EntryTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntryTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntryTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EntryTags.
     */
    distinct?: EntryTagScalarFieldEnum | EntryTagScalarFieldEnum[]
  }

  /**
   * EntryTag findFirstOrThrow
   */
  export type EntryTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryTag
     */
    select?: EntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryTag
     */
    omit?: EntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryTagInclude<ExtArgs> | null
    /**
     * Filter, which EntryTag to fetch.
     */
    where?: EntryTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntryTags to fetch.
     */
    orderBy?: EntryTagOrderByWithRelationInput | EntryTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EntryTags.
     */
    cursor?: EntryTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntryTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntryTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EntryTags.
     */
    distinct?: EntryTagScalarFieldEnum | EntryTagScalarFieldEnum[]
  }

  /**
   * EntryTag findMany
   */
  export type EntryTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryTag
     */
    select?: EntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryTag
     */
    omit?: EntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryTagInclude<ExtArgs> | null
    /**
     * Filter, which EntryTags to fetch.
     */
    where?: EntryTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntryTags to fetch.
     */
    orderBy?: EntryTagOrderByWithRelationInput | EntryTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EntryTags.
     */
    cursor?: EntryTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntryTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntryTags.
     */
    skip?: number
    distinct?: EntryTagScalarFieldEnum | EntryTagScalarFieldEnum[]
  }

  /**
   * EntryTag create
   */
  export type EntryTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryTag
     */
    select?: EntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryTag
     */
    omit?: EntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryTagInclude<ExtArgs> | null
    /**
     * The data needed to create a EntryTag.
     */
    data: XOR<EntryTagCreateInput, EntryTagUncheckedCreateInput>
  }

  /**
   * EntryTag createMany
   */
  export type EntryTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EntryTags.
     */
    data: EntryTagCreateManyInput | EntryTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EntryTag createManyAndReturn
   */
  export type EntryTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryTag
     */
    select?: EntryTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EntryTag
     */
    omit?: EntryTagOmit<ExtArgs> | null
    /**
     * The data used to create many EntryTags.
     */
    data: EntryTagCreateManyInput | EntryTagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EntryTag update
   */
  export type EntryTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryTag
     */
    select?: EntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryTag
     */
    omit?: EntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryTagInclude<ExtArgs> | null
    /**
     * The data needed to update a EntryTag.
     */
    data: XOR<EntryTagUpdateInput, EntryTagUncheckedUpdateInput>
    /**
     * Choose, which EntryTag to update.
     */
    where: EntryTagWhereUniqueInput
  }

  /**
   * EntryTag updateMany
   */
  export type EntryTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EntryTags.
     */
    data: XOR<EntryTagUpdateManyMutationInput, EntryTagUncheckedUpdateManyInput>
    /**
     * Filter which EntryTags to update
     */
    where?: EntryTagWhereInput
    /**
     * Limit how many EntryTags to update.
     */
    limit?: number
  }

  /**
   * EntryTag updateManyAndReturn
   */
  export type EntryTagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryTag
     */
    select?: EntryTagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EntryTag
     */
    omit?: EntryTagOmit<ExtArgs> | null
    /**
     * The data used to update EntryTags.
     */
    data: XOR<EntryTagUpdateManyMutationInput, EntryTagUncheckedUpdateManyInput>
    /**
     * Filter which EntryTags to update
     */
    where?: EntryTagWhereInput
    /**
     * Limit how many EntryTags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryTagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EntryTag upsert
   */
  export type EntryTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryTag
     */
    select?: EntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryTag
     */
    omit?: EntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryTagInclude<ExtArgs> | null
    /**
     * The filter to search for the EntryTag to update in case it exists.
     */
    where: EntryTagWhereUniqueInput
    /**
     * In case the EntryTag found by the `where` argument doesn't exist, create a new EntryTag with this data.
     */
    create: XOR<EntryTagCreateInput, EntryTagUncheckedCreateInput>
    /**
     * In case the EntryTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EntryTagUpdateInput, EntryTagUncheckedUpdateInput>
  }

  /**
   * EntryTag delete
   */
  export type EntryTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryTag
     */
    select?: EntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryTag
     */
    omit?: EntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryTagInclude<ExtArgs> | null
    /**
     * Filter which EntryTag to delete.
     */
    where: EntryTagWhereUniqueInput
  }

  /**
   * EntryTag deleteMany
   */
  export type EntryTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EntryTags to delete
     */
    where?: EntryTagWhereInput
    /**
     * Limit how many EntryTags to delete.
     */
    limit?: number
  }

  /**
   * EntryTag without action
   */
  export type EntryTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryTag
     */
    select?: EntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryTag
     */
    omit?: EntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryTagInclude<ExtArgs> | null
  }


  /**
   * Model MovieGenre
   */

  export type AggregateMovieGenre = {
    _count: MovieGenreCountAggregateOutputType | null
    _min: MovieGenreMinAggregateOutputType | null
    _max: MovieGenreMaxAggregateOutputType | null
  }

  export type MovieGenreMinAggregateOutputType = {
    movieId: string | null
    genreId: string | null
  }

  export type MovieGenreMaxAggregateOutputType = {
    movieId: string | null
    genreId: string | null
  }

  export type MovieGenreCountAggregateOutputType = {
    movieId: number
    genreId: number
    _all: number
  }


  export type MovieGenreMinAggregateInputType = {
    movieId?: true
    genreId?: true
  }

  export type MovieGenreMaxAggregateInputType = {
    movieId?: true
    genreId?: true
  }

  export type MovieGenreCountAggregateInputType = {
    movieId?: true
    genreId?: true
    _all?: true
  }

  export type MovieGenreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MovieGenre to aggregate.
     */
    where?: MovieGenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MovieGenres to fetch.
     */
    orderBy?: MovieGenreOrderByWithRelationInput | MovieGenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MovieGenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MovieGenres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MovieGenres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MovieGenres
    **/
    _count?: true | MovieGenreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MovieGenreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MovieGenreMaxAggregateInputType
  }

  export type GetMovieGenreAggregateType<T extends MovieGenreAggregateArgs> = {
        [P in keyof T & keyof AggregateMovieGenre]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMovieGenre[P]>
      : GetScalarType<T[P], AggregateMovieGenre[P]>
  }




  export type MovieGenreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieGenreWhereInput
    orderBy?: MovieGenreOrderByWithAggregationInput | MovieGenreOrderByWithAggregationInput[]
    by: MovieGenreScalarFieldEnum[] | MovieGenreScalarFieldEnum
    having?: MovieGenreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MovieGenreCountAggregateInputType | true
    _min?: MovieGenreMinAggregateInputType
    _max?: MovieGenreMaxAggregateInputType
  }

  export type MovieGenreGroupByOutputType = {
    movieId: string
    genreId: string
    _count: MovieGenreCountAggregateOutputType | null
    _min: MovieGenreMinAggregateOutputType | null
    _max: MovieGenreMaxAggregateOutputType | null
  }

  type GetMovieGenreGroupByPayload<T extends MovieGenreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MovieGenreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MovieGenreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MovieGenreGroupByOutputType[P]>
            : GetScalarType<T[P], MovieGenreGroupByOutputType[P]>
        }
      >
    >


  export type MovieGenreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    movieId?: boolean
    genreId?: boolean
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    genre?: boolean | GenreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movieGenre"]>

  export type MovieGenreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    movieId?: boolean
    genreId?: boolean
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    genre?: boolean | GenreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movieGenre"]>

  export type MovieGenreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    movieId?: boolean
    genreId?: boolean
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    genre?: boolean | GenreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movieGenre"]>

  export type MovieGenreSelectScalar = {
    movieId?: boolean
    genreId?: boolean
  }

  export type MovieGenreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"movieId" | "genreId", ExtArgs["result"]["movieGenre"]>
  export type MovieGenreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    genre?: boolean | GenreDefaultArgs<ExtArgs>
  }
  export type MovieGenreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    genre?: boolean | GenreDefaultArgs<ExtArgs>
  }
  export type MovieGenreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    genre?: boolean | GenreDefaultArgs<ExtArgs>
  }

  export type $MovieGenrePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MovieGenre"
    objects: {
      movie: Prisma.$MoviePayload<ExtArgs>
      genre: Prisma.$GenrePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      movieId: string
      genreId: string
    }, ExtArgs["result"]["movieGenre"]>
    composites: {}
  }

  type MovieGenreGetPayload<S extends boolean | null | undefined | MovieGenreDefaultArgs> = $Result.GetResult<Prisma.$MovieGenrePayload, S>

  type MovieGenreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MovieGenreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MovieGenreCountAggregateInputType | true
    }

  export interface MovieGenreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MovieGenre'], meta: { name: 'MovieGenre' } }
    /**
     * Find zero or one MovieGenre that matches the filter.
     * @param {MovieGenreFindUniqueArgs} args - Arguments to find a MovieGenre
     * @example
     * // Get one MovieGenre
     * const movieGenre = await prisma.movieGenre.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MovieGenreFindUniqueArgs>(args: SelectSubset<T, MovieGenreFindUniqueArgs<ExtArgs>>): Prisma__MovieGenreClient<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MovieGenre that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MovieGenreFindUniqueOrThrowArgs} args - Arguments to find a MovieGenre
     * @example
     * // Get one MovieGenre
     * const movieGenre = await prisma.movieGenre.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MovieGenreFindUniqueOrThrowArgs>(args: SelectSubset<T, MovieGenreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MovieGenreClient<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MovieGenre that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGenreFindFirstArgs} args - Arguments to find a MovieGenre
     * @example
     * // Get one MovieGenre
     * const movieGenre = await prisma.movieGenre.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MovieGenreFindFirstArgs>(args?: SelectSubset<T, MovieGenreFindFirstArgs<ExtArgs>>): Prisma__MovieGenreClient<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MovieGenre that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGenreFindFirstOrThrowArgs} args - Arguments to find a MovieGenre
     * @example
     * // Get one MovieGenre
     * const movieGenre = await prisma.movieGenre.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MovieGenreFindFirstOrThrowArgs>(args?: SelectSubset<T, MovieGenreFindFirstOrThrowArgs<ExtArgs>>): Prisma__MovieGenreClient<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MovieGenres that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGenreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MovieGenres
     * const movieGenres = await prisma.movieGenre.findMany()
     * 
     * // Get first 10 MovieGenres
     * const movieGenres = await prisma.movieGenre.findMany({ take: 10 })
     * 
     * // Only select the `movieId`
     * const movieGenreWithMovieIdOnly = await prisma.movieGenre.findMany({ select: { movieId: true } })
     * 
     */
    findMany<T extends MovieGenreFindManyArgs>(args?: SelectSubset<T, MovieGenreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MovieGenre.
     * @param {MovieGenreCreateArgs} args - Arguments to create a MovieGenre.
     * @example
     * // Create one MovieGenre
     * const MovieGenre = await prisma.movieGenre.create({
     *   data: {
     *     // ... data to create a MovieGenre
     *   }
     * })
     * 
     */
    create<T extends MovieGenreCreateArgs>(args: SelectSubset<T, MovieGenreCreateArgs<ExtArgs>>): Prisma__MovieGenreClient<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MovieGenres.
     * @param {MovieGenreCreateManyArgs} args - Arguments to create many MovieGenres.
     * @example
     * // Create many MovieGenres
     * const movieGenre = await prisma.movieGenre.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MovieGenreCreateManyArgs>(args?: SelectSubset<T, MovieGenreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MovieGenres and returns the data saved in the database.
     * @param {MovieGenreCreateManyAndReturnArgs} args - Arguments to create many MovieGenres.
     * @example
     * // Create many MovieGenres
     * const movieGenre = await prisma.movieGenre.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MovieGenres and only return the `movieId`
     * const movieGenreWithMovieIdOnly = await prisma.movieGenre.createManyAndReturn({
     *   select: { movieId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MovieGenreCreateManyAndReturnArgs>(args?: SelectSubset<T, MovieGenreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MovieGenre.
     * @param {MovieGenreDeleteArgs} args - Arguments to delete one MovieGenre.
     * @example
     * // Delete one MovieGenre
     * const MovieGenre = await prisma.movieGenre.delete({
     *   where: {
     *     // ... filter to delete one MovieGenre
     *   }
     * })
     * 
     */
    delete<T extends MovieGenreDeleteArgs>(args: SelectSubset<T, MovieGenreDeleteArgs<ExtArgs>>): Prisma__MovieGenreClient<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MovieGenre.
     * @param {MovieGenreUpdateArgs} args - Arguments to update one MovieGenre.
     * @example
     * // Update one MovieGenre
     * const movieGenre = await prisma.movieGenre.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MovieGenreUpdateArgs>(args: SelectSubset<T, MovieGenreUpdateArgs<ExtArgs>>): Prisma__MovieGenreClient<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MovieGenres.
     * @param {MovieGenreDeleteManyArgs} args - Arguments to filter MovieGenres to delete.
     * @example
     * // Delete a few MovieGenres
     * const { count } = await prisma.movieGenre.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MovieGenreDeleteManyArgs>(args?: SelectSubset<T, MovieGenreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MovieGenres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGenreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MovieGenres
     * const movieGenre = await prisma.movieGenre.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MovieGenreUpdateManyArgs>(args: SelectSubset<T, MovieGenreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MovieGenres and returns the data updated in the database.
     * @param {MovieGenreUpdateManyAndReturnArgs} args - Arguments to update many MovieGenres.
     * @example
     * // Update many MovieGenres
     * const movieGenre = await prisma.movieGenre.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MovieGenres and only return the `movieId`
     * const movieGenreWithMovieIdOnly = await prisma.movieGenre.updateManyAndReturn({
     *   select: { movieId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MovieGenreUpdateManyAndReturnArgs>(args: SelectSubset<T, MovieGenreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MovieGenre.
     * @param {MovieGenreUpsertArgs} args - Arguments to update or create a MovieGenre.
     * @example
     * // Update or create a MovieGenre
     * const movieGenre = await prisma.movieGenre.upsert({
     *   create: {
     *     // ... data to create a MovieGenre
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MovieGenre we want to update
     *   }
     * })
     */
    upsert<T extends MovieGenreUpsertArgs>(args: SelectSubset<T, MovieGenreUpsertArgs<ExtArgs>>): Prisma__MovieGenreClient<$Result.GetResult<Prisma.$MovieGenrePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MovieGenres.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGenreCountArgs} args - Arguments to filter MovieGenres to count.
     * @example
     * // Count the number of MovieGenres
     * const count = await prisma.movieGenre.count({
     *   where: {
     *     // ... the filter for the MovieGenres we want to count
     *   }
     * })
    **/
    count<T extends MovieGenreCountArgs>(
      args?: Subset<T, MovieGenreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MovieGenreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MovieGenre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGenreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MovieGenreAggregateArgs>(args: Subset<T, MovieGenreAggregateArgs>): Prisma.PrismaPromise<GetMovieGenreAggregateType<T>>

    /**
     * Group by MovieGenre.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieGenreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MovieGenreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MovieGenreGroupByArgs['orderBy'] }
        : { orderBy?: MovieGenreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MovieGenreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMovieGenreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MovieGenre model
   */
  readonly fields: MovieGenreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MovieGenre.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MovieGenreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    movie<T extends MovieDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MovieDefaultArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    genre<T extends GenreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GenreDefaultArgs<ExtArgs>>): Prisma__GenreClient<$Result.GetResult<Prisma.$GenrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MovieGenre model
   */
  interface MovieGenreFieldRefs {
    readonly movieId: FieldRef<"MovieGenre", 'String'>
    readonly genreId: FieldRef<"MovieGenre", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MovieGenre findUnique
   */
  export type MovieGenreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    /**
     * Filter, which MovieGenre to fetch.
     */
    where: MovieGenreWhereUniqueInput
  }

  /**
   * MovieGenre findUniqueOrThrow
   */
  export type MovieGenreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    /**
     * Filter, which MovieGenre to fetch.
     */
    where: MovieGenreWhereUniqueInput
  }

  /**
   * MovieGenre findFirst
   */
  export type MovieGenreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    /**
     * Filter, which MovieGenre to fetch.
     */
    where?: MovieGenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MovieGenres to fetch.
     */
    orderBy?: MovieGenreOrderByWithRelationInput | MovieGenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MovieGenres.
     */
    cursor?: MovieGenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MovieGenres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MovieGenres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MovieGenres.
     */
    distinct?: MovieGenreScalarFieldEnum | MovieGenreScalarFieldEnum[]
  }

  /**
   * MovieGenre findFirstOrThrow
   */
  export type MovieGenreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    /**
     * Filter, which MovieGenre to fetch.
     */
    where?: MovieGenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MovieGenres to fetch.
     */
    orderBy?: MovieGenreOrderByWithRelationInput | MovieGenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MovieGenres.
     */
    cursor?: MovieGenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MovieGenres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MovieGenres.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MovieGenres.
     */
    distinct?: MovieGenreScalarFieldEnum | MovieGenreScalarFieldEnum[]
  }

  /**
   * MovieGenre findMany
   */
  export type MovieGenreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    /**
     * Filter, which MovieGenres to fetch.
     */
    where?: MovieGenreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MovieGenres to fetch.
     */
    orderBy?: MovieGenreOrderByWithRelationInput | MovieGenreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MovieGenres.
     */
    cursor?: MovieGenreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MovieGenres from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MovieGenres.
     */
    skip?: number
    distinct?: MovieGenreScalarFieldEnum | MovieGenreScalarFieldEnum[]
  }

  /**
   * MovieGenre create
   */
  export type MovieGenreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    /**
     * The data needed to create a MovieGenre.
     */
    data: XOR<MovieGenreCreateInput, MovieGenreUncheckedCreateInput>
  }

  /**
   * MovieGenre createMany
   */
  export type MovieGenreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MovieGenres.
     */
    data: MovieGenreCreateManyInput | MovieGenreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MovieGenre createManyAndReturn
   */
  export type MovieGenreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * The data used to create many MovieGenres.
     */
    data: MovieGenreCreateManyInput | MovieGenreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MovieGenre update
   */
  export type MovieGenreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    /**
     * The data needed to update a MovieGenre.
     */
    data: XOR<MovieGenreUpdateInput, MovieGenreUncheckedUpdateInput>
    /**
     * Choose, which MovieGenre to update.
     */
    where: MovieGenreWhereUniqueInput
  }

  /**
   * MovieGenre updateMany
   */
  export type MovieGenreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MovieGenres.
     */
    data: XOR<MovieGenreUpdateManyMutationInput, MovieGenreUncheckedUpdateManyInput>
    /**
     * Filter which MovieGenres to update
     */
    where?: MovieGenreWhereInput
    /**
     * Limit how many MovieGenres to update.
     */
    limit?: number
  }

  /**
   * MovieGenre updateManyAndReturn
   */
  export type MovieGenreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * The data used to update MovieGenres.
     */
    data: XOR<MovieGenreUpdateManyMutationInput, MovieGenreUncheckedUpdateManyInput>
    /**
     * Filter which MovieGenres to update
     */
    where?: MovieGenreWhereInput
    /**
     * Limit how many MovieGenres to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MovieGenre upsert
   */
  export type MovieGenreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    /**
     * The filter to search for the MovieGenre to update in case it exists.
     */
    where: MovieGenreWhereUniqueInput
    /**
     * In case the MovieGenre found by the `where` argument doesn't exist, create a new MovieGenre with this data.
     */
    create: XOR<MovieGenreCreateInput, MovieGenreUncheckedCreateInput>
    /**
     * In case the MovieGenre was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MovieGenreUpdateInput, MovieGenreUncheckedUpdateInput>
  }

  /**
   * MovieGenre delete
   */
  export type MovieGenreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
    /**
     * Filter which MovieGenre to delete.
     */
    where: MovieGenreWhereUniqueInput
  }

  /**
   * MovieGenre deleteMany
   */
  export type MovieGenreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MovieGenres to delete
     */
    where?: MovieGenreWhereInput
    /**
     * Limit how many MovieGenres to delete.
     */
    limit?: number
  }

  /**
   * MovieGenre without action
   */
  export type MovieGenreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieGenre
     */
    select?: MovieGenreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieGenre
     */
    omit?: MovieGenreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieGenreInclude<ExtArgs> | null
  }


  /**
   * Model MovieDirector
   */

  export type AggregateMovieDirector = {
    _count: MovieDirectorCountAggregateOutputType | null
    _min: MovieDirectorMinAggregateOutputType | null
    _max: MovieDirectorMaxAggregateOutputType | null
  }

  export type MovieDirectorMinAggregateOutputType = {
    movieId: string | null
    directorId: string | null
  }

  export type MovieDirectorMaxAggregateOutputType = {
    movieId: string | null
    directorId: string | null
  }

  export type MovieDirectorCountAggregateOutputType = {
    movieId: number
    directorId: number
    _all: number
  }


  export type MovieDirectorMinAggregateInputType = {
    movieId?: true
    directorId?: true
  }

  export type MovieDirectorMaxAggregateInputType = {
    movieId?: true
    directorId?: true
  }

  export type MovieDirectorCountAggregateInputType = {
    movieId?: true
    directorId?: true
    _all?: true
  }

  export type MovieDirectorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MovieDirector to aggregate.
     */
    where?: MovieDirectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MovieDirectors to fetch.
     */
    orderBy?: MovieDirectorOrderByWithRelationInput | MovieDirectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MovieDirectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MovieDirectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MovieDirectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MovieDirectors
    **/
    _count?: true | MovieDirectorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MovieDirectorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MovieDirectorMaxAggregateInputType
  }

  export type GetMovieDirectorAggregateType<T extends MovieDirectorAggregateArgs> = {
        [P in keyof T & keyof AggregateMovieDirector]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMovieDirector[P]>
      : GetScalarType<T[P], AggregateMovieDirector[P]>
  }




  export type MovieDirectorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovieDirectorWhereInput
    orderBy?: MovieDirectorOrderByWithAggregationInput | MovieDirectorOrderByWithAggregationInput[]
    by: MovieDirectorScalarFieldEnum[] | MovieDirectorScalarFieldEnum
    having?: MovieDirectorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MovieDirectorCountAggregateInputType | true
    _min?: MovieDirectorMinAggregateInputType
    _max?: MovieDirectorMaxAggregateInputType
  }

  export type MovieDirectorGroupByOutputType = {
    movieId: string
    directorId: string
    _count: MovieDirectorCountAggregateOutputType | null
    _min: MovieDirectorMinAggregateOutputType | null
    _max: MovieDirectorMaxAggregateOutputType | null
  }

  type GetMovieDirectorGroupByPayload<T extends MovieDirectorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MovieDirectorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MovieDirectorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MovieDirectorGroupByOutputType[P]>
            : GetScalarType<T[P], MovieDirectorGroupByOutputType[P]>
        }
      >
    >


  export type MovieDirectorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    movieId?: boolean
    directorId?: boolean
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    director?: boolean | DirectorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movieDirector"]>

  export type MovieDirectorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    movieId?: boolean
    directorId?: boolean
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    director?: boolean | DirectorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movieDirector"]>

  export type MovieDirectorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    movieId?: boolean
    directorId?: boolean
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    director?: boolean | DirectorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["movieDirector"]>

  export type MovieDirectorSelectScalar = {
    movieId?: boolean
    directorId?: boolean
  }

  export type MovieDirectorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"movieId" | "directorId", ExtArgs["result"]["movieDirector"]>
  export type MovieDirectorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    director?: boolean | DirectorDefaultArgs<ExtArgs>
  }
  export type MovieDirectorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    director?: boolean | DirectorDefaultArgs<ExtArgs>
  }
  export type MovieDirectorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movie?: boolean | MovieDefaultArgs<ExtArgs>
    director?: boolean | DirectorDefaultArgs<ExtArgs>
  }

  export type $MovieDirectorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MovieDirector"
    objects: {
      movie: Prisma.$MoviePayload<ExtArgs>
      director: Prisma.$DirectorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      movieId: string
      directorId: string
    }, ExtArgs["result"]["movieDirector"]>
    composites: {}
  }

  type MovieDirectorGetPayload<S extends boolean | null | undefined | MovieDirectorDefaultArgs> = $Result.GetResult<Prisma.$MovieDirectorPayload, S>

  type MovieDirectorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MovieDirectorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MovieDirectorCountAggregateInputType | true
    }

  export interface MovieDirectorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MovieDirector'], meta: { name: 'MovieDirector' } }
    /**
     * Find zero or one MovieDirector that matches the filter.
     * @param {MovieDirectorFindUniqueArgs} args - Arguments to find a MovieDirector
     * @example
     * // Get one MovieDirector
     * const movieDirector = await prisma.movieDirector.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MovieDirectorFindUniqueArgs>(args: SelectSubset<T, MovieDirectorFindUniqueArgs<ExtArgs>>): Prisma__MovieDirectorClient<$Result.GetResult<Prisma.$MovieDirectorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MovieDirector that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MovieDirectorFindUniqueOrThrowArgs} args - Arguments to find a MovieDirector
     * @example
     * // Get one MovieDirector
     * const movieDirector = await prisma.movieDirector.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MovieDirectorFindUniqueOrThrowArgs>(args: SelectSubset<T, MovieDirectorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MovieDirectorClient<$Result.GetResult<Prisma.$MovieDirectorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MovieDirector that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieDirectorFindFirstArgs} args - Arguments to find a MovieDirector
     * @example
     * // Get one MovieDirector
     * const movieDirector = await prisma.movieDirector.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MovieDirectorFindFirstArgs>(args?: SelectSubset<T, MovieDirectorFindFirstArgs<ExtArgs>>): Prisma__MovieDirectorClient<$Result.GetResult<Prisma.$MovieDirectorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MovieDirector that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieDirectorFindFirstOrThrowArgs} args - Arguments to find a MovieDirector
     * @example
     * // Get one MovieDirector
     * const movieDirector = await prisma.movieDirector.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MovieDirectorFindFirstOrThrowArgs>(args?: SelectSubset<T, MovieDirectorFindFirstOrThrowArgs<ExtArgs>>): Prisma__MovieDirectorClient<$Result.GetResult<Prisma.$MovieDirectorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MovieDirectors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieDirectorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MovieDirectors
     * const movieDirectors = await prisma.movieDirector.findMany()
     * 
     * // Get first 10 MovieDirectors
     * const movieDirectors = await prisma.movieDirector.findMany({ take: 10 })
     * 
     * // Only select the `movieId`
     * const movieDirectorWithMovieIdOnly = await prisma.movieDirector.findMany({ select: { movieId: true } })
     * 
     */
    findMany<T extends MovieDirectorFindManyArgs>(args?: SelectSubset<T, MovieDirectorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovieDirectorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MovieDirector.
     * @param {MovieDirectorCreateArgs} args - Arguments to create a MovieDirector.
     * @example
     * // Create one MovieDirector
     * const MovieDirector = await prisma.movieDirector.create({
     *   data: {
     *     // ... data to create a MovieDirector
     *   }
     * })
     * 
     */
    create<T extends MovieDirectorCreateArgs>(args: SelectSubset<T, MovieDirectorCreateArgs<ExtArgs>>): Prisma__MovieDirectorClient<$Result.GetResult<Prisma.$MovieDirectorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MovieDirectors.
     * @param {MovieDirectorCreateManyArgs} args - Arguments to create many MovieDirectors.
     * @example
     * // Create many MovieDirectors
     * const movieDirector = await prisma.movieDirector.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MovieDirectorCreateManyArgs>(args?: SelectSubset<T, MovieDirectorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MovieDirectors and returns the data saved in the database.
     * @param {MovieDirectorCreateManyAndReturnArgs} args - Arguments to create many MovieDirectors.
     * @example
     * // Create many MovieDirectors
     * const movieDirector = await prisma.movieDirector.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MovieDirectors and only return the `movieId`
     * const movieDirectorWithMovieIdOnly = await prisma.movieDirector.createManyAndReturn({
     *   select: { movieId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MovieDirectorCreateManyAndReturnArgs>(args?: SelectSubset<T, MovieDirectorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovieDirectorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MovieDirector.
     * @param {MovieDirectorDeleteArgs} args - Arguments to delete one MovieDirector.
     * @example
     * // Delete one MovieDirector
     * const MovieDirector = await prisma.movieDirector.delete({
     *   where: {
     *     // ... filter to delete one MovieDirector
     *   }
     * })
     * 
     */
    delete<T extends MovieDirectorDeleteArgs>(args: SelectSubset<T, MovieDirectorDeleteArgs<ExtArgs>>): Prisma__MovieDirectorClient<$Result.GetResult<Prisma.$MovieDirectorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MovieDirector.
     * @param {MovieDirectorUpdateArgs} args - Arguments to update one MovieDirector.
     * @example
     * // Update one MovieDirector
     * const movieDirector = await prisma.movieDirector.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MovieDirectorUpdateArgs>(args: SelectSubset<T, MovieDirectorUpdateArgs<ExtArgs>>): Prisma__MovieDirectorClient<$Result.GetResult<Prisma.$MovieDirectorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MovieDirectors.
     * @param {MovieDirectorDeleteManyArgs} args - Arguments to filter MovieDirectors to delete.
     * @example
     * // Delete a few MovieDirectors
     * const { count } = await prisma.movieDirector.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MovieDirectorDeleteManyArgs>(args?: SelectSubset<T, MovieDirectorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MovieDirectors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieDirectorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MovieDirectors
     * const movieDirector = await prisma.movieDirector.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MovieDirectorUpdateManyArgs>(args: SelectSubset<T, MovieDirectorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MovieDirectors and returns the data updated in the database.
     * @param {MovieDirectorUpdateManyAndReturnArgs} args - Arguments to update many MovieDirectors.
     * @example
     * // Update many MovieDirectors
     * const movieDirector = await prisma.movieDirector.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MovieDirectors and only return the `movieId`
     * const movieDirectorWithMovieIdOnly = await prisma.movieDirector.updateManyAndReturn({
     *   select: { movieId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MovieDirectorUpdateManyAndReturnArgs>(args: SelectSubset<T, MovieDirectorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovieDirectorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MovieDirector.
     * @param {MovieDirectorUpsertArgs} args - Arguments to update or create a MovieDirector.
     * @example
     * // Update or create a MovieDirector
     * const movieDirector = await prisma.movieDirector.upsert({
     *   create: {
     *     // ... data to create a MovieDirector
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MovieDirector we want to update
     *   }
     * })
     */
    upsert<T extends MovieDirectorUpsertArgs>(args: SelectSubset<T, MovieDirectorUpsertArgs<ExtArgs>>): Prisma__MovieDirectorClient<$Result.GetResult<Prisma.$MovieDirectorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MovieDirectors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieDirectorCountArgs} args - Arguments to filter MovieDirectors to count.
     * @example
     * // Count the number of MovieDirectors
     * const count = await prisma.movieDirector.count({
     *   where: {
     *     // ... the filter for the MovieDirectors we want to count
     *   }
     * })
    **/
    count<T extends MovieDirectorCountArgs>(
      args?: Subset<T, MovieDirectorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MovieDirectorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MovieDirector.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieDirectorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MovieDirectorAggregateArgs>(args: Subset<T, MovieDirectorAggregateArgs>): Prisma.PrismaPromise<GetMovieDirectorAggregateType<T>>

    /**
     * Group by MovieDirector.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovieDirectorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MovieDirectorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MovieDirectorGroupByArgs['orderBy'] }
        : { orderBy?: MovieDirectorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MovieDirectorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMovieDirectorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MovieDirector model
   */
  readonly fields: MovieDirectorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MovieDirector.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MovieDirectorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    movie<T extends MovieDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MovieDefaultArgs<ExtArgs>>): Prisma__MovieClient<$Result.GetResult<Prisma.$MoviePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    director<T extends DirectorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DirectorDefaultArgs<ExtArgs>>): Prisma__DirectorClient<$Result.GetResult<Prisma.$DirectorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MovieDirector model
   */
  interface MovieDirectorFieldRefs {
    readonly movieId: FieldRef<"MovieDirector", 'String'>
    readonly directorId: FieldRef<"MovieDirector", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MovieDirector findUnique
   */
  export type MovieDirectorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieDirector
     */
    select?: MovieDirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieDirector
     */
    omit?: MovieDirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieDirectorInclude<ExtArgs> | null
    /**
     * Filter, which MovieDirector to fetch.
     */
    where: MovieDirectorWhereUniqueInput
  }

  /**
   * MovieDirector findUniqueOrThrow
   */
  export type MovieDirectorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieDirector
     */
    select?: MovieDirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieDirector
     */
    omit?: MovieDirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieDirectorInclude<ExtArgs> | null
    /**
     * Filter, which MovieDirector to fetch.
     */
    where: MovieDirectorWhereUniqueInput
  }

  /**
   * MovieDirector findFirst
   */
  export type MovieDirectorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieDirector
     */
    select?: MovieDirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieDirector
     */
    omit?: MovieDirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieDirectorInclude<ExtArgs> | null
    /**
     * Filter, which MovieDirector to fetch.
     */
    where?: MovieDirectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MovieDirectors to fetch.
     */
    orderBy?: MovieDirectorOrderByWithRelationInput | MovieDirectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MovieDirectors.
     */
    cursor?: MovieDirectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MovieDirectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MovieDirectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MovieDirectors.
     */
    distinct?: MovieDirectorScalarFieldEnum | MovieDirectorScalarFieldEnum[]
  }

  /**
   * MovieDirector findFirstOrThrow
   */
  export type MovieDirectorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieDirector
     */
    select?: MovieDirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieDirector
     */
    omit?: MovieDirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieDirectorInclude<ExtArgs> | null
    /**
     * Filter, which MovieDirector to fetch.
     */
    where?: MovieDirectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MovieDirectors to fetch.
     */
    orderBy?: MovieDirectorOrderByWithRelationInput | MovieDirectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MovieDirectors.
     */
    cursor?: MovieDirectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MovieDirectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MovieDirectors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MovieDirectors.
     */
    distinct?: MovieDirectorScalarFieldEnum | MovieDirectorScalarFieldEnum[]
  }

  /**
   * MovieDirector findMany
   */
  export type MovieDirectorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieDirector
     */
    select?: MovieDirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieDirector
     */
    omit?: MovieDirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieDirectorInclude<ExtArgs> | null
    /**
     * Filter, which MovieDirectors to fetch.
     */
    where?: MovieDirectorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MovieDirectors to fetch.
     */
    orderBy?: MovieDirectorOrderByWithRelationInput | MovieDirectorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MovieDirectors.
     */
    cursor?: MovieDirectorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MovieDirectors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MovieDirectors.
     */
    skip?: number
    distinct?: MovieDirectorScalarFieldEnum | MovieDirectorScalarFieldEnum[]
  }

  /**
   * MovieDirector create
   */
  export type MovieDirectorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieDirector
     */
    select?: MovieDirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieDirector
     */
    omit?: MovieDirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieDirectorInclude<ExtArgs> | null
    /**
     * The data needed to create a MovieDirector.
     */
    data: XOR<MovieDirectorCreateInput, MovieDirectorUncheckedCreateInput>
  }

  /**
   * MovieDirector createMany
   */
  export type MovieDirectorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MovieDirectors.
     */
    data: MovieDirectorCreateManyInput | MovieDirectorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MovieDirector createManyAndReturn
   */
  export type MovieDirectorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieDirector
     */
    select?: MovieDirectorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MovieDirector
     */
    omit?: MovieDirectorOmit<ExtArgs> | null
    /**
     * The data used to create many MovieDirectors.
     */
    data: MovieDirectorCreateManyInput | MovieDirectorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieDirectorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MovieDirector update
   */
  export type MovieDirectorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieDirector
     */
    select?: MovieDirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieDirector
     */
    omit?: MovieDirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieDirectorInclude<ExtArgs> | null
    /**
     * The data needed to update a MovieDirector.
     */
    data: XOR<MovieDirectorUpdateInput, MovieDirectorUncheckedUpdateInput>
    /**
     * Choose, which MovieDirector to update.
     */
    where: MovieDirectorWhereUniqueInput
  }

  /**
   * MovieDirector updateMany
   */
  export type MovieDirectorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MovieDirectors.
     */
    data: XOR<MovieDirectorUpdateManyMutationInput, MovieDirectorUncheckedUpdateManyInput>
    /**
     * Filter which MovieDirectors to update
     */
    where?: MovieDirectorWhereInput
    /**
     * Limit how many MovieDirectors to update.
     */
    limit?: number
  }

  /**
   * MovieDirector updateManyAndReturn
   */
  export type MovieDirectorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieDirector
     */
    select?: MovieDirectorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MovieDirector
     */
    omit?: MovieDirectorOmit<ExtArgs> | null
    /**
     * The data used to update MovieDirectors.
     */
    data: XOR<MovieDirectorUpdateManyMutationInput, MovieDirectorUncheckedUpdateManyInput>
    /**
     * Filter which MovieDirectors to update
     */
    where?: MovieDirectorWhereInput
    /**
     * Limit how many MovieDirectors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieDirectorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MovieDirector upsert
   */
  export type MovieDirectorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieDirector
     */
    select?: MovieDirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieDirector
     */
    omit?: MovieDirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieDirectorInclude<ExtArgs> | null
    /**
     * The filter to search for the MovieDirector to update in case it exists.
     */
    where: MovieDirectorWhereUniqueInput
    /**
     * In case the MovieDirector found by the `where` argument doesn't exist, create a new MovieDirector with this data.
     */
    create: XOR<MovieDirectorCreateInput, MovieDirectorUncheckedCreateInput>
    /**
     * In case the MovieDirector was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MovieDirectorUpdateInput, MovieDirectorUncheckedUpdateInput>
  }

  /**
   * MovieDirector delete
   */
  export type MovieDirectorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieDirector
     */
    select?: MovieDirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieDirector
     */
    omit?: MovieDirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieDirectorInclude<ExtArgs> | null
    /**
     * Filter which MovieDirector to delete.
     */
    where: MovieDirectorWhereUniqueInput
  }

  /**
   * MovieDirector deleteMany
   */
  export type MovieDirectorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MovieDirectors to delete
     */
    where?: MovieDirectorWhereInput
    /**
     * Limit how many MovieDirectors to delete.
     */
    limit?: number
  }

  /**
   * MovieDirector without action
   */
  export type MovieDirectorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MovieDirector
     */
    select?: MovieDirectorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MovieDirector
     */
    omit?: MovieDirectorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovieDirectorInclude<ExtArgs> | null
  }


  /**
   * Model UserFollow
   */

  export type AggregateUserFollow = {
    _count: UserFollowCountAggregateOutputType | null
    _min: UserFollowMinAggregateOutputType | null
    _max: UserFollowMaxAggregateOutputType | null
  }

  export type UserFollowMinAggregateOutputType = {
    followerId: string | null
    followeeId: string | null
  }

  export type UserFollowMaxAggregateOutputType = {
    followerId: string | null
    followeeId: string | null
  }

  export type UserFollowCountAggregateOutputType = {
    followerId: number
    followeeId: number
    _all: number
  }


  export type UserFollowMinAggregateInputType = {
    followerId?: true
    followeeId?: true
  }

  export type UserFollowMaxAggregateInputType = {
    followerId?: true
    followeeId?: true
  }

  export type UserFollowCountAggregateInputType = {
    followerId?: true
    followeeId?: true
    _all?: true
  }

  export type UserFollowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserFollow to aggregate.
     */
    where?: UserFollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserFollows to fetch.
     */
    orderBy?: UserFollowOrderByWithRelationInput | UserFollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserFollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserFollows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserFollows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserFollows
    **/
    _count?: true | UserFollowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserFollowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserFollowMaxAggregateInputType
  }

  export type GetUserFollowAggregateType<T extends UserFollowAggregateArgs> = {
        [P in keyof T & keyof AggregateUserFollow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserFollow[P]>
      : GetScalarType<T[P], AggregateUserFollow[P]>
  }




  export type UserFollowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserFollowWhereInput
    orderBy?: UserFollowOrderByWithAggregationInput | UserFollowOrderByWithAggregationInput[]
    by: UserFollowScalarFieldEnum[] | UserFollowScalarFieldEnum
    having?: UserFollowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserFollowCountAggregateInputType | true
    _min?: UserFollowMinAggregateInputType
    _max?: UserFollowMaxAggregateInputType
  }

  export type UserFollowGroupByOutputType = {
    followerId: string
    followeeId: string
    _count: UserFollowCountAggregateOutputType | null
    _min: UserFollowMinAggregateOutputType | null
    _max: UserFollowMaxAggregateOutputType | null
  }

  type GetUserFollowGroupByPayload<T extends UserFollowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserFollowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserFollowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserFollowGroupByOutputType[P]>
            : GetScalarType<T[P], UserFollowGroupByOutputType[P]>
        }
      >
    >


  export type UserFollowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    followerId?: boolean
    followeeId?: boolean
    follower?: boolean | UserDefaultArgs<ExtArgs>
    followee?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userFollow"]>

  export type UserFollowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    followerId?: boolean
    followeeId?: boolean
    follower?: boolean | UserDefaultArgs<ExtArgs>
    followee?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userFollow"]>

  export type UserFollowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    followerId?: boolean
    followeeId?: boolean
    follower?: boolean | UserDefaultArgs<ExtArgs>
    followee?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userFollow"]>

  export type UserFollowSelectScalar = {
    followerId?: boolean
    followeeId?: boolean
  }

  export type UserFollowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"followerId" | "followeeId", ExtArgs["result"]["userFollow"]>
  export type UserFollowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    follower?: boolean | UserDefaultArgs<ExtArgs>
    followee?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserFollowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    follower?: boolean | UserDefaultArgs<ExtArgs>
    followee?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserFollowIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    follower?: boolean | UserDefaultArgs<ExtArgs>
    followee?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserFollowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserFollow"
    objects: {
      follower: Prisma.$UserPayload<ExtArgs>
      followee: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      followerId: string
      followeeId: string
    }, ExtArgs["result"]["userFollow"]>
    composites: {}
  }

  type UserFollowGetPayload<S extends boolean | null | undefined | UserFollowDefaultArgs> = $Result.GetResult<Prisma.$UserFollowPayload, S>

  type UserFollowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFollowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserFollowCountAggregateInputType | true
    }

  export interface UserFollowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserFollow'], meta: { name: 'UserFollow' } }
    /**
     * Find zero or one UserFollow that matches the filter.
     * @param {UserFollowFindUniqueArgs} args - Arguments to find a UserFollow
     * @example
     * // Get one UserFollow
     * const userFollow = await prisma.userFollow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFollowFindUniqueArgs>(args: SelectSubset<T, UserFollowFindUniqueArgs<ExtArgs>>): Prisma__UserFollowClient<$Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserFollow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFollowFindUniqueOrThrowArgs} args - Arguments to find a UserFollow
     * @example
     * // Get one UserFollow
     * const userFollow = await prisma.userFollow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFollowFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFollowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserFollowClient<$Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserFollow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFollowFindFirstArgs} args - Arguments to find a UserFollow
     * @example
     * // Get one UserFollow
     * const userFollow = await prisma.userFollow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFollowFindFirstArgs>(args?: SelectSubset<T, UserFollowFindFirstArgs<ExtArgs>>): Prisma__UserFollowClient<$Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserFollow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFollowFindFirstOrThrowArgs} args - Arguments to find a UserFollow
     * @example
     * // Get one UserFollow
     * const userFollow = await prisma.userFollow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFollowFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFollowFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserFollowClient<$Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserFollows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFollowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserFollows
     * const userFollows = await prisma.userFollow.findMany()
     * 
     * // Get first 10 UserFollows
     * const userFollows = await prisma.userFollow.findMany({ take: 10 })
     * 
     * // Only select the `followerId`
     * const userFollowWithFollowerIdOnly = await prisma.userFollow.findMany({ select: { followerId: true } })
     * 
     */
    findMany<T extends UserFollowFindManyArgs>(args?: SelectSubset<T, UserFollowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserFollow.
     * @param {UserFollowCreateArgs} args - Arguments to create a UserFollow.
     * @example
     * // Create one UserFollow
     * const UserFollow = await prisma.userFollow.create({
     *   data: {
     *     // ... data to create a UserFollow
     *   }
     * })
     * 
     */
    create<T extends UserFollowCreateArgs>(args: SelectSubset<T, UserFollowCreateArgs<ExtArgs>>): Prisma__UserFollowClient<$Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserFollows.
     * @param {UserFollowCreateManyArgs} args - Arguments to create many UserFollows.
     * @example
     * // Create many UserFollows
     * const userFollow = await prisma.userFollow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserFollowCreateManyArgs>(args?: SelectSubset<T, UserFollowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserFollows and returns the data saved in the database.
     * @param {UserFollowCreateManyAndReturnArgs} args - Arguments to create many UserFollows.
     * @example
     * // Create many UserFollows
     * const userFollow = await prisma.userFollow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserFollows and only return the `followerId`
     * const userFollowWithFollowerIdOnly = await prisma.userFollow.createManyAndReturn({
     *   select: { followerId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserFollowCreateManyAndReturnArgs>(args?: SelectSubset<T, UserFollowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserFollow.
     * @param {UserFollowDeleteArgs} args - Arguments to delete one UserFollow.
     * @example
     * // Delete one UserFollow
     * const UserFollow = await prisma.userFollow.delete({
     *   where: {
     *     // ... filter to delete one UserFollow
     *   }
     * })
     * 
     */
    delete<T extends UserFollowDeleteArgs>(args: SelectSubset<T, UserFollowDeleteArgs<ExtArgs>>): Prisma__UserFollowClient<$Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserFollow.
     * @param {UserFollowUpdateArgs} args - Arguments to update one UserFollow.
     * @example
     * // Update one UserFollow
     * const userFollow = await prisma.userFollow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserFollowUpdateArgs>(args: SelectSubset<T, UserFollowUpdateArgs<ExtArgs>>): Prisma__UserFollowClient<$Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserFollows.
     * @param {UserFollowDeleteManyArgs} args - Arguments to filter UserFollows to delete.
     * @example
     * // Delete a few UserFollows
     * const { count } = await prisma.userFollow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserFollowDeleteManyArgs>(args?: SelectSubset<T, UserFollowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserFollows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFollowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserFollows
     * const userFollow = await prisma.userFollow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserFollowUpdateManyArgs>(args: SelectSubset<T, UserFollowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserFollows and returns the data updated in the database.
     * @param {UserFollowUpdateManyAndReturnArgs} args - Arguments to update many UserFollows.
     * @example
     * // Update many UserFollows
     * const userFollow = await prisma.userFollow.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserFollows and only return the `followerId`
     * const userFollowWithFollowerIdOnly = await prisma.userFollow.updateManyAndReturn({
     *   select: { followerId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserFollowUpdateManyAndReturnArgs>(args: SelectSubset<T, UserFollowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserFollow.
     * @param {UserFollowUpsertArgs} args - Arguments to update or create a UserFollow.
     * @example
     * // Update or create a UserFollow
     * const userFollow = await prisma.userFollow.upsert({
     *   create: {
     *     // ... data to create a UserFollow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserFollow we want to update
     *   }
     * })
     */
    upsert<T extends UserFollowUpsertArgs>(args: SelectSubset<T, UserFollowUpsertArgs<ExtArgs>>): Prisma__UserFollowClient<$Result.GetResult<Prisma.$UserFollowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserFollows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFollowCountArgs} args - Arguments to filter UserFollows to count.
     * @example
     * // Count the number of UserFollows
     * const count = await prisma.userFollow.count({
     *   where: {
     *     // ... the filter for the UserFollows we want to count
     *   }
     * })
    **/
    count<T extends UserFollowCountArgs>(
      args?: Subset<T, UserFollowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserFollowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserFollow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFollowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserFollowAggregateArgs>(args: Subset<T, UserFollowAggregateArgs>): Prisma.PrismaPromise<GetUserFollowAggregateType<T>>

    /**
     * Group by UserFollow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFollowGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserFollowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserFollowGroupByArgs['orderBy'] }
        : { orderBy?: UserFollowGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserFollowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserFollowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserFollow model
   */
  readonly fields: UserFollowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserFollow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserFollowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    follower<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    followee<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserFollow model
   */
  interface UserFollowFieldRefs {
    readonly followerId: FieldRef<"UserFollow", 'String'>
    readonly followeeId: FieldRef<"UserFollow", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserFollow findUnique
   */
  export type UserFollowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFollow
     */
    select?: UserFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFollow
     */
    omit?: UserFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFollowInclude<ExtArgs> | null
    /**
     * Filter, which UserFollow to fetch.
     */
    where: UserFollowWhereUniqueInput
  }

  /**
   * UserFollow findUniqueOrThrow
   */
  export type UserFollowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFollow
     */
    select?: UserFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFollow
     */
    omit?: UserFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFollowInclude<ExtArgs> | null
    /**
     * Filter, which UserFollow to fetch.
     */
    where: UserFollowWhereUniqueInput
  }

  /**
   * UserFollow findFirst
   */
  export type UserFollowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFollow
     */
    select?: UserFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFollow
     */
    omit?: UserFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFollowInclude<ExtArgs> | null
    /**
     * Filter, which UserFollow to fetch.
     */
    where?: UserFollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserFollows to fetch.
     */
    orderBy?: UserFollowOrderByWithRelationInput | UserFollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserFollows.
     */
    cursor?: UserFollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserFollows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserFollows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserFollows.
     */
    distinct?: UserFollowScalarFieldEnum | UserFollowScalarFieldEnum[]
  }

  /**
   * UserFollow findFirstOrThrow
   */
  export type UserFollowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFollow
     */
    select?: UserFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFollow
     */
    omit?: UserFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFollowInclude<ExtArgs> | null
    /**
     * Filter, which UserFollow to fetch.
     */
    where?: UserFollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserFollows to fetch.
     */
    orderBy?: UserFollowOrderByWithRelationInput | UserFollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserFollows.
     */
    cursor?: UserFollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserFollows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserFollows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserFollows.
     */
    distinct?: UserFollowScalarFieldEnum | UserFollowScalarFieldEnum[]
  }

  /**
   * UserFollow findMany
   */
  export type UserFollowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFollow
     */
    select?: UserFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFollow
     */
    omit?: UserFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFollowInclude<ExtArgs> | null
    /**
     * Filter, which UserFollows to fetch.
     */
    where?: UserFollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserFollows to fetch.
     */
    orderBy?: UserFollowOrderByWithRelationInput | UserFollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserFollows.
     */
    cursor?: UserFollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserFollows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserFollows.
     */
    skip?: number
    distinct?: UserFollowScalarFieldEnum | UserFollowScalarFieldEnum[]
  }

  /**
   * UserFollow create
   */
  export type UserFollowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFollow
     */
    select?: UserFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFollow
     */
    omit?: UserFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFollowInclude<ExtArgs> | null
    /**
     * The data needed to create a UserFollow.
     */
    data: XOR<UserFollowCreateInput, UserFollowUncheckedCreateInput>
  }

  /**
   * UserFollow createMany
   */
  export type UserFollowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserFollows.
     */
    data: UserFollowCreateManyInput | UserFollowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserFollow createManyAndReturn
   */
  export type UserFollowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFollow
     */
    select?: UserFollowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserFollow
     */
    omit?: UserFollowOmit<ExtArgs> | null
    /**
     * The data used to create many UserFollows.
     */
    data: UserFollowCreateManyInput | UserFollowCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFollowIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserFollow update
   */
  export type UserFollowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFollow
     */
    select?: UserFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFollow
     */
    omit?: UserFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFollowInclude<ExtArgs> | null
    /**
     * The data needed to update a UserFollow.
     */
    data: XOR<UserFollowUpdateInput, UserFollowUncheckedUpdateInput>
    /**
     * Choose, which UserFollow to update.
     */
    where: UserFollowWhereUniqueInput
  }

  /**
   * UserFollow updateMany
   */
  export type UserFollowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserFollows.
     */
    data: XOR<UserFollowUpdateManyMutationInput, UserFollowUncheckedUpdateManyInput>
    /**
     * Filter which UserFollows to update
     */
    where?: UserFollowWhereInput
    /**
     * Limit how many UserFollows to update.
     */
    limit?: number
  }

  /**
   * UserFollow updateManyAndReturn
   */
  export type UserFollowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFollow
     */
    select?: UserFollowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserFollow
     */
    omit?: UserFollowOmit<ExtArgs> | null
    /**
     * The data used to update UserFollows.
     */
    data: XOR<UserFollowUpdateManyMutationInput, UserFollowUncheckedUpdateManyInput>
    /**
     * Filter which UserFollows to update
     */
    where?: UserFollowWhereInput
    /**
     * Limit how many UserFollows to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFollowIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserFollow upsert
   */
  export type UserFollowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFollow
     */
    select?: UserFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFollow
     */
    omit?: UserFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFollowInclude<ExtArgs> | null
    /**
     * The filter to search for the UserFollow to update in case it exists.
     */
    where: UserFollowWhereUniqueInput
    /**
     * In case the UserFollow found by the `where` argument doesn't exist, create a new UserFollow with this data.
     */
    create: XOR<UserFollowCreateInput, UserFollowUncheckedCreateInput>
    /**
     * In case the UserFollow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserFollowUpdateInput, UserFollowUncheckedUpdateInput>
  }

  /**
   * UserFollow delete
   */
  export type UserFollowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFollow
     */
    select?: UserFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFollow
     */
    omit?: UserFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFollowInclude<ExtArgs> | null
    /**
     * Filter which UserFollow to delete.
     */
    where: UserFollowWhereUniqueInput
  }

  /**
   * UserFollow deleteMany
   */
  export type UserFollowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserFollows to delete
     */
    where?: UserFollowWhereInput
    /**
     * Limit how many UserFollows to delete.
     */
    limit?: number
  }

  /**
   * UserFollow without action
   */
  export type UserFollowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserFollow
     */
    select?: UserFollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserFollow
     */
    omit?: UserFollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserFollowInclude<ExtArgs> | null
  }


  /**
   * Model EntryLike
   */

  export type AggregateEntryLike = {
    _count: EntryLikeCountAggregateOutputType | null
    _min: EntryLikeMinAggregateOutputType | null
    _max: EntryLikeMaxAggregateOutputType | null
  }

  export type EntryLikeMinAggregateOutputType = {
    userId: string | null
    diaryEntryId: string | null
  }

  export type EntryLikeMaxAggregateOutputType = {
    userId: string | null
    diaryEntryId: string | null
  }

  export type EntryLikeCountAggregateOutputType = {
    userId: number
    diaryEntryId: number
    _all: number
  }


  export type EntryLikeMinAggregateInputType = {
    userId?: true
    diaryEntryId?: true
  }

  export type EntryLikeMaxAggregateInputType = {
    userId?: true
    diaryEntryId?: true
  }

  export type EntryLikeCountAggregateInputType = {
    userId?: true
    diaryEntryId?: true
    _all?: true
  }

  export type EntryLikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EntryLike to aggregate.
     */
    where?: EntryLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntryLikes to fetch.
     */
    orderBy?: EntryLikeOrderByWithRelationInput | EntryLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EntryLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntryLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntryLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EntryLikes
    **/
    _count?: true | EntryLikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EntryLikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EntryLikeMaxAggregateInputType
  }

  export type GetEntryLikeAggregateType<T extends EntryLikeAggregateArgs> = {
        [P in keyof T & keyof AggregateEntryLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEntryLike[P]>
      : GetScalarType<T[P], AggregateEntryLike[P]>
  }




  export type EntryLikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EntryLikeWhereInput
    orderBy?: EntryLikeOrderByWithAggregationInput | EntryLikeOrderByWithAggregationInput[]
    by: EntryLikeScalarFieldEnum[] | EntryLikeScalarFieldEnum
    having?: EntryLikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EntryLikeCountAggregateInputType | true
    _min?: EntryLikeMinAggregateInputType
    _max?: EntryLikeMaxAggregateInputType
  }

  export type EntryLikeGroupByOutputType = {
    userId: string
    diaryEntryId: string
    _count: EntryLikeCountAggregateOutputType | null
    _min: EntryLikeMinAggregateOutputType | null
    _max: EntryLikeMaxAggregateOutputType | null
  }

  type GetEntryLikeGroupByPayload<T extends EntryLikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EntryLikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EntryLikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EntryLikeGroupByOutputType[P]>
            : GetScalarType<T[P], EntryLikeGroupByOutputType[P]>
        }
      >
    >


  export type EntryLikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    diaryEntryId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    entry?: boolean | DiaryEntryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entryLike"]>

  export type EntryLikeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    diaryEntryId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    entry?: boolean | DiaryEntryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entryLike"]>

  export type EntryLikeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    diaryEntryId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    entry?: boolean | DiaryEntryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["entryLike"]>

  export type EntryLikeSelectScalar = {
    userId?: boolean
    diaryEntryId?: boolean
  }

  export type EntryLikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "diaryEntryId", ExtArgs["result"]["entryLike"]>
  export type EntryLikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    entry?: boolean | DiaryEntryDefaultArgs<ExtArgs>
  }
  export type EntryLikeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    entry?: boolean | DiaryEntryDefaultArgs<ExtArgs>
  }
  export type EntryLikeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    entry?: boolean | DiaryEntryDefaultArgs<ExtArgs>
  }

  export type $EntryLikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EntryLike"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      entry: Prisma.$DiaryEntryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      diaryEntryId: string
    }, ExtArgs["result"]["entryLike"]>
    composites: {}
  }

  type EntryLikeGetPayload<S extends boolean | null | undefined | EntryLikeDefaultArgs> = $Result.GetResult<Prisma.$EntryLikePayload, S>

  type EntryLikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EntryLikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EntryLikeCountAggregateInputType | true
    }

  export interface EntryLikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EntryLike'], meta: { name: 'EntryLike' } }
    /**
     * Find zero or one EntryLike that matches the filter.
     * @param {EntryLikeFindUniqueArgs} args - Arguments to find a EntryLike
     * @example
     * // Get one EntryLike
     * const entryLike = await prisma.entryLike.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EntryLikeFindUniqueArgs>(args: SelectSubset<T, EntryLikeFindUniqueArgs<ExtArgs>>): Prisma__EntryLikeClient<$Result.GetResult<Prisma.$EntryLikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EntryLike that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EntryLikeFindUniqueOrThrowArgs} args - Arguments to find a EntryLike
     * @example
     * // Get one EntryLike
     * const entryLike = await prisma.entryLike.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EntryLikeFindUniqueOrThrowArgs>(args: SelectSubset<T, EntryLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EntryLikeClient<$Result.GetResult<Prisma.$EntryLikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EntryLike that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryLikeFindFirstArgs} args - Arguments to find a EntryLike
     * @example
     * // Get one EntryLike
     * const entryLike = await prisma.entryLike.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EntryLikeFindFirstArgs>(args?: SelectSubset<T, EntryLikeFindFirstArgs<ExtArgs>>): Prisma__EntryLikeClient<$Result.GetResult<Prisma.$EntryLikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EntryLike that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryLikeFindFirstOrThrowArgs} args - Arguments to find a EntryLike
     * @example
     * // Get one EntryLike
     * const entryLike = await prisma.entryLike.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EntryLikeFindFirstOrThrowArgs>(args?: SelectSubset<T, EntryLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__EntryLikeClient<$Result.GetResult<Prisma.$EntryLikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EntryLikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryLikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EntryLikes
     * const entryLikes = await prisma.entryLike.findMany()
     * 
     * // Get first 10 EntryLikes
     * const entryLikes = await prisma.entryLike.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const entryLikeWithUserIdOnly = await prisma.entryLike.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends EntryLikeFindManyArgs>(args?: SelectSubset<T, EntryLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EntryLike.
     * @param {EntryLikeCreateArgs} args - Arguments to create a EntryLike.
     * @example
     * // Create one EntryLike
     * const EntryLike = await prisma.entryLike.create({
     *   data: {
     *     // ... data to create a EntryLike
     *   }
     * })
     * 
     */
    create<T extends EntryLikeCreateArgs>(args: SelectSubset<T, EntryLikeCreateArgs<ExtArgs>>): Prisma__EntryLikeClient<$Result.GetResult<Prisma.$EntryLikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EntryLikes.
     * @param {EntryLikeCreateManyArgs} args - Arguments to create many EntryLikes.
     * @example
     * // Create many EntryLikes
     * const entryLike = await prisma.entryLike.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EntryLikeCreateManyArgs>(args?: SelectSubset<T, EntryLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EntryLikes and returns the data saved in the database.
     * @param {EntryLikeCreateManyAndReturnArgs} args - Arguments to create many EntryLikes.
     * @example
     * // Create many EntryLikes
     * const entryLike = await prisma.entryLike.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EntryLikes and only return the `userId`
     * const entryLikeWithUserIdOnly = await prisma.entryLike.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EntryLikeCreateManyAndReturnArgs>(args?: SelectSubset<T, EntryLikeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryLikePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EntryLike.
     * @param {EntryLikeDeleteArgs} args - Arguments to delete one EntryLike.
     * @example
     * // Delete one EntryLike
     * const EntryLike = await prisma.entryLike.delete({
     *   where: {
     *     // ... filter to delete one EntryLike
     *   }
     * })
     * 
     */
    delete<T extends EntryLikeDeleteArgs>(args: SelectSubset<T, EntryLikeDeleteArgs<ExtArgs>>): Prisma__EntryLikeClient<$Result.GetResult<Prisma.$EntryLikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EntryLike.
     * @param {EntryLikeUpdateArgs} args - Arguments to update one EntryLike.
     * @example
     * // Update one EntryLike
     * const entryLike = await prisma.entryLike.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EntryLikeUpdateArgs>(args: SelectSubset<T, EntryLikeUpdateArgs<ExtArgs>>): Prisma__EntryLikeClient<$Result.GetResult<Prisma.$EntryLikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EntryLikes.
     * @param {EntryLikeDeleteManyArgs} args - Arguments to filter EntryLikes to delete.
     * @example
     * // Delete a few EntryLikes
     * const { count } = await prisma.entryLike.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EntryLikeDeleteManyArgs>(args?: SelectSubset<T, EntryLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EntryLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryLikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EntryLikes
     * const entryLike = await prisma.entryLike.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EntryLikeUpdateManyArgs>(args: SelectSubset<T, EntryLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EntryLikes and returns the data updated in the database.
     * @param {EntryLikeUpdateManyAndReturnArgs} args - Arguments to update many EntryLikes.
     * @example
     * // Update many EntryLikes
     * const entryLike = await prisma.entryLike.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EntryLikes and only return the `userId`
     * const entryLikeWithUserIdOnly = await prisma.entryLike.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EntryLikeUpdateManyAndReturnArgs>(args: SelectSubset<T, EntryLikeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EntryLikePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EntryLike.
     * @param {EntryLikeUpsertArgs} args - Arguments to update or create a EntryLike.
     * @example
     * // Update or create a EntryLike
     * const entryLike = await prisma.entryLike.upsert({
     *   create: {
     *     // ... data to create a EntryLike
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EntryLike we want to update
     *   }
     * })
     */
    upsert<T extends EntryLikeUpsertArgs>(args: SelectSubset<T, EntryLikeUpsertArgs<ExtArgs>>): Prisma__EntryLikeClient<$Result.GetResult<Prisma.$EntryLikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EntryLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryLikeCountArgs} args - Arguments to filter EntryLikes to count.
     * @example
     * // Count the number of EntryLikes
     * const count = await prisma.entryLike.count({
     *   where: {
     *     // ... the filter for the EntryLikes we want to count
     *   }
     * })
    **/
    count<T extends EntryLikeCountArgs>(
      args?: Subset<T, EntryLikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EntryLikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EntryLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryLikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EntryLikeAggregateArgs>(args: Subset<T, EntryLikeAggregateArgs>): Prisma.PrismaPromise<GetEntryLikeAggregateType<T>>

    /**
     * Group by EntryLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EntryLikeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EntryLikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EntryLikeGroupByArgs['orderBy'] }
        : { orderBy?: EntryLikeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EntryLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEntryLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EntryLike model
   */
  readonly fields: EntryLikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EntryLike.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EntryLikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    entry<T extends DiaryEntryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DiaryEntryDefaultArgs<ExtArgs>>): Prisma__DiaryEntryClient<$Result.GetResult<Prisma.$DiaryEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EntryLike model
   */
  interface EntryLikeFieldRefs {
    readonly userId: FieldRef<"EntryLike", 'String'>
    readonly diaryEntryId: FieldRef<"EntryLike", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EntryLike findUnique
   */
  export type EntryLikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLike
     */
    select?: EntryLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLike
     */
    omit?: EntryLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLikeInclude<ExtArgs> | null
    /**
     * Filter, which EntryLike to fetch.
     */
    where: EntryLikeWhereUniqueInput
  }

  /**
   * EntryLike findUniqueOrThrow
   */
  export type EntryLikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLike
     */
    select?: EntryLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLike
     */
    omit?: EntryLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLikeInclude<ExtArgs> | null
    /**
     * Filter, which EntryLike to fetch.
     */
    where: EntryLikeWhereUniqueInput
  }

  /**
   * EntryLike findFirst
   */
  export type EntryLikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLike
     */
    select?: EntryLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLike
     */
    omit?: EntryLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLikeInclude<ExtArgs> | null
    /**
     * Filter, which EntryLike to fetch.
     */
    where?: EntryLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntryLikes to fetch.
     */
    orderBy?: EntryLikeOrderByWithRelationInput | EntryLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EntryLikes.
     */
    cursor?: EntryLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntryLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntryLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EntryLikes.
     */
    distinct?: EntryLikeScalarFieldEnum | EntryLikeScalarFieldEnum[]
  }

  /**
   * EntryLike findFirstOrThrow
   */
  export type EntryLikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLike
     */
    select?: EntryLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLike
     */
    omit?: EntryLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLikeInclude<ExtArgs> | null
    /**
     * Filter, which EntryLike to fetch.
     */
    where?: EntryLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntryLikes to fetch.
     */
    orderBy?: EntryLikeOrderByWithRelationInput | EntryLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EntryLikes.
     */
    cursor?: EntryLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntryLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntryLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EntryLikes.
     */
    distinct?: EntryLikeScalarFieldEnum | EntryLikeScalarFieldEnum[]
  }

  /**
   * EntryLike findMany
   */
  export type EntryLikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLike
     */
    select?: EntryLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLike
     */
    omit?: EntryLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLikeInclude<ExtArgs> | null
    /**
     * Filter, which EntryLikes to fetch.
     */
    where?: EntryLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EntryLikes to fetch.
     */
    orderBy?: EntryLikeOrderByWithRelationInput | EntryLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EntryLikes.
     */
    cursor?: EntryLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EntryLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EntryLikes.
     */
    skip?: number
    distinct?: EntryLikeScalarFieldEnum | EntryLikeScalarFieldEnum[]
  }

  /**
   * EntryLike create
   */
  export type EntryLikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLike
     */
    select?: EntryLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLike
     */
    omit?: EntryLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLikeInclude<ExtArgs> | null
    /**
     * The data needed to create a EntryLike.
     */
    data: XOR<EntryLikeCreateInput, EntryLikeUncheckedCreateInput>
  }

  /**
   * EntryLike createMany
   */
  export type EntryLikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EntryLikes.
     */
    data: EntryLikeCreateManyInput | EntryLikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EntryLike createManyAndReturn
   */
  export type EntryLikeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLike
     */
    select?: EntryLikeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLike
     */
    omit?: EntryLikeOmit<ExtArgs> | null
    /**
     * The data used to create many EntryLikes.
     */
    data: EntryLikeCreateManyInput | EntryLikeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLikeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EntryLike update
   */
  export type EntryLikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLike
     */
    select?: EntryLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLike
     */
    omit?: EntryLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLikeInclude<ExtArgs> | null
    /**
     * The data needed to update a EntryLike.
     */
    data: XOR<EntryLikeUpdateInput, EntryLikeUncheckedUpdateInput>
    /**
     * Choose, which EntryLike to update.
     */
    where: EntryLikeWhereUniqueInput
  }

  /**
   * EntryLike updateMany
   */
  export type EntryLikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EntryLikes.
     */
    data: XOR<EntryLikeUpdateManyMutationInput, EntryLikeUncheckedUpdateManyInput>
    /**
     * Filter which EntryLikes to update
     */
    where?: EntryLikeWhereInput
    /**
     * Limit how many EntryLikes to update.
     */
    limit?: number
  }

  /**
   * EntryLike updateManyAndReturn
   */
  export type EntryLikeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLike
     */
    select?: EntryLikeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLike
     */
    omit?: EntryLikeOmit<ExtArgs> | null
    /**
     * The data used to update EntryLikes.
     */
    data: XOR<EntryLikeUpdateManyMutationInput, EntryLikeUncheckedUpdateManyInput>
    /**
     * Filter which EntryLikes to update
     */
    where?: EntryLikeWhereInput
    /**
     * Limit how many EntryLikes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLikeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EntryLike upsert
   */
  export type EntryLikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLike
     */
    select?: EntryLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLike
     */
    omit?: EntryLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLikeInclude<ExtArgs> | null
    /**
     * The filter to search for the EntryLike to update in case it exists.
     */
    where: EntryLikeWhereUniqueInput
    /**
     * In case the EntryLike found by the `where` argument doesn't exist, create a new EntryLike with this data.
     */
    create: XOR<EntryLikeCreateInput, EntryLikeUncheckedCreateInput>
    /**
     * In case the EntryLike was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EntryLikeUpdateInput, EntryLikeUncheckedUpdateInput>
  }

  /**
   * EntryLike delete
   */
  export type EntryLikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLike
     */
    select?: EntryLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLike
     */
    omit?: EntryLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLikeInclude<ExtArgs> | null
    /**
     * Filter which EntryLike to delete.
     */
    where: EntryLikeWhereUniqueInput
  }

  /**
   * EntryLike deleteMany
   */
  export type EntryLikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EntryLikes to delete
     */
    where?: EntryLikeWhereInput
    /**
     * Limit how many EntryLikes to delete.
     */
    limit?: number
  }

  /**
   * EntryLike without action
   */
  export type EntryLikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EntryLike
     */
    select?: EntryLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EntryLike
     */
    omit?: EntryLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EntryLikeInclude<ExtArgs> | null
  }


  /**
   * Model ActivityLog
   */

  export type AggregateActivityLog = {
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  export type ActivityLogMinAggregateOutputType = {
    id: string | null
    type: string | null
    details: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type ActivityLogMaxAggregateOutputType = {
    id: string | null
    type: string | null
    details: string | null
    createdAt: Date | null
    userId: string | null
  }

  export type ActivityLogCountAggregateOutputType = {
    id: number
    type: number
    details: number
    createdAt: number
    userId: number
    _all: number
  }


  export type ActivityLogMinAggregateInputType = {
    id?: true
    type?: true
    details?: true
    createdAt?: true
    userId?: true
  }

  export type ActivityLogMaxAggregateInputType = {
    id?: true
    type?: true
    details?: true
    createdAt?: true
    userId?: true
  }

  export type ActivityLogCountAggregateInputType = {
    id?: true
    type?: true
    details?: true
    createdAt?: true
    userId?: true
    _all?: true
  }

  export type ActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLog to aggregate.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityLogs
    **/
    _count?: true | ActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityLogMaxAggregateInputType
  }

  export type GetActivityLogAggregateType<T extends ActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityLog[P]>
      : GetScalarType<T[P], AggregateActivityLog[P]>
  }




  export type ActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithAggregationInput | ActivityLogOrderByWithAggregationInput[]
    by: ActivityLogScalarFieldEnum[] | ActivityLogScalarFieldEnum
    having?: ActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityLogCountAggregateInputType | true
    _min?: ActivityLogMinAggregateInputType
    _max?: ActivityLogMaxAggregateInputType
  }

  export type ActivityLogGroupByOutputType = {
    id: string
    type: string
    details: string | null
    createdAt: Date
    userId: string
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  type GetActivityLogGroupByPayload<T extends ActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type ActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    details?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    details?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    details?: boolean
    createdAt?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectScalar = {
    id?: boolean
    type?: boolean
    details?: boolean
    createdAt?: boolean
    userId?: boolean
  }

  export type ActivityLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "details" | "createdAt" | "userId", ExtArgs["result"]["activityLog"]>
  export type ActivityLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActivityLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActivityLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      details: string | null
      createdAt: Date
      userId: string
    }, ExtArgs["result"]["activityLog"]>
    composites: {}
  }

  type ActivityLogGetPayload<S extends boolean | null | undefined | ActivityLogDefaultArgs> = $Result.GetResult<Prisma.$ActivityLogPayload, S>

  type ActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityLogCountAggregateInputType | true
    }

  export interface ActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityLog'], meta: { name: 'ActivityLog' } }
    /**
     * Find zero or one ActivityLog that matches the filter.
     * @param {ActivityLogFindUniqueArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityLogFindUniqueArgs>(args: SelectSubset<T, ActivityLogFindUniqueArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActivityLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityLogFindUniqueOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityLogFindFirstArgs>(args?: SelectSubset<T, ActivityLogFindFirstArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany()
     * 
     * // Get first 10 ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityLogFindManyArgs>(args?: SelectSubset<T, ActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActivityLog.
     * @param {ActivityLogCreateArgs} args - Arguments to create a ActivityLog.
     * @example
     * // Create one ActivityLog
     * const ActivityLog = await prisma.activityLog.create({
     *   data: {
     *     // ... data to create a ActivityLog
     *   }
     * })
     * 
     */
    create<T extends ActivityLogCreateArgs>(args: SelectSubset<T, ActivityLogCreateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActivityLogs.
     * @param {ActivityLogCreateManyArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityLogCreateManyArgs>(args?: SelectSubset<T, ActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivityLogs and returns the data saved in the database.
     * @param {ActivityLogCreateManyAndReturnArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActivityLog.
     * @param {ActivityLogDeleteArgs} args - Arguments to delete one ActivityLog.
     * @example
     * // Delete one ActivityLog
     * const ActivityLog = await prisma.activityLog.delete({
     *   where: {
     *     // ... filter to delete one ActivityLog
     *   }
     * })
     * 
     */
    delete<T extends ActivityLogDeleteArgs>(args: SelectSubset<T, ActivityLogDeleteArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActivityLog.
     * @param {ActivityLogUpdateArgs} args - Arguments to update one ActivityLog.
     * @example
     * // Update one ActivityLog
     * const activityLog = await prisma.activityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityLogUpdateArgs>(args: SelectSubset<T, ActivityLogUpdateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActivityLogs.
     * @param {ActivityLogDeleteManyArgs} args - Arguments to filter ActivityLogs to delete.
     * @example
     * // Delete a few ActivityLogs
     * const { count } = await prisma.activityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityLogDeleteManyArgs>(args?: SelectSubset<T, ActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityLogUpdateManyArgs>(args: SelectSubset<T, ActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs and returns the data updated in the database.
     * @param {ActivityLogUpdateManyAndReturnArgs} args - Arguments to update many ActivityLogs.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActivityLog.
     * @param {ActivityLogUpsertArgs} args - Arguments to update or create a ActivityLog.
     * @example
     * // Update or create a ActivityLog
     * const activityLog = await prisma.activityLog.upsert({
     *   create: {
     *     // ... data to create a ActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends ActivityLogUpsertArgs>(args: SelectSubset<T, ActivityLogUpsertArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogCountArgs} args - Arguments to filter ActivityLogs to count.
     * @example
     * // Count the number of ActivityLogs
     * const count = await prisma.activityLog.count({
     *   where: {
     *     // ... the filter for the ActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends ActivityLogCountArgs>(
      args?: Subset<T, ActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityLogAggregateArgs>(args: Subset<T, ActivityLogAggregateArgs>): Prisma.PrismaPromise<GetActivityLogAggregateType<T>>

    /**
     * Group by ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: ActivityLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityLog model
   */
  readonly fields: ActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActivityLog model
   */
  interface ActivityLogFieldRefs {
    readonly id: FieldRef<"ActivityLog", 'String'>
    readonly type: FieldRef<"ActivityLog", 'String'>
    readonly details: FieldRef<"ActivityLog", 'String'>
    readonly createdAt: FieldRef<"ActivityLog", 'DateTime'>
    readonly userId: FieldRef<"ActivityLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ActivityLog findUnique
   */
  export type ActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findUniqueOrThrow
   */
  export type ActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findFirst
   */
  export type ActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findFirstOrThrow
   */
  export type ActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findMany
   */
  export type ActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLogs to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog create
   */
  export type ActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ActivityLog.
     */
    data: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
  }

  /**
   * ActivityLog createMany
   */
  export type ActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActivityLog createManyAndReturn
   */
  export type ActivityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityLog update
   */
  export type ActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ActivityLog.
     */
    data: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
    /**
     * Choose, which ActivityLog to update.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog updateMany
   */
  export type ActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
  }

  /**
   * ActivityLog updateManyAndReturn
   */
  export type ActivityLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityLog upsert
   */
  export type ActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ActivityLog to update in case it exists.
     */
    where: ActivityLogWhereUniqueInput
    /**
     * In case the ActivityLog found by the `where` argument doesn't exist, create a new ActivityLog with this data.
     */
    create: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
    /**
     * In case the ActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
  }

  /**
   * ActivityLog delete
   */
  export type ActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter which ActivityLog to delete.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog deleteMany
   */
  export type ActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLogs to delete
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to delete.
     */
    limit?: number
  }

  /**
   * ActivityLog without action
   */
  export type ActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password: 'password',
    photoUrl: 'photoUrl',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const MovieScalarFieldEnum: {
    id: 'id',
    title: 'title',
    year: 'year',
    duration: 'duration',
    description: 'description',
    posterUrl: 'posterUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MovieScalarFieldEnum = (typeof MovieScalarFieldEnum)[keyof typeof MovieScalarFieldEnum]


  export const GenreScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type GenreScalarFieldEnum = (typeof GenreScalarFieldEnum)[keyof typeof GenreScalarFieldEnum]


  export const DirectorScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName'
  };

  export type DirectorScalarFieldEnum = (typeof DirectorScalarFieldEnum)[keyof typeof DirectorScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const DiaryEntryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    movieId: 'movieId',
    lastWatchedDate: 'lastWatchedDate',
    watchedCount: 'watchedCount',
    rating: 'rating',
    review: 'review',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DiaryEntryScalarFieldEnum = (typeof DiaryEntryScalarFieldEnum)[keyof typeof DiaryEntryScalarFieldEnum]


  export const EntryTagScalarFieldEnum: {
    diaryEntryId: 'diaryEntryId',
    tagId: 'tagId'
  };

  export type EntryTagScalarFieldEnum = (typeof EntryTagScalarFieldEnum)[keyof typeof EntryTagScalarFieldEnum]


  export const MovieGenreScalarFieldEnum: {
    movieId: 'movieId',
    genreId: 'genreId'
  };

  export type MovieGenreScalarFieldEnum = (typeof MovieGenreScalarFieldEnum)[keyof typeof MovieGenreScalarFieldEnum]


  export const MovieDirectorScalarFieldEnum: {
    movieId: 'movieId',
    directorId: 'directorId'
  };

  export type MovieDirectorScalarFieldEnum = (typeof MovieDirectorScalarFieldEnum)[keyof typeof MovieDirectorScalarFieldEnum]


  export const UserFollowScalarFieldEnum: {
    followerId: 'followerId',
    followeeId: 'followeeId'
  };

  export type UserFollowScalarFieldEnum = (typeof UserFollowScalarFieldEnum)[keyof typeof UserFollowScalarFieldEnum]


  export const EntryLikeScalarFieldEnum: {
    userId: 'userId',
    diaryEntryId: 'diaryEntryId'
  };

  export type EntryLikeScalarFieldEnum = (typeof EntryLikeScalarFieldEnum)[keyof typeof EntryLikeScalarFieldEnum]


  export const ActivityLogScalarFieldEnum: {
    id: 'id',
    type: 'type',
    details: 'details',
    createdAt: 'createdAt',
    userId: 'userId'
  };

  export type ActivityLogScalarFieldEnum = (typeof ActivityLogScalarFieldEnum)[keyof typeof ActivityLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    photoUrl?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    DiaryEntry?: DiaryEntryListRelationFilter
    followers?: UserFollowListRelationFilter
    following?: UserFollowListRelationFilter
    EntryLike?: EntryLikeListRelationFilter
    ActivityLog?: ActivityLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    photoUrl?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    DiaryEntry?: DiaryEntryOrderByRelationAggregateInput
    followers?: UserFollowOrderByRelationAggregateInput
    following?: UserFollowOrderByRelationAggregateInput
    EntryLike?: EntryLikeOrderByRelationAggregateInput
    ActivityLog?: ActivityLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    photoUrl?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    DiaryEntry?: DiaryEntryListRelationFilter
    followers?: UserFollowListRelationFilter
    following?: UserFollowListRelationFilter
    EntryLike?: EntryLikeListRelationFilter
    ActivityLog?: ActivityLogListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    photoUrl?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    photoUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type MovieWhereInput = {
    AND?: MovieWhereInput | MovieWhereInput[]
    OR?: MovieWhereInput[]
    NOT?: MovieWhereInput | MovieWhereInput[]
    id?: StringFilter<"Movie"> | string
    title?: StringFilter<"Movie"> | string
    year?: IntFilter<"Movie"> | number
    duration?: IntFilter<"Movie"> | number
    description?: StringFilter<"Movie"> | string
    posterUrl?: StringFilter<"Movie"> | string
    createdAt?: DateTimeFilter<"Movie"> | Date | string
    updatedAt?: DateTimeFilter<"Movie"> | Date | string
    DiaryEntry?: DiaryEntryListRelationFilter
    genres?: MovieGenreListRelationFilter
    directors?: MovieDirectorListRelationFilter
  }

  export type MovieOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    year?: SortOrder
    duration?: SortOrder
    description?: SortOrder
    posterUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    DiaryEntry?: DiaryEntryOrderByRelationAggregateInput
    genres?: MovieGenreOrderByRelationAggregateInput
    directors?: MovieDirectorOrderByRelationAggregateInput
  }

  export type MovieWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    title_year?: MovieTitleYearCompoundUniqueInput
    AND?: MovieWhereInput | MovieWhereInput[]
    OR?: MovieWhereInput[]
    NOT?: MovieWhereInput | MovieWhereInput[]
    title?: StringFilter<"Movie"> | string
    year?: IntFilter<"Movie"> | number
    duration?: IntFilter<"Movie"> | number
    description?: StringFilter<"Movie"> | string
    posterUrl?: StringFilter<"Movie"> | string
    createdAt?: DateTimeFilter<"Movie"> | Date | string
    updatedAt?: DateTimeFilter<"Movie"> | Date | string
    DiaryEntry?: DiaryEntryListRelationFilter
    genres?: MovieGenreListRelationFilter
    directors?: MovieDirectorListRelationFilter
  }, "id" | "title_year">

  export type MovieOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    year?: SortOrder
    duration?: SortOrder
    description?: SortOrder
    posterUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MovieCountOrderByAggregateInput
    _avg?: MovieAvgOrderByAggregateInput
    _max?: MovieMaxOrderByAggregateInput
    _min?: MovieMinOrderByAggregateInput
    _sum?: MovieSumOrderByAggregateInput
  }

  export type MovieScalarWhereWithAggregatesInput = {
    AND?: MovieScalarWhereWithAggregatesInput | MovieScalarWhereWithAggregatesInput[]
    OR?: MovieScalarWhereWithAggregatesInput[]
    NOT?: MovieScalarWhereWithAggregatesInput | MovieScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Movie"> | string
    title?: StringWithAggregatesFilter<"Movie"> | string
    year?: IntWithAggregatesFilter<"Movie"> | number
    duration?: IntWithAggregatesFilter<"Movie"> | number
    description?: StringWithAggregatesFilter<"Movie"> | string
    posterUrl?: StringWithAggregatesFilter<"Movie"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Movie"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Movie"> | Date | string
  }

  export type GenreWhereInput = {
    AND?: GenreWhereInput | GenreWhereInput[]
    OR?: GenreWhereInput[]
    NOT?: GenreWhereInput | GenreWhereInput[]
    id?: StringFilter<"Genre"> | string
    name?: StringFilter<"Genre"> | string
    movies?: MovieGenreListRelationFilter
  }

  export type GenreOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    movies?: MovieGenreOrderByRelationAggregateInput
  }

  export type GenreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: GenreWhereInput | GenreWhereInput[]
    OR?: GenreWhereInput[]
    NOT?: GenreWhereInput | GenreWhereInput[]
    movies?: MovieGenreListRelationFilter
  }, "id" | "name">

  export type GenreOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: GenreCountOrderByAggregateInput
    _max?: GenreMaxOrderByAggregateInput
    _min?: GenreMinOrderByAggregateInput
  }

  export type GenreScalarWhereWithAggregatesInput = {
    AND?: GenreScalarWhereWithAggregatesInput | GenreScalarWhereWithAggregatesInput[]
    OR?: GenreScalarWhereWithAggregatesInput[]
    NOT?: GenreScalarWhereWithAggregatesInput | GenreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Genre"> | string
    name?: StringWithAggregatesFilter<"Genre"> | string
  }

  export type DirectorWhereInput = {
    AND?: DirectorWhereInput | DirectorWhereInput[]
    OR?: DirectorWhereInput[]
    NOT?: DirectorWhereInput | DirectorWhereInput[]
    id?: StringFilter<"Director"> | string
    firstName?: StringFilter<"Director"> | string
    lastName?: StringFilter<"Director"> | string
    movies?: MovieDirectorListRelationFilter
  }

  export type DirectorOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    movies?: MovieDirectorOrderByRelationAggregateInput
  }

  export type DirectorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    firstName_lastName?: DirectorFirstNameLastNameCompoundUniqueInput
    AND?: DirectorWhereInput | DirectorWhereInput[]
    OR?: DirectorWhereInput[]
    NOT?: DirectorWhereInput | DirectorWhereInput[]
    firstName?: StringFilter<"Director"> | string
    lastName?: StringFilter<"Director"> | string
    movies?: MovieDirectorListRelationFilter
  }, "id" | "firstName_lastName">

  export type DirectorOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    _count?: DirectorCountOrderByAggregateInput
    _max?: DirectorMaxOrderByAggregateInput
    _min?: DirectorMinOrderByAggregateInput
  }

  export type DirectorScalarWhereWithAggregatesInput = {
    AND?: DirectorScalarWhereWithAggregatesInput | DirectorScalarWhereWithAggregatesInput[]
    OR?: DirectorScalarWhereWithAggregatesInput[]
    NOT?: DirectorScalarWhereWithAggregatesInput | DirectorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Director"> | string
    firstName?: StringWithAggregatesFilter<"Director"> | string
    lastName?: StringWithAggregatesFilter<"Director"> | string
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: StringFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
    entries?: EntryTagListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    entries?: EntryTagOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    entries?: EntryTagListRelationFilter
  }, "id" | "name">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tag"> | string
    name?: StringWithAggregatesFilter<"Tag"> | string
  }

  export type DiaryEntryWhereInput = {
    AND?: DiaryEntryWhereInput | DiaryEntryWhereInput[]
    OR?: DiaryEntryWhereInput[]
    NOT?: DiaryEntryWhereInput | DiaryEntryWhereInput[]
    id?: StringFilter<"DiaryEntry"> | string
    userId?: StringFilter<"DiaryEntry"> | string
    movieId?: StringFilter<"DiaryEntry"> | string
    lastWatchedDate?: DateTimeFilter<"DiaryEntry"> | Date | string
    watchedCount?: IntFilter<"DiaryEntry"> | number
    rating?: IntFilter<"DiaryEntry"> | number
    review?: StringNullableFilter<"DiaryEntry"> | string | null
    createdAt?: DateTimeFilter<"DiaryEntry"> | Date | string
    updatedAt?: DateTimeFilter<"DiaryEntry"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    movie?: XOR<MovieScalarRelationFilter, MovieWhereInput>
    tags?: EntryTagListRelationFilter
    likes?: EntryLikeListRelationFilter
  }

  export type DiaryEntryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    lastWatchedDate?: SortOrder
    watchedCount?: SortOrder
    rating?: SortOrder
    review?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    movie?: MovieOrderByWithRelationInput
    tags?: EntryTagOrderByRelationAggregateInput
    likes?: EntryLikeOrderByRelationAggregateInput
  }

  export type DiaryEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DiaryEntryWhereInput | DiaryEntryWhereInput[]
    OR?: DiaryEntryWhereInput[]
    NOT?: DiaryEntryWhereInput | DiaryEntryWhereInput[]
    userId?: StringFilter<"DiaryEntry"> | string
    movieId?: StringFilter<"DiaryEntry"> | string
    lastWatchedDate?: DateTimeFilter<"DiaryEntry"> | Date | string
    watchedCount?: IntFilter<"DiaryEntry"> | number
    rating?: IntFilter<"DiaryEntry"> | number
    review?: StringNullableFilter<"DiaryEntry"> | string | null
    createdAt?: DateTimeFilter<"DiaryEntry"> | Date | string
    updatedAt?: DateTimeFilter<"DiaryEntry"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    movie?: XOR<MovieScalarRelationFilter, MovieWhereInput>
    tags?: EntryTagListRelationFilter
    likes?: EntryLikeListRelationFilter
  }, "id">

  export type DiaryEntryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    lastWatchedDate?: SortOrder
    watchedCount?: SortOrder
    rating?: SortOrder
    review?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DiaryEntryCountOrderByAggregateInput
    _avg?: DiaryEntryAvgOrderByAggregateInput
    _max?: DiaryEntryMaxOrderByAggregateInput
    _min?: DiaryEntryMinOrderByAggregateInput
    _sum?: DiaryEntrySumOrderByAggregateInput
  }

  export type DiaryEntryScalarWhereWithAggregatesInput = {
    AND?: DiaryEntryScalarWhereWithAggregatesInput | DiaryEntryScalarWhereWithAggregatesInput[]
    OR?: DiaryEntryScalarWhereWithAggregatesInput[]
    NOT?: DiaryEntryScalarWhereWithAggregatesInput | DiaryEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DiaryEntry"> | string
    userId?: StringWithAggregatesFilter<"DiaryEntry"> | string
    movieId?: StringWithAggregatesFilter<"DiaryEntry"> | string
    lastWatchedDate?: DateTimeWithAggregatesFilter<"DiaryEntry"> | Date | string
    watchedCount?: IntWithAggregatesFilter<"DiaryEntry"> | number
    rating?: IntWithAggregatesFilter<"DiaryEntry"> | number
    review?: StringNullableWithAggregatesFilter<"DiaryEntry"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DiaryEntry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DiaryEntry"> | Date | string
  }

  export type EntryTagWhereInput = {
    AND?: EntryTagWhereInput | EntryTagWhereInput[]
    OR?: EntryTagWhereInput[]
    NOT?: EntryTagWhereInput | EntryTagWhereInput[]
    diaryEntryId?: StringFilter<"EntryTag"> | string
    tagId?: StringFilter<"EntryTag"> | string
    entry?: XOR<DiaryEntryScalarRelationFilter, DiaryEntryWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }

  export type EntryTagOrderByWithRelationInput = {
    diaryEntryId?: SortOrder
    tagId?: SortOrder
    entry?: DiaryEntryOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
  }

  export type EntryTagWhereUniqueInput = Prisma.AtLeast<{
    diaryEntryId_tagId?: EntryTagDiaryEntryIdTagIdCompoundUniqueInput
    AND?: EntryTagWhereInput | EntryTagWhereInput[]
    OR?: EntryTagWhereInput[]
    NOT?: EntryTagWhereInput | EntryTagWhereInput[]
    diaryEntryId?: StringFilter<"EntryTag"> | string
    tagId?: StringFilter<"EntryTag"> | string
    entry?: XOR<DiaryEntryScalarRelationFilter, DiaryEntryWhereInput>
    tag?: XOR<TagScalarRelationFilter, TagWhereInput>
  }, "diaryEntryId_tagId">

  export type EntryTagOrderByWithAggregationInput = {
    diaryEntryId?: SortOrder
    tagId?: SortOrder
    _count?: EntryTagCountOrderByAggregateInput
    _max?: EntryTagMaxOrderByAggregateInput
    _min?: EntryTagMinOrderByAggregateInput
  }

  export type EntryTagScalarWhereWithAggregatesInput = {
    AND?: EntryTagScalarWhereWithAggregatesInput | EntryTagScalarWhereWithAggregatesInput[]
    OR?: EntryTagScalarWhereWithAggregatesInput[]
    NOT?: EntryTagScalarWhereWithAggregatesInput | EntryTagScalarWhereWithAggregatesInput[]
    diaryEntryId?: StringWithAggregatesFilter<"EntryTag"> | string
    tagId?: StringWithAggregatesFilter<"EntryTag"> | string
  }

  export type MovieGenreWhereInput = {
    AND?: MovieGenreWhereInput | MovieGenreWhereInput[]
    OR?: MovieGenreWhereInput[]
    NOT?: MovieGenreWhereInput | MovieGenreWhereInput[]
    movieId?: StringFilter<"MovieGenre"> | string
    genreId?: StringFilter<"MovieGenre"> | string
    movie?: XOR<MovieScalarRelationFilter, MovieWhereInput>
    genre?: XOR<GenreScalarRelationFilter, GenreWhereInput>
  }

  export type MovieGenreOrderByWithRelationInput = {
    movieId?: SortOrder
    genreId?: SortOrder
    movie?: MovieOrderByWithRelationInput
    genre?: GenreOrderByWithRelationInput
  }

  export type MovieGenreWhereUniqueInput = Prisma.AtLeast<{
    movieId_genreId?: MovieGenreMovieIdGenreIdCompoundUniqueInput
    AND?: MovieGenreWhereInput | MovieGenreWhereInput[]
    OR?: MovieGenreWhereInput[]
    NOT?: MovieGenreWhereInput | MovieGenreWhereInput[]
    movieId?: StringFilter<"MovieGenre"> | string
    genreId?: StringFilter<"MovieGenre"> | string
    movie?: XOR<MovieScalarRelationFilter, MovieWhereInput>
    genre?: XOR<GenreScalarRelationFilter, GenreWhereInput>
  }, "movieId_genreId">

  export type MovieGenreOrderByWithAggregationInput = {
    movieId?: SortOrder
    genreId?: SortOrder
    _count?: MovieGenreCountOrderByAggregateInput
    _max?: MovieGenreMaxOrderByAggregateInput
    _min?: MovieGenreMinOrderByAggregateInput
  }

  export type MovieGenreScalarWhereWithAggregatesInput = {
    AND?: MovieGenreScalarWhereWithAggregatesInput | MovieGenreScalarWhereWithAggregatesInput[]
    OR?: MovieGenreScalarWhereWithAggregatesInput[]
    NOT?: MovieGenreScalarWhereWithAggregatesInput | MovieGenreScalarWhereWithAggregatesInput[]
    movieId?: StringWithAggregatesFilter<"MovieGenre"> | string
    genreId?: StringWithAggregatesFilter<"MovieGenre"> | string
  }

  export type MovieDirectorWhereInput = {
    AND?: MovieDirectorWhereInput | MovieDirectorWhereInput[]
    OR?: MovieDirectorWhereInput[]
    NOT?: MovieDirectorWhereInput | MovieDirectorWhereInput[]
    movieId?: StringFilter<"MovieDirector"> | string
    directorId?: StringFilter<"MovieDirector"> | string
    movie?: XOR<MovieScalarRelationFilter, MovieWhereInput>
    director?: XOR<DirectorScalarRelationFilter, DirectorWhereInput>
  }

  export type MovieDirectorOrderByWithRelationInput = {
    movieId?: SortOrder
    directorId?: SortOrder
    movie?: MovieOrderByWithRelationInput
    director?: DirectorOrderByWithRelationInput
  }

  export type MovieDirectorWhereUniqueInput = Prisma.AtLeast<{
    movieId_directorId?: MovieDirectorMovieIdDirectorIdCompoundUniqueInput
    AND?: MovieDirectorWhereInput | MovieDirectorWhereInput[]
    OR?: MovieDirectorWhereInput[]
    NOT?: MovieDirectorWhereInput | MovieDirectorWhereInput[]
    movieId?: StringFilter<"MovieDirector"> | string
    directorId?: StringFilter<"MovieDirector"> | string
    movie?: XOR<MovieScalarRelationFilter, MovieWhereInput>
    director?: XOR<DirectorScalarRelationFilter, DirectorWhereInput>
  }, "movieId_directorId">

  export type MovieDirectorOrderByWithAggregationInput = {
    movieId?: SortOrder
    directorId?: SortOrder
    _count?: MovieDirectorCountOrderByAggregateInput
    _max?: MovieDirectorMaxOrderByAggregateInput
    _min?: MovieDirectorMinOrderByAggregateInput
  }

  export type MovieDirectorScalarWhereWithAggregatesInput = {
    AND?: MovieDirectorScalarWhereWithAggregatesInput | MovieDirectorScalarWhereWithAggregatesInput[]
    OR?: MovieDirectorScalarWhereWithAggregatesInput[]
    NOT?: MovieDirectorScalarWhereWithAggregatesInput | MovieDirectorScalarWhereWithAggregatesInput[]
    movieId?: StringWithAggregatesFilter<"MovieDirector"> | string
    directorId?: StringWithAggregatesFilter<"MovieDirector"> | string
  }

  export type UserFollowWhereInput = {
    AND?: UserFollowWhereInput | UserFollowWhereInput[]
    OR?: UserFollowWhereInput[]
    NOT?: UserFollowWhereInput | UserFollowWhereInput[]
    followerId?: StringFilter<"UserFollow"> | string
    followeeId?: StringFilter<"UserFollow"> | string
    follower?: XOR<UserScalarRelationFilter, UserWhereInput>
    followee?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserFollowOrderByWithRelationInput = {
    followerId?: SortOrder
    followeeId?: SortOrder
    follower?: UserOrderByWithRelationInput
    followee?: UserOrderByWithRelationInput
  }

  export type UserFollowWhereUniqueInput = Prisma.AtLeast<{
    followerId_followeeId?: UserFollowFollowerIdFolloweeIdCompoundUniqueInput
    AND?: UserFollowWhereInput | UserFollowWhereInput[]
    OR?: UserFollowWhereInput[]
    NOT?: UserFollowWhereInput | UserFollowWhereInput[]
    followerId?: StringFilter<"UserFollow"> | string
    followeeId?: StringFilter<"UserFollow"> | string
    follower?: XOR<UserScalarRelationFilter, UserWhereInput>
    followee?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "followerId_followeeId">

  export type UserFollowOrderByWithAggregationInput = {
    followerId?: SortOrder
    followeeId?: SortOrder
    _count?: UserFollowCountOrderByAggregateInput
    _max?: UserFollowMaxOrderByAggregateInput
    _min?: UserFollowMinOrderByAggregateInput
  }

  export type UserFollowScalarWhereWithAggregatesInput = {
    AND?: UserFollowScalarWhereWithAggregatesInput | UserFollowScalarWhereWithAggregatesInput[]
    OR?: UserFollowScalarWhereWithAggregatesInput[]
    NOT?: UserFollowScalarWhereWithAggregatesInput | UserFollowScalarWhereWithAggregatesInput[]
    followerId?: StringWithAggregatesFilter<"UserFollow"> | string
    followeeId?: StringWithAggregatesFilter<"UserFollow"> | string
  }

  export type EntryLikeWhereInput = {
    AND?: EntryLikeWhereInput | EntryLikeWhereInput[]
    OR?: EntryLikeWhereInput[]
    NOT?: EntryLikeWhereInput | EntryLikeWhereInput[]
    userId?: StringFilter<"EntryLike"> | string
    diaryEntryId?: StringFilter<"EntryLike"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    entry?: XOR<DiaryEntryScalarRelationFilter, DiaryEntryWhereInput>
  }

  export type EntryLikeOrderByWithRelationInput = {
    userId?: SortOrder
    diaryEntryId?: SortOrder
    user?: UserOrderByWithRelationInput
    entry?: DiaryEntryOrderByWithRelationInput
  }

  export type EntryLikeWhereUniqueInput = Prisma.AtLeast<{
    userId_diaryEntryId?: EntryLikeUserIdDiaryEntryIdCompoundUniqueInput
    AND?: EntryLikeWhereInput | EntryLikeWhereInput[]
    OR?: EntryLikeWhereInput[]
    NOT?: EntryLikeWhereInput | EntryLikeWhereInput[]
    userId?: StringFilter<"EntryLike"> | string
    diaryEntryId?: StringFilter<"EntryLike"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    entry?: XOR<DiaryEntryScalarRelationFilter, DiaryEntryWhereInput>
  }, "userId_diaryEntryId">

  export type EntryLikeOrderByWithAggregationInput = {
    userId?: SortOrder
    diaryEntryId?: SortOrder
    _count?: EntryLikeCountOrderByAggregateInput
    _max?: EntryLikeMaxOrderByAggregateInput
    _min?: EntryLikeMinOrderByAggregateInput
  }

  export type EntryLikeScalarWhereWithAggregatesInput = {
    AND?: EntryLikeScalarWhereWithAggregatesInput | EntryLikeScalarWhereWithAggregatesInput[]
    OR?: EntryLikeScalarWhereWithAggregatesInput[]
    NOT?: EntryLikeScalarWhereWithAggregatesInput | EntryLikeScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"EntryLike"> | string
    diaryEntryId?: StringWithAggregatesFilter<"EntryLike"> | string
  }

  export type ActivityLogWhereInput = {
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    type?: StringFilter<"ActivityLog"> | string
    details?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
    userId?: StringFilter<"ActivityLog"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    type?: StringFilter<"ActivityLog"> | string
    details?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
    userId?: StringFilter<"ActivityLog"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    _count?: ActivityLogCountOrderByAggregateInput
    _max?: ActivityLogMaxOrderByAggregateInput
    _min?: ActivityLogMinOrderByAggregateInput
  }

  export type ActivityLogScalarWhereWithAggregatesInput = {
    AND?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    OR?: ActivityLogScalarWhereWithAggregatesInput[]
    NOT?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActivityLog"> | string
    type?: StringWithAggregatesFilter<"ActivityLog"> | string
    details?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ActivityLog"> | Date | string
    userId?: StringWithAggregatesFilter<"ActivityLog"> | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    photoUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    DiaryEntry?: DiaryEntryCreateNestedManyWithoutUserInput
    followers?: UserFollowCreateNestedManyWithoutFollowerInput
    following?: UserFollowCreateNestedManyWithoutFolloweeInput
    EntryLike?: EntryLikeCreateNestedManyWithoutUserInput
    ActivityLog?: ActivityLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    email: string
    password: string
    photoUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    DiaryEntry?: DiaryEntryUncheckedCreateNestedManyWithoutUserInput
    followers?: UserFollowUncheckedCreateNestedManyWithoutFollowerInput
    following?: UserFollowUncheckedCreateNestedManyWithoutFolloweeInput
    EntryLike?: EntryLikeUncheckedCreateNestedManyWithoutUserInput
    ActivityLog?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DiaryEntry?: DiaryEntryUpdateManyWithoutUserNestedInput
    followers?: UserFollowUpdateManyWithoutFollowerNestedInput
    following?: UserFollowUpdateManyWithoutFolloweeNestedInput
    EntryLike?: EntryLikeUpdateManyWithoutUserNestedInput
    ActivityLog?: ActivityLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DiaryEntry?: DiaryEntryUncheckedUpdateManyWithoutUserNestedInput
    followers?: UserFollowUncheckedUpdateManyWithoutFollowerNestedInput
    following?: UserFollowUncheckedUpdateManyWithoutFolloweeNestedInput
    EntryLike?: EntryLikeUncheckedUpdateManyWithoutUserNestedInput
    ActivityLog?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    email: string
    password: string
    photoUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovieCreateInput = {
    id?: string
    title: string
    year: number
    duration: number
    description: string
    posterUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    DiaryEntry?: DiaryEntryCreateNestedManyWithoutMovieInput
    genres?: MovieGenreCreateNestedManyWithoutMovieInput
    directors?: MovieDirectorCreateNestedManyWithoutMovieInput
  }

  export type MovieUncheckedCreateInput = {
    id?: string
    title: string
    year: number
    duration: number
    description: string
    posterUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    DiaryEntry?: DiaryEntryUncheckedCreateNestedManyWithoutMovieInput
    genres?: MovieGenreUncheckedCreateNestedManyWithoutMovieInput
    directors?: MovieDirectorUncheckedCreateNestedManyWithoutMovieInput
  }

  export type MovieUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    posterUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DiaryEntry?: DiaryEntryUpdateManyWithoutMovieNestedInput
    genres?: MovieGenreUpdateManyWithoutMovieNestedInput
    directors?: MovieDirectorUpdateManyWithoutMovieNestedInput
  }

  export type MovieUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    posterUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DiaryEntry?: DiaryEntryUncheckedUpdateManyWithoutMovieNestedInput
    genres?: MovieGenreUncheckedUpdateManyWithoutMovieNestedInput
    directors?: MovieDirectorUncheckedUpdateManyWithoutMovieNestedInput
  }

  export type MovieCreateManyInput = {
    id?: string
    title: string
    year: number
    duration: number
    description: string
    posterUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MovieUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    posterUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovieUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    posterUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GenreCreateInput = {
    id?: string
    name: string
    movies?: MovieGenreCreateNestedManyWithoutGenreInput
  }

  export type GenreUncheckedCreateInput = {
    id?: string
    name: string
    movies?: MovieGenreUncheckedCreateNestedManyWithoutGenreInput
  }

  export type GenreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    movies?: MovieGenreUpdateManyWithoutGenreNestedInput
  }

  export type GenreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    movies?: MovieGenreUncheckedUpdateManyWithoutGenreNestedInput
  }

  export type GenreCreateManyInput = {
    id?: string
    name: string
  }

  export type GenreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type GenreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type DirectorCreateInput = {
    id?: string
    firstName: string
    lastName: string
    movies?: MovieDirectorCreateNestedManyWithoutDirectorInput
  }

  export type DirectorUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    movies?: MovieDirectorUncheckedCreateNestedManyWithoutDirectorInput
  }

  export type DirectorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    movies?: MovieDirectorUpdateManyWithoutDirectorNestedInput
  }

  export type DirectorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    movies?: MovieDirectorUncheckedUpdateManyWithoutDirectorNestedInput
  }

  export type DirectorCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
  }

  export type DirectorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
  }

  export type DirectorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
  }

  export type TagCreateInput = {
    id?: string
    name: string
    entries?: EntryTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateInput = {
    id?: string
    name: string
    entries?: EntryTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    entries?: EntryTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    entries?: EntryTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type TagCreateManyInput = {
    id?: string
    name: string
  }

  export type TagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type DiaryEntryCreateInput = {
    id?: string
    lastWatchedDate: Date | string
    watchedCount?: number
    rating: number
    review?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDiaryEntryInput
    movie: MovieCreateNestedOneWithoutDiaryEntryInput
    tags?: EntryTagCreateNestedManyWithoutEntryInput
    likes?: EntryLikeCreateNestedManyWithoutEntryInput
  }

  export type DiaryEntryUncheckedCreateInput = {
    id?: string
    userId: string
    movieId: string
    lastWatchedDate: Date | string
    watchedCount?: number
    rating: number
    review?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: EntryTagUncheckedCreateNestedManyWithoutEntryInput
    likes?: EntryLikeUncheckedCreateNestedManyWithoutEntryInput
  }

  export type DiaryEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastWatchedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    watchedCount?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDiaryEntryNestedInput
    movie?: MovieUpdateOneRequiredWithoutDiaryEntryNestedInput
    tags?: EntryTagUpdateManyWithoutEntryNestedInput
    likes?: EntryLikeUpdateManyWithoutEntryNestedInput
  }

  export type DiaryEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: StringFieldUpdateOperationsInput | string
    lastWatchedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    watchedCount?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: EntryTagUncheckedUpdateManyWithoutEntryNestedInput
    likes?: EntryLikeUncheckedUpdateManyWithoutEntryNestedInput
  }

  export type DiaryEntryCreateManyInput = {
    id?: string
    userId: string
    movieId: string
    lastWatchedDate: Date | string
    watchedCount?: number
    rating: number
    review?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DiaryEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastWatchedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    watchedCount?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiaryEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: StringFieldUpdateOperationsInput | string
    lastWatchedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    watchedCount?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EntryTagCreateInput = {
    entry: DiaryEntryCreateNestedOneWithoutTagsInput
    tag: TagCreateNestedOneWithoutEntriesInput
  }

  export type EntryTagUncheckedCreateInput = {
    diaryEntryId: string
    tagId: string
  }

  export type EntryTagUpdateInput = {
    entry?: DiaryEntryUpdateOneRequiredWithoutTagsNestedInput
    tag?: TagUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type EntryTagUncheckedUpdateInput = {
    diaryEntryId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type EntryTagCreateManyInput = {
    diaryEntryId: string
    tagId: string
  }

  export type EntryTagUpdateManyMutationInput = {

  }

  export type EntryTagUncheckedUpdateManyInput = {
    diaryEntryId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type MovieGenreCreateInput = {
    movie: MovieCreateNestedOneWithoutGenresInput
    genre: GenreCreateNestedOneWithoutMoviesInput
  }

  export type MovieGenreUncheckedCreateInput = {
    movieId: string
    genreId: string
  }

  export type MovieGenreUpdateInput = {
    movie?: MovieUpdateOneRequiredWithoutGenresNestedInput
    genre?: GenreUpdateOneRequiredWithoutMoviesNestedInput
  }

  export type MovieGenreUncheckedUpdateInput = {
    movieId?: StringFieldUpdateOperationsInput | string
    genreId?: StringFieldUpdateOperationsInput | string
  }

  export type MovieGenreCreateManyInput = {
    movieId: string
    genreId: string
  }

  export type MovieGenreUpdateManyMutationInput = {

  }

  export type MovieGenreUncheckedUpdateManyInput = {
    movieId?: StringFieldUpdateOperationsInput | string
    genreId?: StringFieldUpdateOperationsInput | string
  }

  export type MovieDirectorCreateInput = {
    movie: MovieCreateNestedOneWithoutDirectorsInput
    director: DirectorCreateNestedOneWithoutMoviesInput
  }

  export type MovieDirectorUncheckedCreateInput = {
    movieId: string
    directorId: string
  }

  export type MovieDirectorUpdateInput = {
    movie?: MovieUpdateOneRequiredWithoutDirectorsNestedInput
    director?: DirectorUpdateOneRequiredWithoutMoviesNestedInput
  }

  export type MovieDirectorUncheckedUpdateInput = {
    movieId?: StringFieldUpdateOperationsInput | string
    directorId?: StringFieldUpdateOperationsInput | string
  }

  export type MovieDirectorCreateManyInput = {
    movieId: string
    directorId: string
  }

  export type MovieDirectorUpdateManyMutationInput = {

  }

  export type MovieDirectorUncheckedUpdateManyInput = {
    movieId?: StringFieldUpdateOperationsInput | string
    directorId?: StringFieldUpdateOperationsInput | string
  }

  export type UserFollowCreateInput = {
    follower: UserCreateNestedOneWithoutFollowersInput
    followee: UserCreateNestedOneWithoutFollowingInput
  }

  export type UserFollowUncheckedCreateInput = {
    followerId: string
    followeeId: string
  }

  export type UserFollowUpdateInput = {
    follower?: UserUpdateOneRequiredWithoutFollowersNestedInput
    followee?: UserUpdateOneRequiredWithoutFollowingNestedInput
  }

  export type UserFollowUncheckedUpdateInput = {
    followerId?: StringFieldUpdateOperationsInput | string
    followeeId?: StringFieldUpdateOperationsInput | string
  }

  export type UserFollowCreateManyInput = {
    followerId: string
    followeeId: string
  }

  export type UserFollowUpdateManyMutationInput = {

  }

  export type UserFollowUncheckedUpdateManyInput = {
    followerId?: StringFieldUpdateOperationsInput | string
    followeeId?: StringFieldUpdateOperationsInput | string
  }

  export type EntryLikeCreateInput = {
    user: UserCreateNestedOneWithoutEntryLikeInput
    entry: DiaryEntryCreateNestedOneWithoutLikesInput
  }

  export type EntryLikeUncheckedCreateInput = {
    userId: string
    diaryEntryId: string
  }

  export type EntryLikeUpdateInput = {
    user?: UserUpdateOneRequiredWithoutEntryLikeNestedInput
    entry?: DiaryEntryUpdateOneRequiredWithoutLikesNestedInput
  }

  export type EntryLikeUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    diaryEntryId?: StringFieldUpdateOperationsInput | string
  }

  export type EntryLikeCreateManyInput = {
    userId: string
    diaryEntryId: string
  }

  export type EntryLikeUpdateManyMutationInput = {

  }

  export type EntryLikeUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    diaryEntryId?: StringFieldUpdateOperationsInput | string
  }

  export type ActivityLogCreateInput = {
    id?: string
    type: string
    details?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutActivityLogInput
  }

  export type ActivityLogUncheckedCreateInput = {
    id?: string
    type: string
    details?: string | null
    createdAt?: Date | string
    userId: string
  }

  export type ActivityLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutActivityLogNestedInput
  }

  export type ActivityLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ActivityLogCreateManyInput = {
    id?: string
    type: string
    details?: string | null
    createdAt?: Date | string
    userId: string
  }

  export type ActivityLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DiaryEntryListRelationFilter = {
    every?: DiaryEntryWhereInput
    some?: DiaryEntryWhereInput
    none?: DiaryEntryWhereInput
  }

  export type UserFollowListRelationFilter = {
    every?: UserFollowWhereInput
    some?: UserFollowWhereInput
    none?: UserFollowWhereInput
  }

  export type EntryLikeListRelationFilter = {
    every?: EntryLikeWhereInput
    some?: EntryLikeWhereInput
    none?: EntryLikeWhereInput
  }

  export type ActivityLogListRelationFilter = {
    every?: ActivityLogWhereInput
    some?: ActivityLogWhereInput
    none?: ActivityLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DiaryEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserFollowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EntryLikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    photoUrl?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    photoUrl?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password?: SortOrder
    photoUrl?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type MovieGenreListRelationFilter = {
    every?: MovieGenreWhereInput
    some?: MovieGenreWhereInput
    none?: MovieGenreWhereInput
  }

  export type MovieDirectorListRelationFilter = {
    every?: MovieDirectorWhereInput
    some?: MovieDirectorWhereInput
    none?: MovieDirectorWhereInput
  }

  export type MovieGenreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MovieDirectorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MovieTitleYearCompoundUniqueInput = {
    title: string
    year: number
  }

  export type MovieCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    year?: SortOrder
    duration?: SortOrder
    description?: SortOrder
    posterUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MovieAvgOrderByAggregateInput = {
    year?: SortOrder
    duration?: SortOrder
  }

  export type MovieMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    year?: SortOrder
    duration?: SortOrder
    description?: SortOrder
    posterUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MovieMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    year?: SortOrder
    duration?: SortOrder
    description?: SortOrder
    posterUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MovieSumOrderByAggregateInput = {
    year?: SortOrder
    duration?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type GenreCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type GenreMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type GenreMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type DirectorFirstNameLastNameCompoundUniqueInput = {
    firstName: string
    lastName: string
  }

  export type DirectorCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
  }

  export type DirectorMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
  }

  export type DirectorMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
  }

  export type EntryTagListRelationFilter = {
    every?: EntryTagWhereInput
    some?: EntryTagWhereInput
    none?: EntryTagWhereInput
  }

  export type EntryTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type MovieScalarRelationFilter = {
    is?: MovieWhereInput
    isNot?: MovieWhereInput
  }

  export type DiaryEntryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    lastWatchedDate?: SortOrder
    watchedCount?: SortOrder
    rating?: SortOrder
    review?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DiaryEntryAvgOrderByAggregateInput = {
    watchedCount?: SortOrder
    rating?: SortOrder
  }

  export type DiaryEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    lastWatchedDate?: SortOrder
    watchedCount?: SortOrder
    rating?: SortOrder
    review?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DiaryEntryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    movieId?: SortOrder
    lastWatchedDate?: SortOrder
    watchedCount?: SortOrder
    rating?: SortOrder
    review?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DiaryEntrySumOrderByAggregateInput = {
    watchedCount?: SortOrder
    rating?: SortOrder
  }

  export type DiaryEntryScalarRelationFilter = {
    is?: DiaryEntryWhereInput
    isNot?: DiaryEntryWhereInput
  }

  export type TagScalarRelationFilter = {
    is?: TagWhereInput
    isNot?: TagWhereInput
  }

  export type EntryTagDiaryEntryIdTagIdCompoundUniqueInput = {
    diaryEntryId: string
    tagId: string
  }

  export type EntryTagCountOrderByAggregateInput = {
    diaryEntryId?: SortOrder
    tagId?: SortOrder
  }

  export type EntryTagMaxOrderByAggregateInput = {
    diaryEntryId?: SortOrder
    tagId?: SortOrder
  }

  export type EntryTagMinOrderByAggregateInput = {
    diaryEntryId?: SortOrder
    tagId?: SortOrder
  }

  export type GenreScalarRelationFilter = {
    is?: GenreWhereInput
    isNot?: GenreWhereInput
  }

  export type MovieGenreMovieIdGenreIdCompoundUniqueInput = {
    movieId: string
    genreId: string
  }

  export type MovieGenreCountOrderByAggregateInput = {
    movieId?: SortOrder
    genreId?: SortOrder
  }

  export type MovieGenreMaxOrderByAggregateInput = {
    movieId?: SortOrder
    genreId?: SortOrder
  }

  export type MovieGenreMinOrderByAggregateInput = {
    movieId?: SortOrder
    genreId?: SortOrder
  }

  export type DirectorScalarRelationFilter = {
    is?: DirectorWhereInput
    isNot?: DirectorWhereInput
  }

  export type MovieDirectorMovieIdDirectorIdCompoundUniqueInput = {
    movieId: string
    directorId: string
  }

  export type MovieDirectorCountOrderByAggregateInput = {
    movieId?: SortOrder
    directorId?: SortOrder
  }

  export type MovieDirectorMaxOrderByAggregateInput = {
    movieId?: SortOrder
    directorId?: SortOrder
  }

  export type MovieDirectorMinOrderByAggregateInput = {
    movieId?: SortOrder
    directorId?: SortOrder
  }

  export type UserFollowFollowerIdFolloweeIdCompoundUniqueInput = {
    followerId: string
    followeeId: string
  }

  export type UserFollowCountOrderByAggregateInput = {
    followerId?: SortOrder
    followeeId?: SortOrder
  }

  export type UserFollowMaxOrderByAggregateInput = {
    followerId?: SortOrder
    followeeId?: SortOrder
  }

  export type UserFollowMinOrderByAggregateInput = {
    followerId?: SortOrder
    followeeId?: SortOrder
  }

  export type EntryLikeUserIdDiaryEntryIdCompoundUniqueInput = {
    userId: string
    diaryEntryId: string
  }

  export type EntryLikeCountOrderByAggregateInput = {
    userId?: SortOrder
    diaryEntryId?: SortOrder
  }

  export type EntryLikeMaxOrderByAggregateInput = {
    userId?: SortOrder
    diaryEntryId?: SortOrder
  }

  export type EntryLikeMinOrderByAggregateInput = {
    userId?: SortOrder
    diaryEntryId?: SortOrder
  }

  export type ActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type ActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type ActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
  }

  export type DiaryEntryCreateNestedManyWithoutUserInput = {
    create?: XOR<DiaryEntryCreateWithoutUserInput, DiaryEntryUncheckedCreateWithoutUserInput> | DiaryEntryCreateWithoutUserInput[] | DiaryEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DiaryEntryCreateOrConnectWithoutUserInput | DiaryEntryCreateOrConnectWithoutUserInput[]
    createMany?: DiaryEntryCreateManyUserInputEnvelope
    connect?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
  }

  export type UserFollowCreateNestedManyWithoutFollowerInput = {
    create?: XOR<UserFollowCreateWithoutFollowerInput, UserFollowUncheckedCreateWithoutFollowerInput> | UserFollowCreateWithoutFollowerInput[] | UserFollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: UserFollowCreateOrConnectWithoutFollowerInput | UserFollowCreateOrConnectWithoutFollowerInput[]
    createMany?: UserFollowCreateManyFollowerInputEnvelope
    connect?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
  }

  export type UserFollowCreateNestedManyWithoutFolloweeInput = {
    create?: XOR<UserFollowCreateWithoutFolloweeInput, UserFollowUncheckedCreateWithoutFolloweeInput> | UserFollowCreateWithoutFolloweeInput[] | UserFollowUncheckedCreateWithoutFolloweeInput[]
    connectOrCreate?: UserFollowCreateOrConnectWithoutFolloweeInput | UserFollowCreateOrConnectWithoutFolloweeInput[]
    createMany?: UserFollowCreateManyFolloweeInputEnvelope
    connect?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
  }

  export type EntryLikeCreateNestedManyWithoutUserInput = {
    create?: XOR<EntryLikeCreateWithoutUserInput, EntryLikeUncheckedCreateWithoutUserInput> | EntryLikeCreateWithoutUserInput[] | EntryLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EntryLikeCreateOrConnectWithoutUserInput | EntryLikeCreateOrConnectWithoutUserInput[]
    createMany?: EntryLikeCreateManyUserInputEnvelope
    connect?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
  }

  export type ActivityLogCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type DiaryEntryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<DiaryEntryCreateWithoutUserInput, DiaryEntryUncheckedCreateWithoutUserInput> | DiaryEntryCreateWithoutUserInput[] | DiaryEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DiaryEntryCreateOrConnectWithoutUserInput | DiaryEntryCreateOrConnectWithoutUserInput[]
    createMany?: DiaryEntryCreateManyUserInputEnvelope
    connect?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
  }

  export type UserFollowUncheckedCreateNestedManyWithoutFollowerInput = {
    create?: XOR<UserFollowCreateWithoutFollowerInput, UserFollowUncheckedCreateWithoutFollowerInput> | UserFollowCreateWithoutFollowerInput[] | UserFollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: UserFollowCreateOrConnectWithoutFollowerInput | UserFollowCreateOrConnectWithoutFollowerInput[]
    createMany?: UserFollowCreateManyFollowerInputEnvelope
    connect?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
  }

  export type UserFollowUncheckedCreateNestedManyWithoutFolloweeInput = {
    create?: XOR<UserFollowCreateWithoutFolloweeInput, UserFollowUncheckedCreateWithoutFolloweeInput> | UserFollowCreateWithoutFolloweeInput[] | UserFollowUncheckedCreateWithoutFolloweeInput[]
    connectOrCreate?: UserFollowCreateOrConnectWithoutFolloweeInput | UserFollowCreateOrConnectWithoutFolloweeInput[]
    createMany?: UserFollowCreateManyFolloweeInputEnvelope
    connect?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
  }

  export type EntryLikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EntryLikeCreateWithoutUserInput, EntryLikeUncheckedCreateWithoutUserInput> | EntryLikeCreateWithoutUserInput[] | EntryLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EntryLikeCreateOrConnectWithoutUserInput | EntryLikeCreateOrConnectWithoutUserInput[]
    createMany?: EntryLikeCreateManyUserInputEnvelope
    connect?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
  }

  export type ActivityLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DiaryEntryUpdateManyWithoutUserNestedInput = {
    create?: XOR<DiaryEntryCreateWithoutUserInput, DiaryEntryUncheckedCreateWithoutUserInput> | DiaryEntryCreateWithoutUserInput[] | DiaryEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DiaryEntryCreateOrConnectWithoutUserInput | DiaryEntryCreateOrConnectWithoutUserInput[]
    upsert?: DiaryEntryUpsertWithWhereUniqueWithoutUserInput | DiaryEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DiaryEntryCreateManyUserInputEnvelope
    set?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
    disconnect?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
    delete?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
    connect?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
    update?: DiaryEntryUpdateWithWhereUniqueWithoutUserInput | DiaryEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DiaryEntryUpdateManyWithWhereWithoutUserInput | DiaryEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DiaryEntryScalarWhereInput | DiaryEntryScalarWhereInput[]
  }

  export type UserFollowUpdateManyWithoutFollowerNestedInput = {
    create?: XOR<UserFollowCreateWithoutFollowerInput, UserFollowUncheckedCreateWithoutFollowerInput> | UserFollowCreateWithoutFollowerInput[] | UserFollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: UserFollowCreateOrConnectWithoutFollowerInput | UserFollowCreateOrConnectWithoutFollowerInput[]
    upsert?: UserFollowUpsertWithWhereUniqueWithoutFollowerInput | UserFollowUpsertWithWhereUniqueWithoutFollowerInput[]
    createMany?: UserFollowCreateManyFollowerInputEnvelope
    set?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
    disconnect?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
    delete?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
    connect?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
    update?: UserFollowUpdateWithWhereUniqueWithoutFollowerInput | UserFollowUpdateWithWhereUniqueWithoutFollowerInput[]
    updateMany?: UserFollowUpdateManyWithWhereWithoutFollowerInput | UserFollowUpdateManyWithWhereWithoutFollowerInput[]
    deleteMany?: UserFollowScalarWhereInput | UserFollowScalarWhereInput[]
  }

  export type UserFollowUpdateManyWithoutFolloweeNestedInput = {
    create?: XOR<UserFollowCreateWithoutFolloweeInput, UserFollowUncheckedCreateWithoutFolloweeInput> | UserFollowCreateWithoutFolloweeInput[] | UserFollowUncheckedCreateWithoutFolloweeInput[]
    connectOrCreate?: UserFollowCreateOrConnectWithoutFolloweeInput | UserFollowCreateOrConnectWithoutFolloweeInput[]
    upsert?: UserFollowUpsertWithWhereUniqueWithoutFolloweeInput | UserFollowUpsertWithWhereUniqueWithoutFolloweeInput[]
    createMany?: UserFollowCreateManyFolloweeInputEnvelope
    set?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
    disconnect?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
    delete?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
    connect?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
    update?: UserFollowUpdateWithWhereUniqueWithoutFolloweeInput | UserFollowUpdateWithWhereUniqueWithoutFolloweeInput[]
    updateMany?: UserFollowUpdateManyWithWhereWithoutFolloweeInput | UserFollowUpdateManyWithWhereWithoutFolloweeInput[]
    deleteMany?: UserFollowScalarWhereInput | UserFollowScalarWhereInput[]
  }

  export type EntryLikeUpdateManyWithoutUserNestedInput = {
    create?: XOR<EntryLikeCreateWithoutUserInput, EntryLikeUncheckedCreateWithoutUserInput> | EntryLikeCreateWithoutUserInput[] | EntryLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EntryLikeCreateOrConnectWithoutUserInput | EntryLikeCreateOrConnectWithoutUserInput[]
    upsert?: EntryLikeUpsertWithWhereUniqueWithoutUserInput | EntryLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EntryLikeCreateManyUserInputEnvelope
    set?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
    disconnect?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
    delete?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
    connect?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
    update?: EntryLikeUpdateWithWhereUniqueWithoutUserInput | EntryLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EntryLikeUpdateManyWithWhereWithoutUserInput | EntryLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EntryLikeScalarWhereInput | EntryLikeScalarWhereInput[]
  }

  export type ActivityLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutUserInput | ActivityLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutUserInput | ActivityLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutUserInput | ActivityLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type DiaryEntryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<DiaryEntryCreateWithoutUserInput, DiaryEntryUncheckedCreateWithoutUserInput> | DiaryEntryCreateWithoutUserInput[] | DiaryEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: DiaryEntryCreateOrConnectWithoutUserInput | DiaryEntryCreateOrConnectWithoutUserInput[]
    upsert?: DiaryEntryUpsertWithWhereUniqueWithoutUserInput | DiaryEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: DiaryEntryCreateManyUserInputEnvelope
    set?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
    disconnect?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
    delete?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
    connect?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
    update?: DiaryEntryUpdateWithWhereUniqueWithoutUserInput | DiaryEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: DiaryEntryUpdateManyWithWhereWithoutUserInput | DiaryEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: DiaryEntryScalarWhereInput | DiaryEntryScalarWhereInput[]
  }

  export type UserFollowUncheckedUpdateManyWithoutFollowerNestedInput = {
    create?: XOR<UserFollowCreateWithoutFollowerInput, UserFollowUncheckedCreateWithoutFollowerInput> | UserFollowCreateWithoutFollowerInput[] | UserFollowUncheckedCreateWithoutFollowerInput[]
    connectOrCreate?: UserFollowCreateOrConnectWithoutFollowerInput | UserFollowCreateOrConnectWithoutFollowerInput[]
    upsert?: UserFollowUpsertWithWhereUniqueWithoutFollowerInput | UserFollowUpsertWithWhereUniqueWithoutFollowerInput[]
    createMany?: UserFollowCreateManyFollowerInputEnvelope
    set?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
    disconnect?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
    delete?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
    connect?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
    update?: UserFollowUpdateWithWhereUniqueWithoutFollowerInput | UserFollowUpdateWithWhereUniqueWithoutFollowerInput[]
    updateMany?: UserFollowUpdateManyWithWhereWithoutFollowerInput | UserFollowUpdateManyWithWhereWithoutFollowerInput[]
    deleteMany?: UserFollowScalarWhereInput | UserFollowScalarWhereInput[]
  }

  export type UserFollowUncheckedUpdateManyWithoutFolloweeNestedInput = {
    create?: XOR<UserFollowCreateWithoutFolloweeInput, UserFollowUncheckedCreateWithoutFolloweeInput> | UserFollowCreateWithoutFolloweeInput[] | UserFollowUncheckedCreateWithoutFolloweeInput[]
    connectOrCreate?: UserFollowCreateOrConnectWithoutFolloweeInput | UserFollowCreateOrConnectWithoutFolloweeInput[]
    upsert?: UserFollowUpsertWithWhereUniqueWithoutFolloweeInput | UserFollowUpsertWithWhereUniqueWithoutFolloweeInput[]
    createMany?: UserFollowCreateManyFolloweeInputEnvelope
    set?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
    disconnect?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
    delete?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
    connect?: UserFollowWhereUniqueInput | UserFollowWhereUniqueInput[]
    update?: UserFollowUpdateWithWhereUniqueWithoutFolloweeInput | UserFollowUpdateWithWhereUniqueWithoutFolloweeInput[]
    updateMany?: UserFollowUpdateManyWithWhereWithoutFolloweeInput | UserFollowUpdateManyWithWhereWithoutFolloweeInput[]
    deleteMany?: UserFollowScalarWhereInput | UserFollowScalarWhereInput[]
  }

  export type EntryLikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EntryLikeCreateWithoutUserInput, EntryLikeUncheckedCreateWithoutUserInput> | EntryLikeCreateWithoutUserInput[] | EntryLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EntryLikeCreateOrConnectWithoutUserInput | EntryLikeCreateOrConnectWithoutUserInput[]
    upsert?: EntryLikeUpsertWithWhereUniqueWithoutUserInput | EntryLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EntryLikeCreateManyUserInputEnvelope
    set?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
    disconnect?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
    delete?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
    connect?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
    update?: EntryLikeUpdateWithWhereUniqueWithoutUserInput | EntryLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EntryLikeUpdateManyWithWhereWithoutUserInput | EntryLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EntryLikeScalarWhereInput | EntryLikeScalarWhereInput[]
  }

  export type ActivityLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput> | ActivityLogCreateWithoutUserInput[] | ActivityLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutUserInput | ActivityLogCreateOrConnectWithoutUserInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutUserInput | ActivityLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityLogCreateManyUserInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutUserInput | ActivityLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutUserInput | ActivityLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type DiaryEntryCreateNestedManyWithoutMovieInput = {
    create?: XOR<DiaryEntryCreateWithoutMovieInput, DiaryEntryUncheckedCreateWithoutMovieInput> | DiaryEntryCreateWithoutMovieInput[] | DiaryEntryUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: DiaryEntryCreateOrConnectWithoutMovieInput | DiaryEntryCreateOrConnectWithoutMovieInput[]
    createMany?: DiaryEntryCreateManyMovieInputEnvelope
    connect?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
  }

  export type MovieGenreCreateNestedManyWithoutMovieInput = {
    create?: XOR<MovieGenreCreateWithoutMovieInput, MovieGenreUncheckedCreateWithoutMovieInput> | MovieGenreCreateWithoutMovieInput[] | MovieGenreUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: MovieGenreCreateOrConnectWithoutMovieInput | MovieGenreCreateOrConnectWithoutMovieInput[]
    createMany?: MovieGenreCreateManyMovieInputEnvelope
    connect?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
  }

  export type MovieDirectorCreateNestedManyWithoutMovieInput = {
    create?: XOR<MovieDirectorCreateWithoutMovieInput, MovieDirectorUncheckedCreateWithoutMovieInput> | MovieDirectorCreateWithoutMovieInput[] | MovieDirectorUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: MovieDirectorCreateOrConnectWithoutMovieInput | MovieDirectorCreateOrConnectWithoutMovieInput[]
    createMany?: MovieDirectorCreateManyMovieInputEnvelope
    connect?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
  }

  export type DiaryEntryUncheckedCreateNestedManyWithoutMovieInput = {
    create?: XOR<DiaryEntryCreateWithoutMovieInput, DiaryEntryUncheckedCreateWithoutMovieInput> | DiaryEntryCreateWithoutMovieInput[] | DiaryEntryUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: DiaryEntryCreateOrConnectWithoutMovieInput | DiaryEntryCreateOrConnectWithoutMovieInput[]
    createMany?: DiaryEntryCreateManyMovieInputEnvelope
    connect?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
  }

  export type MovieGenreUncheckedCreateNestedManyWithoutMovieInput = {
    create?: XOR<MovieGenreCreateWithoutMovieInput, MovieGenreUncheckedCreateWithoutMovieInput> | MovieGenreCreateWithoutMovieInput[] | MovieGenreUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: MovieGenreCreateOrConnectWithoutMovieInput | MovieGenreCreateOrConnectWithoutMovieInput[]
    createMany?: MovieGenreCreateManyMovieInputEnvelope
    connect?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
  }

  export type MovieDirectorUncheckedCreateNestedManyWithoutMovieInput = {
    create?: XOR<MovieDirectorCreateWithoutMovieInput, MovieDirectorUncheckedCreateWithoutMovieInput> | MovieDirectorCreateWithoutMovieInput[] | MovieDirectorUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: MovieDirectorCreateOrConnectWithoutMovieInput | MovieDirectorCreateOrConnectWithoutMovieInput[]
    createMany?: MovieDirectorCreateManyMovieInputEnvelope
    connect?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DiaryEntryUpdateManyWithoutMovieNestedInput = {
    create?: XOR<DiaryEntryCreateWithoutMovieInput, DiaryEntryUncheckedCreateWithoutMovieInput> | DiaryEntryCreateWithoutMovieInput[] | DiaryEntryUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: DiaryEntryCreateOrConnectWithoutMovieInput | DiaryEntryCreateOrConnectWithoutMovieInput[]
    upsert?: DiaryEntryUpsertWithWhereUniqueWithoutMovieInput | DiaryEntryUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: DiaryEntryCreateManyMovieInputEnvelope
    set?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
    disconnect?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
    delete?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
    connect?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
    update?: DiaryEntryUpdateWithWhereUniqueWithoutMovieInput | DiaryEntryUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: DiaryEntryUpdateManyWithWhereWithoutMovieInput | DiaryEntryUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: DiaryEntryScalarWhereInput | DiaryEntryScalarWhereInput[]
  }

  export type MovieGenreUpdateManyWithoutMovieNestedInput = {
    create?: XOR<MovieGenreCreateWithoutMovieInput, MovieGenreUncheckedCreateWithoutMovieInput> | MovieGenreCreateWithoutMovieInput[] | MovieGenreUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: MovieGenreCreateOrConnectWithoutMovieInput | MovieGenreCreateOrConnectWithoutMovieInput[]
    upsert?: MovieGenreUpsertWithWhereUniqueWithoutMovieInput | MovieGenreUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: MovieGenreCreateManyMovieInputEnvelope
    set?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    disconnect?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    delete?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    connect?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    update?: MovieGenreUpdateWithWhereUniqueWithoutMovieInput | MovieGenreUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: MovieGenreUpdateManyWithWhereWithoutMovieInput | MovieGenreUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: MovieGenreScalarWhereInput | MovieGenreScalarWhereInput[]
  }

  export type MovieDirectorUpdateManyWithoutMovieNestedInput = {
    create?: XOR<MovieDirectorCreateWithoutMovieInput, MovieDirectorUncheckedCreateWithoutMovieInput> | MovieDirectorCreateWithoutMovieInput[] | MovieDirectorUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: MovieDirectorCreateOrConnectWithoutMovieInput | MovieDirectorCreateOrConnectWithoutMovieInput[]
    upsert?: MovieDirectorUpsertWithWhereUniqueWithoutMovieInput | MovieDirectorUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: MovieDirectorCreateManyMovieInputEnvelope
    set?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
    disconnect?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
    delete?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
    connect?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
    update?: MovieDirectorUpdateWithWhereUniqueWithoutMovieInput | MovieDirectorUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: MovieDirectorUpdateManyWithWhereWithoutMovieInput | MovieDirectorUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: MovieDirectorScalarWhereInput | MovieDirectorScalarWhereInput[]
  }

  export type DiaryEntryUncheckedUpdateManyWithoutMovieNestedInput = {
    create?: XOR<DiaryEntryCreateWithoutMovieInput, DiaryEntryUncheckedCreateWithoutMovieInput> | DiaryEntryCreateWithoutMovieInput[] | DiaryEntryUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: DiaryEntryCreateOrConnectWithoutMovieInput | DiaryEntryCreateOrConnectWithoutMovieInput[]
    upsert?: DiaryEntryUpsertWithWhereUniqueWithoutMovieInput | DiaryEntryUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: DiaryEntryCreateManyMovieInputEnvelope
    set?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
    disconnect?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
    delete?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
    connect?: DiaryEntryWhereUniqueInput | DiaryEntryWhereUniqueInput[]
    update?: DiaryEntryUpdateWithWhereUniqueWithoutMovieInput | DiaryEntryUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: DiaryEntryUpdateManyWithWhereWithoutMovieInput | DiaryEntryUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: DiaryEntryScalarWhereInput | DiaryEntryScalarWhereInput[]
  }

  export type MovieGenreUncheckedUpdateManyWithoutMovieNestedInput = {
    create?: XOR<MovieGenreCreateWithoutMovieInput, MovieGenreUncheckedCreateWithoutMovieInput> | MovieGenreCreateWithoutMovieInput[] | MovieGenreUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: MovieGenreCreateOrConnectWithoutMovieInput | MovieGenreCreateOrConnectWithoutMovieInput[]
    upsert?: MovieGenreUpsertWithWhereUniqueWithoutMovieInput | MovieGenreUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: MovieGenreCreateManyMovieInputEnvelope
    set?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    disconnect?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    delete?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    connect?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    update?: MovieGenreUpdateWithWhereUniqueWithoutMovieInput | MovieGenreUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: MovieGenreUpdateManyWithWhereWithoutMovieInput | MovieGenreUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: MovieGenreScalarWhereInput | MovieGenreScalarWhereInput[]
  }

  export type MovieDirectorUncheckedUpdateManyWithoutMovieNestedInput = {
    create?: XOR<MovieDirectorCreateWithoutMovieInput, MovieDirectorUncheckedCreateWithoutMovieInput> | MovieDirectorCreateWithoutMovieInput[] | MovieDirectorUncheckedCreateWithoutMovieInput[]
    connectOrCreate?: MovieDirectorCreateOrConnectWithoutMovieInput | MovieDirectorCreateOrConnectWithoutMovieInput[]
    upsert?: MovieDirectorUpsertWithWhereUniqueWithoutMovieInput | MovieDirectorUpsertWithWhereUniqueWithoutMovieInput[]
    createMany?: MovieDirectorCreateManyMovieInputEnvelope
    set?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
    disconnect?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
    delete?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
    connect?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
    update?: MovieDirectorUpdateWithWhereUniqueWithoutMovieInput | MovieDirectorUpdateWithWhereUniqueWithoutMovieInput[]
    updateMany?: MovieDirectorUpdateManyWithWhereWithoutMovieInput | MovieDirectorUpdateManyWithWhereWithoutMovieInput[]
    deleteMany?: MovieDirectorScalarWhereInput | MovieDirectorScalarWhereInput[]
  }

  export type MovieGenreCreateNestedManyWithoutGenreInput = {
    create?: XOR<MovieGenreCreateWithoutGenreInput, MovieGenreUncheckedCreateWithoutGenreInput> | MovieGenreCreateWithoutGenreInput[] | MovieGenreUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: MovieGenreCreateOrConnectWithoutGenreInput | MovieGenreCreateOrConnectWithoutGenreInput[]
    createMany?: MovieGenreCreateManyGenreInputEnvelope
    connect?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
  }

  export type MovieGenreUncheckedCreateNestedManyWithoutGenreInput = {
    create?: XOR<MovieGenreCreateWithoutGenreInput, MovieGenreUncheckedCreateWithoutGenreInput> | MovieGenreCreateWithoutGenreInput[] | MovieGenreUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: MovieGenreCreateOrConnectWithoutGenreInput | MovieGenreCreateOrConnectWithoutGenreInput[]
    createMany?: MovieGenreCreateManyGenreInputEnvelope
    connect?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
  }

  export type MovieGenreUpdateManyWithoutGenreNestedInput = {
    create?: XOR<MovieGenreCreateWithoutGenreInput, MovieGenreUncheckedCreateWithoutGenreInput> | MovieGenreCreateWithoutGenreInput[] | MovieGenreUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: MovieGenreCreateOrConnectWithoutGenreInput | MovieGenreCreateOrConnectWithoutGenreInput[]
    upsert?: MovieGenreUpsertWithWhereUniqueWithoutGenreInput | MovieGenreUpsertWithWhereUniqueWithoutGenreInput[]
    createMany?: MovieGenreCreateManyGenreInputEnvelope
    set?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    disconnect?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    delete?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    connect?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    update?: MovieGenreUpdateWithWhereUniqueWithoutGenreInput | MovieGenreUpdateWithWhereUniqueWithoutGenreInput[]
    updateMany?: MovieGenreUpdateManyWithWhereWithoutGenreInput | MovieGenreUpdateManyWithWhereWithoutGenreInput[]
    deleteMany?: MovieGenreScalarWhereInput | MovieGenreScalarWhereInput[]
  }

  export type MovieGenreUncheckedUpdateManyWithoutGenreNestedInput = {
    create?: XOR<MovieGenreCreateWithoutGenreInput, MovieGenreUncheckedCreateWithoutGenreInput> | MovieGenreCreateWithoutGenreInput[] | MovieGenreUncheckedCreateWithoutGenreInput[]
    connectOrCreate?: MovieGenreCreateOrConnectWithoutGenreInput | MovieGenreCreateOrConnectWithoutGenreInput[]
    upsert?: MovieGenreUpsertWithWhereUniqueWithoutGenreInput | MovieGenreUpsertWithWhereUniqueWithoutGenreInput[]
    createMany?: MovieGenreCreateManyGenreInputEnvelope
    set?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    disconnect?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    delete?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    connect?: MovieGenreWhereUniqueInput | MovieGenreWhereUniqueInput[]
    update?: MovieGenreUpdateWithWhereUniqueWithoutGenreInput | MovieGenreUpdateWithWhereUniqueWithoutGenreInput[]
    updateMany?: MovieGenreUpdateManyWithWhereWithoutGenreInput | MovieGenreUpdateManyWithWhereWithoutGenreInput[]
    deleteMany?: MovieGenreScalarWhereInput | MovieGenreScalarWhereInput[]
  }

  export type MovieDirectorCreateNestedManyWithoutDirectorInput = {
    create?: XOR<MovieDirectorCreateWithoutDirectorInput, MovieDirectorUncheckedCreateWithoutDirectorInput> | MovieDirectorCreateWithoutDirectorInput[] | MovieDirectorUncheckedCreateWithoutDirectorInput[]
    connectOrCreate?: MovieDirectorCreateOrConnectWithoutDirectorInput | MovieDirectorCreateOrConnectWithoutDirectorInput[]
    createMany?: MovieDirectorCreateManyDirectorInputEnvelope
    connect?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
  }

  export type MovieDirectorUncheckedCreateNestedManyWithoutDirectorInput = {
    create?: XOR<MovieDirectorCreateWithoutDirectorInput, MovieDirectorUncheckedCreateWithoutDirectorInput> | MovieDirectorCreateWithoutDirectorInput[] | MovieDirectorUncheckedCreateWithoutDirectorInput[]
    connectOrCreate?: MovieDirectorCreateOrConnectWithoutDirectorInput | MovieDirectorCreateOrConnectWithoutDirectorInput[]
    createMany?: MovieDirectorCreateManyDirectorInputEnvelope
    connect?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
  }

  export type MovieDirectorUpdateManyWithoutDirectorNestedInput = {
    create?: XOR<MovieDirectorCreateWithoutDirectorInput, MovieDirectorUncheckedCreateWithoutDirectorInput> | MovieDirectorCreateWithoutDirectorInput[] | MovieDirectorUncheckedCreateWithoutDirectorInput[]
    connectOrCreate?: MovieDirectorCreateOrConnectWithoutDirectorInput | MovieDirectorCreateOrConnectWithoutDirectorInput[]
    upsert?: MovieDirectorUpsertWithWhereUniqueWithoutDirectorInput | MovieDirectorUpsertWithWhereUniqueWithoutDirectorInput[]
    createMany?: MovieDirectorCreateManyDirectorInputEnvelope
    set?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
    disconnect?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
    delete?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
    connect?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
    update?: MovieDirectorUpdateWithWhereUniqueWithoutDirectorInput | MovieDirectorUpdateWithWhereUniqueWithoutDirectorInput[]
    updateMany?: MovieDirectorUpdateManyWithWhereWithoutDirectorInput | MovieDirectorUpdateManyWithWhereWithoutDirectorInput[]
    deleteMany?: MovieDirectorScalarWhereInput | MovieDirectorScalarWhereInput[]
  }

  export type MovieDirectorUncheckedUpdateManyWithoutDirectorNestedInput = {
    create?: XOR<MovieDirectorCreateWithoutDirectorInput, MovieDirectorUncheckedCreateWithoutDirectorInput> | MovieDirectorCreateWithoutDirectorInput[] | MovieDirectorUncheckedCreateWithoutDirectorInput[]
    connectOrCreate?: MovieDirectorCreateOrConnectWithoutDirectorInput | MovieDirectorCreateOrConnectWithoutDirectorInput[]
    upsert?: MovieDirectorUpsertWithWhereUniqueWithoutDirectorInput | MovieDirectorUpsertWithWhereUniqueWithoutDirectorInput[]
    createMany?: MovieDirectorCreateManyDirectorInputEnvelope
    set?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
    disconnect?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
    delete?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
    connect?: MovieDirectorWhereUniqueInput | MovieDirectorWhereUniqueInput[]
    update?: MovieDirectorUpdateWithWhereUniqueWithoutDirectorInput | MovieDirectorUpdateWithWhereUniqueWithoutDirectorInput[]
    updateMany?: MovieDirectorUpdateManyWithWhereWithoutDirectorInput | MovieDirectorUpdateManyWithWhereWithoutDirectorInput[]
    deleteMany?: MovieDirectorScalarWhereInput | MovieDirectorScalarWhereInput[]
  }

  export type EntryTagCreateNestedManyWithoutTagInput = {
    create?: XOR<EntryTagCreateWithoutTagInput, EntryTagUncheckedCreateWithoutTagInput> | EntryTagCreateWithoutTagInput[] | EntryTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: EntryTagCreateOrConnectWithoutTagInput | EntryTagCreateOrConnectWithoutTagInput[]
    createMany?: EntryTagCreateManyTagInputEnvelope
    connect?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
  }

  export type EntryTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<EntryTagCreateWithoutTagInput, EntryTagUncheckedCreateWithoutTagInput> | EntryTagCreateWithoutTagInput[] | EntryTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: EntryTagCreateOrConnectWithoutTagInput | EntryTagCreateOrConnectWithoutTagInput[]
    createMany?: EntryTagCreateManyTagInputEnvelope
    connect?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
  }

  export type EntryTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<EntryTagCreateWithoutTagInput, EntryTagUncheckedCreateWithoutTagInput> | EntryTagCreateWithoutTagInput[] | EntryTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: EntryTagCreateOrConnectWithoutTagInput | EntryTagCreateOrConnectWithoutTagInput[]
    upsert?: EntryTagUpsertWithWhereUniqueWithoutTagInput | EntryTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: EntryTagCreateManyTagInputEnvelope
    set?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
    disconnect?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
    delete?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
    connect?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
    update?: EntryTagUpdateWithWhereUniqueWithoutTagInput | EntryTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: EntryTagUpdateManyWithWhereWithoutTagInput | EntryTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: EntryTagScalarWhereInput | EntryTagScalarWhereInput[]
  }

  export type EntryTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<EntryTagCreateWithoutTagInput, EntryTagUncheckedCreateWithoutTagInput> | EntryTagCreateWithoutTagInput[] | EntryTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: EntryTagCreateOrConnectWithoutTagInput | EntryTagCreateOrConnectWithoutTagInput[]
    upsert?: EntryTagUpsertWithWhereUniqueWithoutTagInput | EntryTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: EntryTagCreateManyTagInputEnvelope
    set?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
    disconnect?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
    delete?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
    connect?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
    update?: EntryTagUpdateWithWhereUniqueWithoutTagInput | EntryTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: EntryTagUpdateManyWithWhereWithoutTagInput | EntryTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: EntryTagScalarWhereInput | EntryTagScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDiaryEntryInput = {
    create?: XOR<UserCreateWithoutDiaryEntryInput, UserUncheckedCreateWithoutDiaryEntryInput>
    connectOrCreate?: UserCreateOrConnectWithoutDiaryEntryInput
    connect?: UserWhereUniqueInput
  }

  export type MovieCreateNestedOneWithoutDiaryEntryInput = {
    create?: XOR<MovieCreateWithoutDiaryEntryInput, MovieUncheckedCreateWithoutDiaryEntryInput>
    connectOrCreate?: MovieCreateOrConnectWithoutDiaryEntryInput
    connect?: MovieWhereUniqueInput
  }

  export type EntryTagCreateNestedManyWithoutEntryInput = {
    create?: XOR<EntryTagCreateWithoutEntryInput, EntryTagUncheckedCreateWithoutEntryInput> | EntryTagCreateWithoutEntryInput[] | EntryTagUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: EntryTagCreateOrConnectWithoutEntryInput | EntryTagCreateOrConnectWithoutEntryInput[]
    createMany?: EntryTagCreateManyEntryInputEnvelope
    connect?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
  }

  export type EntryLikeCreateNestedManyWithoutEntryInput = {
    create?: XOR<EntryLikeCreateWithoutEntryInput, EntryLikeUncheckedCreateWithoutEntryInput> | EntryLikeCreateWithoutEntryInput[] | EntryLikeUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: EntryLikeCreateOrConnectWithoutEntryInput | EntryLikeCreateOrConnectWithoutEntryInput[]
    createMany?: EntryLikeCreateManyEntryInputEnvelope
    connect?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
  }

  export type EntryTagUncheckedCreateNestedManyWithoutEntryInput = {
    create?: XOR<EntryTagCreateWithoutEntryInput, EntryTagUncheckedCreateWithoutEntryInput> | EntryTagCreateWithoutEntryInput[] | EntryTagUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: EntryTagCreateOrConnectWithoutEntryInput | EntryTagCreateOrConnectWithoutEntryInput[]
    createMany?: EntryTagCreateManyEntryInputEnvelope
    connect?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
  }

  export type EntryLikeUncheckedCreateNestedManyWithoutEntryInput = {
    create?: XOR<EntryLikeCreateWithoutEntryInput, EntryLikeUncheckedCreateWithoutEntryInput> | EntryLikeCreateWithoutEntryInput[] | EntryLikeUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: EntryLikeCreateOrConnectWithoutEntryInput | EntryLikeCreateOrConnectWithoutEntryInput[]
    createMany?: EntryLikeCreateManyEntryInputEnvelope
    connect?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutDiaryEntryNestedInput = {
    create?: XOR<UserCreateWithoutDiaryEntryInput, UserUncheckedCreateWithoutDiaryEntryInput>
    connectOrCreate?: UserCreateOrConnectWithoutDiaryEntryInput
    upsert?: UserUpsertWithoutDiaryEntryInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDiaryEntryInput, UserUpdateWithoutDiaryEntryInput>, UserUncheckedUpdateWithoutDiaryEntryInput>
  }

  export type MovieUpdateOneRequiredWithoutDiaryEntryNestedInput = {
    create?: XOR<MovieCreateWithoutDiaryEntryInput, MovieUncheckedCreateWithoutDiaryEntryInput>
    connectOrCreate?: MovieCreateOrConnectWithoutDiaryEntryInput
    upsert?: MovieUpsertWithoutDiaryEntryInput
    connect?: MovieWhereUniqueInput
    update?: XOR<XOR<MovieUpdateToOneWithWhereWithoutDiaryEntryInput, MovieUpdateWithoutDiaryEntryInput>, MovieUncheckedUpdateWithoutDiaryEntryInput>
  }

  export type EntryTagUpdateManyWithoutEntryNestedInput = {
    create?: XOR<EntryTagCreateWithoutEntryInput, EntryTagUncheckedCreateWithoutEntryInput> | EntryTagCreateWithoutEntryInput[] | EntryTagUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: EntryTagCreateOrConnectWithoutEntryInput | EntryTagCreateOrConnectWithoutEntryInput[]
    upsert?: EntryTagUpsertWithWhereUniqueWithoutEntryInput | EntryTagUpsertWithWhereUniqueWithoutEntryInput[]
    createMany?: EntryTagCreateManyEntryInputEnvelope
    set?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
    disconnect?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
    delete?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
    connect?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
    update?: EntryTagUpdateWithWhereUniqueWithoutEntryInput | EntryTagUpdateWithWhereUniqueWithoutEntryInput[]
    updateMany?: EntryTagUpdateManyWithWhereWithoutEntryInput | EntryTagUpdateManyWithWhereWithoutEntryInput[]
    deleteMany?: EntryTagScalarWhereInput | EntryTagScalarWhereInput[]
  }

  export type EntryLikeUpdateManyWithoutEntryNestedInput = {
    create?: XOR<EntryLikeCreateWithoutEntryInput, EntryLikeUncheckedCreateWithoutEntryInput> | EntryLikeCreateWithoutEntryInput[] | EntryLikeUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: EntryLikeCreateOrConnectWithoutEntryInput | EntryLikeCreateOrConnectWithoutEntryInput[]
    upsert?: EntryLikeUpsertWithWhereUniqueWithoutEntryInput | EntryLikeUpsertWithWhereUniqueWithoutEntryInput[]
    createMany?: EntryLikeCreateManyEntryInputEnvelope
    set?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
    disconnect?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
    delete?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
    connect?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
    update?: EntryLikeUpdateWithWhereUniqueWithoutEntryInput | EntryLikeUpdateWithWhereUniqueWithoutEntryInput[]
    updateMany?: EntryLikeUpdateManyWithWhereWithoutEntryInput | EntryLikeUpdateManyWithWhereWithoutEntryInput[]
    deleteMany?: EntryLikeScalarWhereInput | EntryLikeScalarWhereInput[]
  }

  export type EntryTagUncheckedUpdateManyWithoutEntryNestedInput = {
    create?: XOR<EntryTagCreateWithoutEntryInput, EntryTagUncheckedCreateWithoutEntryInput> | EntryTagCreateWithoutEntryInput[] | EntryTagUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: EntryTagCreateOrConnectWithoutEntryInput | EntryTagCreateOrConnectWithoutEntryInput[]
    upsert?: EntryTagUpsertWithWhereUniqueWithoutEntryInput | EntryTagUpsertWithWhereUniqueWithoutEntryInput[]
    createMany?: EntryTagCreateManyEntryInputEnvelope
    set?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
    disconnect?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
    delete?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
    connect?: EntryTagWhereUniqueInput | EntryTagWhereUniqueInput[]
    update?: EntryTagUpdateWithWhereUniqueWithoutEntryInput | EntryTagUpdateWithWhereUniqueWithoutEntryInput[]
    updateMany?: EntryTagUpdateManyWithWhereWithoutEntryInput | EntryTagUpdateManyWithWhereWithoutEntryInput[]
    deleteMany?: EntryTagScalarWhereInput | EntryTagScalarWhereInput[]
  }

  export type EntryLikeUncheckedUpdateManyWithoutEntryNestedInput = {
    create?: XOR<EntryLikeCreateWithoutEntryInput, EntryLikeUncheckedCreateWithoutEntryInput> | EntryLikeCreateWithoutEntryInput[] | EntryLikeUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: EntryLikeCreateOrConnectWithoutEntryInput | EntryLikeCreateOrConnectWithoutEntryInput[]
    upsert?: EntryLikeUpsertWithWhereUniqueWithoutEntryInput | EntryLikeUpsertWithWhereUniqueWithoutEntryInput[]
    createMany?: EntryLikeCreateManyEntryInputEnvelope
    set?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
    disconnect?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
    delete?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
    connect?: EntryLikeWhereUniqueInput | EntryLikeWhereUniqueInput[]
    update?: EntryLikeUpdateWithWhereUniqueWithoutEntryInput | EntryLikeUpdateWithWhereUniqueWithoutEntryInput[]
    updateMany?: EntryLikeUpdateManyWithWhereWithoutEntryInput | EntryLikeUpdateManyWithWhereWithoutEntryInput[]
    deleteMany?: EntryLikeScalarWhereInput | EntryLikeScalarWhereInput[]
  }

  export type DiaryEntryCreateNestedOneWithoutTagsInput = {
    create?: XOR<DiaryEntryCreateWithoutTagsInput, DiaryEntryUncheckedCreateWithoutTagsInput>
    connectOrCreate?: DiaryEntryCreateOrConnectWithoutTagsInput
    connect?: DiaryEntryWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutEntriesInput = {
    create?: XOR<TagCreateWithoutEntriesInput, TagUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: TagCreateOrConnectWithoutEntriesInput
    connect?: TagWhereUniqueInput
  }

  export type DiaryEntryUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<DiaryEntryCreateWithoutTagsInput, DiaryEntryUncheckedCreateWithoutTagsInput>
    connectOrCreate?: DiaryEntryCreateOrConnectWithoutTagsInput
    upsert?: DiaryEntryUpsertWithoutTagsInput
    connect?: DiaryEntryWhereUniqueInput
    update?: XOR<XOR<DiaryEntryUpdateToOneWithWhereWithoutTagsInput, DiaryEntryUpdateWithoutTagsInput>, DiaryEntryUncheckedUpdateWithoutTagsInput>
  }

  export type TagUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: XOR<TagCreateWithoutEntriesInput, TagUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: TagCreateOrConnectWithoutEntriesInput
    upsert?: TagUpsertWithoutEntriesInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutEntriesInput, TagUpdateWithoutEntriesInput>, TagUncheckedUpdateWithoutEntriesInput>
  }

  export type MovieCreateNestedOneWithoutGenresInput = {
    create?: XOR<MovieCreateWithoutGenresInput, MovieUncheckedCreateWithoutGenresInput>
    connectOrCreate?: MovieCreateOrConnectWithoutGenresInput
    connect?: MovieWhereUniqueInput
  }

  export type GenreCreateNestedOneWithoutMoviesInput = {
    create?: XOR<GenreCreateWithoutMoviesInput, GenreUncheckedCreateWithoutMoviesInput>
    connectOrCreate?: GenreCreateOrConnectWithoutMoviesInput
    connect?: GenreWhereUniqueInput
  }

  export type MovieUpdateOneRequiredWithoutGenresNestedInput = {
    create?: XOR<MovieCreateWithoutGenresInput, MovieUncheckedCreateWithoutGenresInput>
    connectOrCreate?: MovieCreateOrConnectWithoutGenresInput
    upsert?: MovieUpsertWithoutGenresInput
    connect?: MovieWhereUniqueInput
    update?: XOR<XOR<MovieUpdateToOneWithWhereWithoutGenresInput, MovieUpdateWithoutGenresInput>, MovieUncheckedUpdateWithoutGenresInput>
  }

  export type GenreUpdateOneRequiredWithoutMoviesNestedInput = {
    create?: XOR<GenreCreateWithoutMoviesInput, GenreUncheckedCreateWithoutMoviesInput>
    connectOrCreate?: GenreCreateOrConnectWithoutMoviesInput
    upsert?: GenreUpsertWithoutMoviesInput
    connect?: GenreWhereUniqueInput
    update?: XOR<XOR<GenreUpdateToOneWithWhereWithoutMoviesInput, GenreUpdateWithoutMoviesInput>, GenreUncheckedUpdateWithoutMoviesInput>
  }

  export type MovieCreateNestedOneWithoutDirectorsInput = {
    create?: XOR<MovieCreateWithoutDirectorsInput, MovieUncheckedCreateWithoutDirectorsInput>
    connectOrCreate?: MovieCreateOrConnectWithoutDirectorsInput
    connect?: MovieWhereUniqueInput
  }

  export type DirectorCreateNestedOneWithoutMoviesInput = {
    create?: XOR<DirectorCreateWithoutMoviesInput, DirectorUncheckedCreateWithoutMoviesInput>
    connectOrCreate?: DirectorCreateOrConnectWithoutMoviesInput
    connect?: DirectorWhereUniqueInput
  }

  export type MovieUpdateOneRequiredWithoutDirectorsNestedInput = {
    create?: XOR<MovieCreateWithoutDirectorsInput, MovieUncheckedCreateWithoutDirectorsInput>
    connectOrCreate?: MovieCreateOrConnectWithoutDirectorsInput
    upsert?: MovieUpsertWithoutDirectorsInput
    connect?: MovieWhereUniqueInput
    update?: XOR<XOR<MovieUpdateToOneWithWhereWithoutDirectorsInput, MovieUpdateWithoutDirectorsInput>, MovieUncheckedUpdateWithoutDirectorsInput>
  }

  export type DirectorUpdateOneRequiredWithoutMoviesNestedInput = {
    create?: XOR<DirectorCreateWithoutMoviesInput, DirectorUncheckedCreateWithoutMoviesInput>
    connectOrCreate?: DirectorCreateOrConnectWithoutMoviesInput
    upsert?: DirectorUpsertWithoutMoviesInput
    connect?: DirectorWhereUniqueInput
    update?: XOR<XOR<DirectorUpdateToOneWithWhereWithoutMoviesInput, DirectorUpdateWithoutMoviesInput>, DirectorUncheckedUpdateWithoutMoviesInput>
  }

  export type UserCreateNestedOneWithoutFollowersInput = {
    create?: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowersInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFollowingInput = {
    create?: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowingInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFollowersNestedInput = {
    create?: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowersInput
    upsert?: UserUpsertWithoutFollowersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowersInput, UserUpdateWithoutFollowersInput>, UserUncheckedUpdateWithoutFollowersInput>
  }

  export type UserUpdateOneRequiredWithoutFollowingNestedInput = {
    create?: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowingInput
    upsert?: UserUpsertWithoutFollowingInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowingInput, UserUpdateWithoutFollowingInput>, UserUncheckedUpdateWithoutFollowingInput>
  }

  export type UserCreateNestedOneWithoutEntryLikeInput = {
    create?: XOR<UserCreateWithoutEntryLikeInput, UserUncheckedCreateWithoutEntryLikeInput>
    connectOrCreate?: UserCreateOrConnectWithoutEntryLikeInput
    connect?: UserWhereUniqueInput
  }

  export type DiaryEntryCreateNestedOneWithoutLikesInput = {
    create?: XOR<DiaryEntryCreateWithoutLikesInput, DiaryEntryUncheckedCreateWithoutLikesInput>
    connectOrCreate?: DiaryEntryCreateOrConnectWithoutLikesInput
    connect?: DiaryEntryWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutEntryLikeNestedInput = {
    create?: XOR<UserCreateWithoutEntryLikeInput, UserUncheckedCreateWithoutEntryLikeInput>
    connectOrCreate?: UserCreateOrConnectWithoutEntryLikeInput
    upsert?: UserUpsertWithoutEntryLikeInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEntryLikeInput, UserUpdateWithoutEntryLikeInput>, UserUncheckedUpdateWithoutEntryLikeInput>
  }

  export type DiaryEntryUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<DiaryEntryCreateWithoutLikesInput, DiaryEntryUncheckedCreateWithoutLikesInput>
    connectOrCreate?: DiaryEntryCreateOrConnectWithoutLikesInput
    upsert?: DiaryEntryUpsertWithoutLikesInput
    connect?: DiaryEntryWhereUniqueInput
    update?: XOR<XOR<DiaryEntryUpdateToOneWithWhereWithoutLikesInput, DiaryEntryUpdateWithoutLikesInput>, DiaryEntryUncheckedUpdateWithoutLikesInput>
  }

  export type UserCreateNestedOneWithoutActivityLogInput = {
    create?: XOR<UserCreateWithoutActivityLogInput, UserUncheckedCreateWithoutActivityLogInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivityLogInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutActivityLogNestedInput = {
    create?: XOR<UserCreateWithoutActivityLogInput, UserUncheckedCreateWithoutActivityLogInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivityLogInput
    upsert?: UserUpsertWithoutActivityLogInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActivityLogInput, UserUpdateWithoutActivityLogInput>, UserUncheckedUpdateWithoutActivityLogInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DiaryEntryCreateWithoutUserInput = {
    id?: string
    lastWatchedDate: Date | string
    watchedCount?: number
    rating: number
    review?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    movie: MovieCreateNestedOneWithoutDiaryEntryInput
    tags?: EntryTagCreateNestedManyWithoutEntryInput
    likes?: EntryLikeCreateNestedManyWithoutEntryInput
  }

  export type DiaryEntryUncheckedCreateWithoutUserInput = {
    id?: string
    movieId: string
    lastWatchedDate: Date | string
    watchedCount?: number
    rating: number
    review?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: EntryTagUncheckedCreateNestedManyWithoutEntryInput
    likes?: EntryLikeUncheckedCreateNestedManyWithoutEntryInput
  }

  export type DiaryEntryCreateOrConnectWithoutUserInput = {
    where: DiaryEntryWhereUniqueInput
    create: XOR<DiaryEntryCreateWithoutUserInput, DiaryEntryUncheckedCreateWithoutUserInput>
  }

  export type DiaryEntryCreateManyUserInputEnvelope = {
    data: DiaryEntryCreateManyUserInput | DiaryEntryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserFollowCreateWithoutFollowerInput = {
    followee: UserCreateNestedOneWithoutFollowingInput
  }

  export type UserFollowUncheckedCreateWithoutFollowerInput = {
    followeeId: string
  }

  export type UserFollowCreateOrConnectWithoutFollowerInput = {
    where: UserFollowWhereUniqueInput
    create: XOR<UserFollowCreateWithoutFollowerInput, UserFollowUncheckedCreateWithoutFollowerInput>
  }

  export type UserFollowCreateManyFollowerInputEnvelope = {
    data: UserFollowCreateManyFollowerInput | UserFollowCreateManyFollowerInput[]
    skipDuplicates?: boolean
  }

  export type UserFollowCreateWithoutFolloweeInput = {
    follower: UserCreateNestedOneWithoutFollowersInput
  }

  export type UserFollowUncheckedCreateWithoutFolloweeInput = {
    followerId: string
  }

  export type UserFollowCreateOrConnectWithoutFolloweeInput = {
    where: UserFollowWhereUniqueInput
    create: XOR<UserFollowCreateWithoutFolloweeInput, UserFollowUncheckedCreateWithoutFolloweeInput>
  }

  export type UserFollowCreateManyFolloweeInputEnvelope = {
    data: UserFollowCreateManyFolloweeInput | UserFollowCreateManyFolloweeInput[]
    skipDuplicates?: boolean
  }

  export type EntryLikeCreateWithoutUserInput = {
    entry: DiaryEntryCreateNestedOneWithoutLikesInput
  }

  export type EntryLikeUncheckedCreateWithoutUserInput = {
    diaryEntryId: string
  }

  export type EntryLikeCreateOrConnectWithoutUserInput = {
    where: EntryLikeWhereUniqueInput
    create: XOR<EntryLikeCreateWithoutUserInput, EntryLikeUncheckedCreateWithoutUserInput>
  }

  export type EntryLikeCreateManyUserInputEnvelope = {
    data: EntryLikeCreateManyUserInput | EntryLikeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActivityLogCreateWithoutUserInput = {
    id?: string
    type: string
    details?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    details?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogCreateOrConnectWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    create: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput>
  }

  export type ActivityLogCreateManyUserInputEnvelope = {
    data: ActivityLogCreateManyUserInput | ActivityLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type DiaryEntryUpsertWithWhereUniqueWithoutUserInput = {
    where: DiaryEntryWhereUniqueInput
    update: XOR<DiaryEntryUpdateWithoutUserInput, DiaryEntryUncheckedUpdateWithoutUserInput>
    create: XOR<DiaryEntryCreateWithoutUserInput, DiaryEntryUncheckedCreateWithoutUserInput>
  }

  export type DiaryEntryUpdateWithWhereUniqueWithoutUserInput = {
    where: DiaryEntryWhereUniqueInput
    data: XOR<DiaryEntryUpdateWithoutUserInput, DiaryEntryUncheckedUpdateWithoutUserInput>
  }

  export type DiaryEntryUpdateManyWithWhereWithoutUserInput = {
    where: DiaryEntryScalarWhereInput
    data: XOR<DiaryEntryUpdateManyMutationInput, DiaryEntryUncheckedUpdateManyWithoutUserInput>
  }

  export type DiaryEntryScalarWhereInput = {
    AND?: DiaryEntryScalarWhereInput | DiaryEntryScalarWhereInput[]
    OR?: DiaryEntryScalarWhereInput[]
    NOT?: DiaryEntryScalarWhereInput | DiaryEntryScalarWhereInput[]
    id?: StringFilter<"DiaryEntry"> | string
    userId?: StringFilter<"DiaryEntry"> | string
    movieId?: StringFilter<"DiaryEntry"> | string
    lastWatchedDate?: DateTimeFilter<"DiaryEntry"> | Date | string
    watchedCount?: IntFilter<"DiaryEntry"> | number
    rating?: IntFilter<"DiaryEntry"> | number
    review?: StringNullableFilter<"DiaryEntry"> | string | null
    createdAt?: DateTimeFilter<"DiaryEntry"> | Date | string
    updatedAt?: DateTimeFilter<"DiaryEntry"> | Date | string
  }

  export type UserFollowUpsertWithWhereUniqueWithoutFollowerInput = {
    where: UserFollowWhereUniqueInput
    update: XOR<UserFollowUpdateWithoutFollowerInput, UserFollowUncheckedUpdateWithoutFollowerInput>
    create: XOR<UserFollowCreateWithoutFollowerInput, UserFollowUncheckedCreateWithoutFollowerInput>
  }

  export type UserFollowUpdateWithWhereUniqueWithoutFollowerInput = {
    where: UserFollowWhereUniqueInput
    data: XOR<UserFollowUpdateWithoutFollowerInput, UserFollowUncheckedUpdateWithoutFollowerInput>
  }

  export type UserFollowUpdateManyWithWhereWithoutFollowerInput = {
    where: UserFollowScalarWhereInput
    data: XOR<UserFollowUpdateManyMutationInput, UserFollowUncheckedUpdateManyWithoutFollowerInput>
  }

  export type UserFollowScalarWhereInput = {
    AND?: UserFollowScalarWhereInput | UserFollowScalarWhereInput[]
    OR?: UserFollowScalarWhereInput[]
    NOT?: UserFollowScalarWhereInput | UserFollowScalarWhereInput[]
    followerId?: StringFilter<"UserFollow"> | string
    followeeId?: StringFilter<"UserFollow"> | string
  }

  export type UserFollowUpsertWithWhereUniqueWithoutFolloweeInput = {
    where: UserFollowWhereUniqueInput
    update: XOR<UserFollowUpdateWithoutFolloweeInput, UserFollowUncheckedUpdateWithoutFolloweeInput>
    create: XOR<UserFollowCreateWithoutFolloweeInput, UserFollowUncheckedCreateWithoutFolloweeInput>
  }

  export type UserFollowUpdateWithWhereUniqueWithoutFolloweeInput = {
    where: UserFollowWhereUniqueInput
    data: XOR<UserFollowUpdateWithoutFolloweeInput, UserFollowUncheckedUpdateWithoutFolloweeInput>
  }

  export type UserFollowUpdateManyWithWhereWithoutFolloweeInput = {
    where: UserFollowScalarWhereInput
    data: XOR<UserFollowUpdateManyMutationInput, UserFollowUncheckedUpdateManyWithoutFolloweeInput>
  }

  export type EntryLikeUpsertWithWhereUniqueWithoutUserInput = {
    where: EntryLikeWhereUniqueInput
    update: XOR<EntryLikeUpdateWithoutUserInput, EntryLikeUncheckedUpdateWithoutUserInput>
    create: XOR<EntryLikeCreateWithoutUserInput, EntryLikeUncheckedCreateWithoutUserInput>
  }

  export type EntryLikeUpdateWithWhereUniqueWithoutUserInput = {
    where: EntryLikeWhereUniqueInput
    data: XOR<EntryLikeUpdateWithoutUserInput, EntryLikeUncheckedUpdateWithoutUserInput>
  }

  export type EntryLikeUpdateManyWithWhereWithoutUserInput = {
    where: EntryLikeScalarWhereInput
    data: XOR<EntryLikeUpdateManyMutationInput, EntryLikeUncheckedUpdateManyWithoutUserInput>
  }

  export type EntryLikeScalarWhereInput = {
    AND?: EntryLikeScalarWhereInput | EntryLikeScalarWhereInput[]
    OR?: EntryLikeScalarWhereInput[]
    NOT?: EntryLikeScalarWhereInput | EntryLikeScalarWhereInput[]
    userId?: StringFilter<"EntryLike"> | string
    diaryEntryId?: StringFilter<"EntryLike"> | string
  }

  export type ActivityLogUpsertWithWhereUniqueWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    update: XOR<ActivityLogUpdateWithoutUserInput, ActivityLogUncheckedUpdateWithoutUserInput>
    create: XOR<ActivityLogCreateWithoutUserInput, ActivityLogUncheckedCreateWithoutUserInput>
  }

  export type ActivityLogUpdateWithWhereUniqueWithoutUserInput = {
    where: ActivityLogWhereUniqueInput
    data: XOR<ActivityLogUpdateWithoutUserInput, ActivityLogUncheckedUpdateWithoutUserInput>
  }

  export type ActivityLogUpdateManyWithWhereWithoutUserInput = {
    where: ActivityLogScalarWhereInput
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyWithoutUserInput>
  }

  export type ActivityLogScalarWhereInput = {
    AND?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    OR?: ActivityLogScalarWhereInput[]
    NOT?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    type?: StringFilter<"ActivityLog"> | string
    details?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
    userId?: StringFilter<"ActivityLog"> | string
  }

  export type DiaryEntryCreateWithoutMovieInput = {
    id?: string
    lastWatchedDate: Date | string
    watchedCount?: number
    rating: number
    review?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDiaryEntryInput
    tags?: EntryTagCreateNestedManyWithoutEntryInput
    likes?: EntryLikeCreateNestedManyWithoutEntryInput
  }

  export type DiaryEntryUncheckedCreateWithoutMovieInput = {
    id?: string
    userId: string
    lastWatchedDate: Date | string
    watchedCount?: number
    rating: number
    review?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: EntryTagUncheckedCreateNestedManyWithoutEntryInput
    likes?: EntryLikeUncheckedCreateNestedManyWithoutEntryInput
  }

  export type DiaryEntryCreateOrConnectWithoutMovieInput = {
    where: DiaryEntryWhereUniqueInput
    create: XOR<DiaryEntryCreateWithoutMovieInput, DiaryEntryUncheckedCreateWithoutMovieInput>
  }

  export type DiaryEntryCreateManyMovieInputEnvelope = {
    data: DiaryEntryCreateManyMovieInput | DiaryEntryCreateManyMovieInput[]
    skipDuplicates?: boolean
  }

  export type MovieGenreCreateWithoutMovieInput = {
    genre: GenreCreateNestedOneWithoutMoviesInput
  }

  export type MovieGenreUncheckedCreateWithoutMovieInput = {
    genreId: string
  }

  export type MovieGenreCreateOrConnectWithoutMovieInput = {
    where: MovieGenreWhereUniqueInput
    create: XOR<MovieGenreCreateWithoutMovieInput, MovieGenreUncheckedCreateWithoutMovieInput>
  }

  export type MovieGenreCreateManyMovieInputEnvelope = {
    data: MovieGenreCreateManyMovieInput | MovieGenreCreateManyMovieInput[]
    skipDuplicates?: boolean
  }

  export type MovieDirectorCreateWithoutMovieInput = {
    director: DirectorCreateNestedOneWithoutMoviesInput
  }

  export type MovieDirectorUncheckedCreateWithoutMovieInput = {
    directorId: string
  }

  export type MovieDirectorCreateOrConnectWithoutMovieInput = {
    where: MovieDirectorWhereUniqueInput
    create: XOR<MovieDirectorCreateWithoutMovieInput, MovieDirectorUncheckedCreateWithoutMovieInput>
  }

  export type MovieDirectorCreateManyMovieInputEnvelope = {
    data: MovieDirectorCreateManyMovieInput | MovieDirectorCreateManyMovieInput[]
    skipDuplicates?: boolean
  }

  export type DiaryEntryUpsertWithWhereUniqueWithoutMovieInput = {
    where: DiaryEntryWhereUniqueInput
    update: XOR<DiaryEntryUpdateWithoutMovieInput, DiaryEntryUncheckedUpdateWithoutMovieInput>
    create: XOR<DiaryEntryCreateWithoutMovieInput, DiaryEntryUncheckedCreateWithoutMovieInput>
  }

  export type DiaryEntryUpdateWithWhereUniqueWithoutMovieInput = {
    where: DiaryEntryWhereUniqueInput
    data: XOR<DiaryEntryUpdateWithoutMovieInput, DiaryEntryUncheckedUpdateWithoutMovieInput>
  }

  export type DiaryEntryUpdateManyWithWhereWithoutMovieInput = {
    where: DiaryEntryScalarWhereInput
    data: XOR<DiaryEntryUpdateManyMutationInput, DiaryEntryUncheckedUpdateManyWithoutMovieInput>
  }

  export type MovieGenreUpsertWithWhereUniqueWithoutMovieInput = {
    where: MovieGenreWhereUniqueInput
    update: XOR<MovieGenreUpdateWithoutMovieInput, MovieGenreUncheckedUpdateWithoutMovieInput>
    create: XOR<MovieGenreCreateWithoutMovieInput, MovieGenreUncheckedCreateWithoutMovieInput>
  }

  export type MovieGenreUpdateWithWhereUniqueWithoutMovieInput = {
    where: MovieGenreWhereUniqueInput
    data: XOR<MovieGenreUpdateWithoutMovieInput, MovieGenreUncheckedUpdateWithoutMovieInput>
  }

  export type MovieGenreUpdateManyWithWhereWithoutMovieInput = {
    where: MovieGenreScalarWhereInput
    data: XOR<MovieGenreUpdateManyMutationInput, MovieGenreUncheckedUpdateManyWithoutMovieInput>
  }

  export type MovieGenreScalarWhereInput = {
    AND?: MovieGenreScalarWhereInput | MovieGenreScalarWhereInput[]
    OR?: MovieGenreScalarWhereInput[]
    NOT?: MovieGenreScalarWhereInput | MovieGenreScalarWhereInput[]
    movieId?: StringFilter<"MovieGenre"> | string
    genreId?: StringFilter<"MovieGenre"> | string
  }

  export type MovieDirectorUpsertWithWhereUniqueWithoutMovieInput = {
    where: MovieDirectorWhereUniqueInput
    update: XOR<MovieDirectorUpdateWithoutMovieInput, MovieDirectorUncheckedUpdateWithoutMovieInput>
    create: XOR<MovieDirectorCreateWithoutMovieInput, MovieDirectorUncheckedCreateWithoutMovieInput>
  }

  export type MovieDirectorUpdateWithWhereUniqueWithoutMovieInput = {
    where: MovieDirectorWhereUniqueInput
    data: XOR<MovieDirectorUpdateWithoutMovieInput, MovieDirectorUncheckedUpdateWithoutMovieInput>
  }

  export type MovieDirectorUpdateManyWithWhereWithoutMovieInput = {
    where: MovieDirectorScalarWhereInput
    data: XOR<MovieDirectorUpdateManyMutationInput, MovieDirectorUncheckedUpdateManyWithoutMovieInput>
  }

  export type MovieDirectorScalarWhereInput = {
    AND?: MovieDirectorScalarWhereInput | MovieDirectorScalarWhereInput[]
    OR?: MovieDirectorScalarWhereInput[]
    NOT?: MovieDirectorScalarWhereInput | MovieDirectorScalarWhereInput[]
    movieId?: StringFilter<"MovieDirector"> | string
    directorId?: StringFilter<"MovieDirector"> | string
  }

  export type MovieGenreCreateWithoutGenreInput = {
    movie: MovieCreateNestedOneWithoutGenresInput
  }

  export type MovieGenreUncheckedCreateWithoutGenreInput = {
    movieId: string
  }

  export type MovieGenreCreateOrConnectWithoutGenreInput = {
    where: MovieGenreWhereUniqueInput
    create: XOR<MovieGenreCreateWithoutGenreInput, MovieGenreUncheckedCreateWithoutGenreInput>
  }

  export type MovieGenreCreateManyGenreInputEnvelope = {
    data: MovieGenreCreateManyGenreInput | MovieGenreCreateManyGenreInput[]
    skipDuplicates?: boolean
  }

  export type MovieGenreUpsertWithWhereUniqueWithoutGenreInput = {
    where: MovieGenreWhereUniqueInput
    update: XOR<MovieGenreUpdateWithoutGenreInput, MovieGenreUncheckedUpdateWithoutGenreInput>
    create: XOR<MovieGenreCreateWithoutGenreInput, MovieGenreUncheckedCreateWithoutGenreInput>
  }

  export type MovieGenreUpdateWithWhereUniqueWithoutGenreInput = {
    where: MovieGenreWhereUniqueInput
    data: XOR<MovieGenreUpdateWithoutGenreInput, MovieGenreUncheckedUpdateWithoutGenreInput>
  }

  export type MovieGenreUpdateManyWithWhereWithoutGenreInput = {
    where: MovieGenreScalarWhereInput
    data: XOR<MovieGenreUpdateManyMutationInput, MovieGenreUncheckedUpdateManyWithoutGenreInput>
  }

  export type MovieDirectorCreateWithoutDirectorInput = {
    movie: MovieCreateNestedOneWithoutDirectorsInput
  }

  export type MovieDirectorUncheckedCreateWithoutDirectorInput = {
    movieId: string
  }

  export type MovieDirectorCreateOrConnectWithoutDirectorInput = {
    where: MovieDirectorWhereUniqueInput
    create: XOR<MovieDirectorCreateWithoutDirectorInput, MovieDirectorUncheckedCreateWithoutDirectorInput>
  }

  export type MovieDirectorCreateManyDirectorInputEnvelope = {
    data: MovieDirectorCreateManyDirectorInput | MovieDirectorCreateManyDirectorInput[]
    skipDuplicates?: boolean
  }

  export type MovieDirectorUpsertWithWhereUniqueWithoutDirectorInput = {
    where: MovieDirectorWhereUniqueInput
    update: XOR<MovieDirectorUpdateWithoutDirectorInput, MovieDirectorUncheckedUpdateWithoutDirectorInput>
    create: XOR<MovieDirectorCreateWithoutDirectorInput, MovieDirectorUncheckedCreateWithoutDirectorInput>
  }

  export type MovieDirectorUpdateWithWhereUniqueWithoutDirectorInput = {
    where: MovieDirectorWhereUniqueInput
    data: XOR<MovieDirectorUpdateWithoutDirectorInput, MovieDirectorUncheckedUpdateWithoutDirectorInput>
  }

  export type MovieDirectorUpdateManyWithWhereWithoutDirectorInput = {
    where: MovieDirectorScalarWhereInput
    data: XOR<MovieDirectorUpdateManyMutationInput, MovieDirectorUncheckedUpdateManyWithoutDirectorInput>
  }

  export type EntryTagCreateWithoutTagInput = {
    entry: DiaryEntryCreateNestedOneWithoutTagsInput
  }

  export type EntryTagUncheckedCreateWithoutTagInput = {
    diaryEntryId: string
  }

  export type EntryTagCreateOrConnectWithoutTagInput = {
    where: EntryTagWhereUniqueInput
    create: XOR<EntryTagCreateWithoutTagInput, EntryTagUncheckedCreateWithoutTagInput>
  }

  export type EntryTagCreateManyTagInputEnvelope = {
    data: EntryTagCreateManyTagInput | EntryTagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type EntryTagUpsertWithWhereUniqueWithoutTagInput = {
    where: EntryTagWhereUniqueInput
    update: XOR<EntryTagUpdateWithoutTagInput, EntryTagUncheckedUpdateWithoutTagInput>
    create: XOR<EntryTagCreateWithoutTagInput, EntryTagUncheckedCreateWithoutTagInput>
  }

  export type EntryTagUpdateWithWhereUniqueWithoutTagInput = {
    where: EntryTagWhereUniqueInput
    data: XOR<EntryTagUpdateWithoutTagInput, EntryTagUncheckedUpdateWithoutTagInput>
  }

  export type EntryTagUpdateManyWithWhereWithoutTagInput = {
    where: EntryTagScalarWhereInput
    data: XOR<EntryTagUpdateManyMutationInput, EntryTagUncheckedUpdateManyWithoutTagInput>
  }

  export type EntryTagScalarWhereInput = {
    AND?: EntryTagScalarWhereInput | EntryTagScalarWhereInput[]
    OR?: EntryTagScalarWhereInput[]
    NOT?: EntryTagScalarWhereInput | EntryTagScalarWhereInput[]
    diaryEntryId?: StringFilter<"EntryTag"> | string
    tagId?: StringFilter<"EntryTag"> | string
  }

  export type UserCreateWithoutDiaryEntryInput = {
    id?: string
    username: string
    email: string
    password: string
    photoUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    followers?: UserFollowCreateNestedManyWithoutFollowerInput
    following?: UserFollowCreateNestedManyWithoutFolloweeInput
    EntryLike?: EntryLikeCreateNestedManyWithoutUserInput
    ActivityLog?: ActivityLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDiaryEntryInput = {
    id?: string
    username: string
    email: string
    password: string
    photoUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    followers?: UserFollowUncheckedCreateNestedManyWithoutFollowerInput
    following?: UserFollowUncheckedCreateNestedManyWithoutFolloweeInput
    EntryLike?: EntryLikeUncheckedCreateNestedManyWithoutUserInput
    ActivityLog?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDiaryEntryInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDiaryEntryInput, UserUncheckedCreateWithoutDiaryEntryInput>
  }

  export type MovieCreateWithoutDiaryEntryInput = {
    id?: string
    title: string
    year: number
    duration: number
    description: string
    posterUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    genres?: MovieGenreCreateNestedManyWithoutMovieInput
    directors?: MovieDirectorCreateNestedManyWithoutMovieInput
  }

  export type MovieUncheckedCreateWithoutDiaryEntryInput = {
    id?: string
    title: string
    year: number
    duration: number
    description: string
    posterUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    genres?: MovieGenreUncheckedCreateNestedManyWithoutMovieInput
    directors?: MovieDirectorUncheckedCreateNestedManyWithoutMovieInput
  }

  export type MovieCreateOrConnectWithoutDiaryEntryInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutDiaryEntryInput, MovieUncheckedCreateWithoutDiaryEntryInput>
  }

  export type EntryTagCreateWithoutEntryInput = {
    tag: TagCreateNestedOneWithoutEntriesInput
  }

  export type EntryTagUncheckedCreateWithoutEntryInput = {
    tagId: string
  }

  export type EntryTagCreateOrConnectWithoutEntryInput = {
    where: EntryTagWhereUniqueInput
    create: XOR<EntryTagCreateWithoutEntryInput, EntryTagUncheckedCreateWithoutEntryInput>
  }

  export type EntryTagCreateManyEntryInputEnvelope = {
    data: EntryTagCreateManyEntryInput | EntryTagCreateManyEntryInput[]
    skipDuplicates?: boolean
  }

  export type EntryLikeCreateWithoutEntryInput = {
    user: UserCreateNestedOneWithoutEntryLikeInput
  }

  export type EntryLikeUncheckedCreateWithoutEntryInput = {
    userId: string
  }

  export type EntryLikeCreateOrConnectWithoutEntryInput = {
    where: EntryLikeWhereUniqueInput
    create: XOR<EntryLikeCreateWithoutEntryInput, EntryLikeUncheckedCreateWithoutEntryInput>
  }

  export type EntryLikeCreateManyEntryInputEnvelope = {
    data: EntryLikeCreateManyEntryInput | EntryLikeCreateManyEntryInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDiaryEntryInput = {
    update: XOR<UserUpdateWithoutDiaryEntryInput, UserUncheckedUpdateWithoutDiaryEntryInput>
    create: XOR<UserCreateWithoutDiaryEntryInput, UserUncheckedCreateWithoutDiaryEntryInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDiaryEntryInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDiaryEntryInput, UserUncheckedUpdateWithoutDiaryEntryInput>
  }

  export type UserUpdateWithoutDiaryEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followers?: UserFollowUpdateManyWithoutFollowerNestedInput
    following?: UserFollowUpdateManyWithoutFolloweeNestedInput
    EntryLike?: EntryLikeUpdateManyWithoutUserNestedInput
    ActivityLog?: ActivityLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDiaryEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followers?: UserFollowUncheckedUpdateManyWithoutFollowerNestedInput
    following?: UserFollowUncheckedUpdateManyWithoutFolloweeNestedInput
    EntryLike?: EntryLikeUncheckedUpdateManyWithoutUserNestedInput
    ActivityLog?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MovieUpsertWithoutDiaryEntryInput = {
    update: XOR<MovieUpdateWithoutDiaryEntryInput, MovieUncheckedUpdateWithoutDiaryEntryInput>
    create: XOR<MovieCreateWithoutDiaryEntryInput, MovieUncheckedCreateWithoutDiaryEntryInput>
    where?: MovieWhereInput
  }

  export type MovieUpdateToOneWithWhereWithoutDiaryEntryInput = {
    where?: MovieWhereInput
    data: XOR<MovieUpdateWithoutDiaryEntryInput, MovieUncheckedUpdateWithoutDiaryEntryInput>
  }

  export type MovieUpdateWithoutDiaryEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    posterUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    genres?: MovieGenreUpdateManyWithoutMovieNestedInput
    directors?: MovieDirectorUpdateManyWithoutMovieNestedInput
  }

  export type MovieUncheckedUpdateWithoutDiaryEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    posterUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    genres?: MovieGenreUncheckedUpdateManyWithoutMovieNestedInput
    directors?: MovieDirectorUncheckedUpdateManyWithoutMovieNestedInput
  }

  export type EntryTagUpsertWithWhereUniqueWithoutEntryInput = {
    where: EntryTagWhereUniqueInput
    update: XOR<EntryTagUpdateWithoutEntryInput, EntryTagUncheckedUpdateWithoutEntryInput>
    create: XOR<EntryTagCreateWithoutEntryInput, EntryTagUncheckedCreateWithoutEntryInput>
  }

  export type EntryTagUpdateWithWhereUniqueWithoutEntryInput = {
    where: EntryTagWhereUniqueInput
    data: XOR<EntryTagUpdateWithoutEntryInput, EntryTagUncheckedUpdateWithoutEntryInput>
  }

  export type EntryTagUpdateManyWithWhereWithoutEntryInput = {
    where: EntryTagScalarWhereInput
    data: XOR<EntryTagUpdateManyMutationInput, EntryTagUncheckedUpdateManyWithoutEntryInput>
  }

  export type EntryLikeUpsertWithWhereUniqueWithoutEntryInput = {
    where: EntryLikeWhereUniqueInput
    update: XOR<EntryLikeUpdateWithoutEntryInput, EntryLikeUncheckedUpdateWithoutEntryInput>
    create: XOR<EntryLikeCreateWithoutEntryInput, EntryLikeUncheckedCreateWithoutEntryInput>
  }

  export type EntryLikeUpdateWithWhereUniqueWithoutEntryInput = {
    where: EntryLikeWhereUniqueInput
    data: XOR<EntryLikeUpdateWithoutEntryInput, EntryLikeUncheckedUpdateWithoutEntryInput>
  }

  export type EntryLikeUpdateManyWithWhereWithoutEntryInput = {
    where: EntryLikeScalarWhereInput
    data: XOR<EntryLikeUpdateManyMutationInput, EntryLikeUncheckedUpdateManyWithoutEntryInput>
  }

  export type DiaryEntryCreateWithoutTagsInput = {
    id?: string
    lastWatchedDate: Date | string
    watchedCount?: number
    rating: number
    review?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDiaryEntryInput
    movie: MovieCreateNestedOneWithoutDiaryEntryInput
    likes?: EntryLikeCreateNestedManyWithoutEntryInput
  }

  export type DiaryEntryUncheckedCreateWithoutTagsInput = {
    id?: string
    userId: string
    movieId: string
    lastWatchedDate: Date | string
    watchedCount?: number
    rating: number
    review?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    likes?: EntryLikeUncheckedCreateNestedManyWithoutEntryInput
  }

  export type DiaryEntryCreateOrConnectWithoutTagsInput = {
    where: DiaryEntryWhereUniqueInput
    create: XOR<DiaryEntryCreateWithoutTagsInput, DiaryEntryUncheckedCreateWithoutTagsInput>
  }

  export type TagCreateWithoutEntriesInput = {
    id?: string
    name: string
  }

  export type TagUncheckedCreateWithoutEntriesInput = {
    id?: string
    name: string
  }

  export type TagCreateOrConnectWithoutEntriesInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutEntriesInput, TagUncheckedCreateWithoutEntriesInput>
  }

  export type DiaryEntryUpsertWithoutTagsInput = {
    update: XOR<DiaryEntryUpdateWithoutTagsInput, DiaryEntryUncheckedUpdateWithoutTagsInput>
    create: XOR<DiaryEntryCreateWithoutTagsInput, DiaryEntryUncheckedCreateWithoutTagsInput>
    where?: DiaryEntryWhereInput
  }

  export type DiaryEntryUpdateToOneWithWhereWithoutTagsInput = {
    where?: DiaryEntryWhereInput
    data: XOR<DiaryEntryUpdateWithoutTagsInput, DiaryEntryUncheckedUpdateWithoutTagsInput>
  }

  export type DiaryEntryUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastWatchedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    watchedCount?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDiaryEntryNestedInput
    movie?: MovieUpdateOneRequiredWithoutDiaryEntryNestedInput
    likes?: EntryLikeUpdateManyWithoutEntryNestedInput
  }

  export type DiaryEntryUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: StringFieldUpdateOperationsInput | string
    lastWatchedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    watchedCount?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: EntryLikeUncheckedUpdateManyWithoutEntryNestedInput
  }

  export type TagUpsertWithoutEntriesInput = {
    update: XOR<TagUpdateWithoutEntriesInput, TagUncheckedUpdateWithoutEntriesInput>
    create: XOR<TagCreateWithoutEntriesInput, TagUncheckedCreateWithoutEntriesInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutEntriesInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutEntriesInput, TagUncheckedUpdateWithoutEntriesInput>
  }

  export type TagUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type MovieCreateWithoutGenresInput = {
    id?: string
    title: string
    year: number
    duration: number
    description: string
    posterUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    DiaryEntry?: DiaryEntryCreateNestedManyWithoutMovieInput
    directors?: MovieDirectorCreateNestedManyWithoutMovieInput
  }

  export type MovieUncheckedCreateWithoutGenresInput = {
    id?: string
    title: string
    year: number
    duration: number
    description: string
    posterUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    DiaryEntry?: DiaryEntryUncheckedCreateNestedManyWithoutMovieInput
    directors?: MovieDirectorUncheckedCreateNestedManyWithoutMovieInput
  }

  export type MovieCreateOrConnectWithoutGenresInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutGenresInput, MovieUncheckedCreateWithoutGenresInput>
  }

  export type GenreCreateWithoutMoviesInput = {
    id?: string
    name: string
  }

  export type GenreUncheckedCreateWithoutMoviesInput = {
    id?: string
    name: string
  }

  export type GenreCreateOrConnectWithoutMoviesInput = {
    where: GenreWhereUniqueInput
    create: XOR<GenreCreateWithoutMoviesInput, GenreUncheckedCreateWithoutMoviesInput>
  }

  export type MovieUpsertWithoutGenresInput = {
    update: XOR<MovieUpdateWithoutGenresInput, MovieUncheckedUpdateWithoutGenresInput>
    create: XOR<MovieCreateWithoutGenresInput, MovieUncheckedCreateWithoutGenresInput>
    where?: MovieWhereInput
  }

  export type MovieUpdateToOneWithWhereWithoutGenresInput = {
    where?: MovieWhereInput
    data: XOR<MovieUpdateWithoutGenresInput, MovieUncheckedUpdateWithoutGenresInput>
  }

  export type MovieUpdateWithoutGenresInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    posterUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DiaryEntry?: DiaryEntryUpdateManyWithoutMovieNestedInput
    directors?: MovieDirectorUpdateManyWithoutMovieNestedInput
  }

  export type MovieUncheckedUpdateWithoutGenresInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    posterUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DiaryEntry?: DiaryEntryUncheckedUpdateManyWithoutMovieNestedInput
    directors?: MovieDirectorUncheckedUpdateManyWithoutMovieNestedInput
  }

  export type GenreUpsertWithoutMoviesInput = {
    update: XOR<GenreUpdateWithoutMoviesInput, GenreUncheckedUpdateWithoutMoviesInput>
    create: XOR<GenreCreateWithoutMoviesInput, GenreUncheckedCreateWithoutMoviesInput>
    where?: GenreWhereInput
  }

  export type GenreUpdateToOneWithWhereWithoutMoviesInput = {
    where?: GenreWhereInput
    data: XOR<GenreUpdateWithoutMoviesInput, GenreUncheckedUpdateWithoutMoviesInput>
  }

  export type GenreUpdateWithoutMoviesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type GenreUncheckedUpdateWithoutMoviesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type MovieCreateWithoutDirectorsInput = {
    id?: string
    title: string
    year: number
    duration: number
    description: string
    posterUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    DiaryEntry?: DiaryEntryCreateNestedManyWithoutMovieInput
    genres?: MovieGenreCreateNestedManyWithoutMovieInput
  }

  export type MovieUncheckedCreateWithoutDirectorsInput = {
    id?: string
    title: string
    year: number
    duration: number
    description: string
    posterUrl: string
    createdAt?: Date | string
    updatedAt?: Date | string
    DiaryEntry?: DiaryEntryUncheckedCreateNestedManyWithoutMovieInput
    genres?: MovieGenreUncheckedCreateNestedManyWithoutMovieInput
  }

  export type MovieCreateOrConnectWithoutDirectorsInput = {
    where: MovieWhereUniqueInput
    create: XOR<MovieCreateWithoutDirectorsInput, MovieUncheckedCreateWithoutDirectorsInput>
  }

  export type DirectorCreateWithoutMoviesInput = {
    id?: string
    firstName: string
    lastName: string
  }

  export type DirectorUncheckedCreateWithoutMoviesInput = {
    id?: string
    firstName: string
    lastName: string
  }

  export type DirectorCreateOrConnectWithoutMoviesInput = {
    where: DirectorWhereUniqueInput
    create: XOR<DirectorCreateWithoutMoviesInput, DirectorUncheckedCreateWithoutMoviesInput>
  }

  export type MovieUpsertWithoutDirectorsInput = {
    update: XOR<MovieUpdateWithoutDirectorsInput, MovieUncheckedUpdateWithoutDirectorsInput>
    create: XOR<MovieCreateWithoutDirectorsInput, MovieUncheckedCreateWithoutDirectorsInput>
    where?: MovieWhereInput
  }

  export type MovieUpdateToOneWithWhereWithoutDirectorsInput = {
    where?: MovieWhereInput
    data: XOR<MovieUpdateWithoutDirectorsInput, MovieUncheckedUpdateWithoutDirectorsInput>
  }

  export type MovieUpdateWithoutDirectorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    posterUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DiaryEntry?: DiaryEntryUpdateManyWithoutMovieNestedInput
    genres?: MovieGenreUpdateManyWithoutMovieNestedInput
  }

  export type MovieUncheckedUpdateWithoutDirectorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    description?: StringFieldUpdateOperationsInput | string
    posterUrl?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DiaryEntry?: DiaryEntryUncheckedUpdateManyWithoutMovieNestedInput
    genres?: MovieGenreUncheckedUpdateManyWithoutMovieNestedInput
  }

  export type DirectorUpsertWithoutMoviesInput = {
    update: XOR<DirectorUpdateWithoutMoviesInput, DirectorUncheckedUpdateWithoutMoviesInput>
    create: XOR<DirectorCreateWithoutMoviesInput, DirectorUncheckedCreateWithoutMoviesInput>
    where?: DirectorWhereInput
  }

  export type DirectorUpdateToOneWithWhereWithoutMoviesInput = {
    where?: DirectorWhereInput
    data: XOR<DirectorUpdateWithoutMoviesInput, DirectorUncheckedUpdateWithoutMoviesInput>
  }

  export type DirectorUpdateWithoutMoviesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
  }

  export type DirectorUncheckedUpdateWithoutMoviesInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutFollowersInput = {
    id?: string
    username: string
    email: string
    password: string
    photoUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    DiaryEntry?: DiaryEntryCreateNestedManyWithoutUserInput
    following?: UserFollowCreateNestedManyWithoutFolloweeInput
    EntryLike?: EntryLikeCreateNestedManyWithoutUserInput
    ActivityLog?: ActivityLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFollowersInput = {
    id?: string
    username: string
    email: string
    password: string
    photoUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    DiaryEntry?: DiaryEntryUncheckedCreateNestedManyWithoutUserInput
    following?: UserFollowUncheckedCreateNestedManyWithoutFolloweeInput
    EntryLike?: EntryLikeUncheckedCreateNestedManyWithoutUserInput
    ActivityLog?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFollowersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
  }

  export type UserCreateWithoutFollowingInput = {
    id?: string
    username: string
    email: string
    password: string
    photoUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    DiaryEntry?: DiaryEntryCreateNestedManyWithoutUserInput
    followers?: UserFollowCreateNestedManyWithoutFollowerInput
    EntryLike?: EntryLikeCreateNestedManyWithoutUserInput
    ActivityLog?: ActivityLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFollowingInput = {
    id?: string
    username: string
    email: string
    password: string
    photoUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    DiaryEntry?: DiaryEntryUncheckedCreateNestedManyWithoutUserInput
    followers?: UserFollowUncheckedCreateNestedManyWithoutFollowerInput
    EntryLike?: EntryLikeUncheckedCreateNestedManyWithoutUserInput
    ActivityLog?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFollowingInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
  }

  export type UserUpsertWithoutFollowersInput = {
    update: XOR<UserUpdateWithoutFollowersInput, UserUncheckedUpdateWithoutFollowersInput>
    create: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowersInput, UserUncheckedUpdateWithoutFollowersInput>
  }

  export type UserUpdateWithoutFollowersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DiaryEntry?: DiaryEntryUpdateManyWithoutUserNestedInput
    following?: UserFollowUpdateManyWithoutFolloweeNestedInput
    EntryLike?: EntryLikeUpdateManyWithoutUserNestedInput
    ActivityLog?: ActivityLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowersInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DiaryEntry?: DiaryEntryUncheckedUpdateManyWithoutUserNestedInput
    following?: UserFollowUncheckedUpdateManyWithoutFolloweeNestedInput
    EntryLike?: EntryLikeUncheckedUpdateManyWithoutUserNestedInput
    ActivityLog?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutFollowingInput = {
    update: XOR<UserUpdateWithoutFollowingInput, UserUncheckedUpdateWithoutFollowingInput>
    create: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowingInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowingInput, UserUncheckedUpdateWithoutFollowingInput>
  }

  export type UserUpdateWithoutFollowingInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DiaryEntry?: DiaryEntryUpdateManyWithoutUserNestedInput
    followers?: UserFollowUpdateManyWithoutFollowerNestedInput
    EntryLike?: EntryLikeUpdateManyWithoutUserNestedInput
    ActivityLog?: ActivityLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowingInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DiaryEntry?: DiaryEntryUncheckedUpdateManyWithoutUserNestedInput
    followers?: UserFollowUncheckedUpdateManyWithoutFollowerNestedInput
    EntryLike?: EntryLikeUncheckedUpdateManyWithoutUserNestedInput
    ActivityLog?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutEntryLikeInput = {
    id?: string
    username: string
    email: string
    password: string
    photoUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    DiaryEntry?: DiaryEntryCreateNestedManyWithoutUserInput
    followers?: UserFollowCreateNestedManyWithoutFollowerInput
    following?: UserFollowCreateNestedManyWithoutFolloweeInput
    ActivityLog?: ActivityLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEntryLikeInput = {
    id?: string
    username: string
    email: string
    password: string
    photoUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    DiaryEntry?: DiaryEntryUncheckedCreateNestedManyWithoutUserInput
    followers?: UserFollowUncheckedCreateNestedManyWithoutFollowerInput
    following?: UserFollowUncheckedCreateNestedManyWithoutFolloweeInput
    ActivityLog?: ActivityLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEntryLikeInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEntryLikeInput, UserUncheckedCreateWithoutEntryLikeInput>
  }

  export type DiaryEntryCreateWithoutLikesInput = {
    id?: string
    lastWatchedDate: Date | string
    watchedCount?: number
    rating: number
    review?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDiaryEntryInput
    movie: MovieCreateNestedOneWithoutDiaryEntryInput
    tags?: EntryTagCreateNestedManyWithoutEntryInput
  }

  export type DiaryEntryUncheckedCreateWithoutLikesInput = {
    id?: string
    userId: string
    movieId: string
    lastWatchedDate: Date | string
    watchedCount?: number
    rating: number
    review?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: EntryTagUncheckedCreateNestedManyWithoutEntryInput
  }

  export type DiaryEntryCreateOrConnectWithoutLikesInput = {
    where: DiaryEntryWhereUniqueInput
    create: XOR<DiaryEntryCreateWithoutLikesInput, DiaryEntryUncheckedCreateWithoutLikesInput>
  }

  export type UserUpsertWithoutEntryLikeInput = {
    update: XOR<UserUpdateWithoutEntryLikeInput, UserUncheckedUpdateWithoutEntryLikeInput>
    create: XOR<UserCreateWithoutEntryLikeInput, UserUncheckedCreateWithoutEntryLikeInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEntryLikeInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEntryLikeInput, UserUncheckedUpdateWithoutEntryLikeInput>
  }

  export type UserUpdateWithoutEntryLikeInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DiaryEntry?: DiaryEntryUpdateManyWithoutUserNestedInput
    followers?: UserFollowUpdateManyWithoutFollowerNestedInput
    following?: UserFollowUpdateManyWithoutFolloweeNestedInput
    ActivityLog?: ActivityLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEntryLikeInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DiaryEntry?: DiaryEntryUncheckedUpdateManyWithoutUserNestedInput
    followers?: UserFollowUncheckedUpdateManyWithoutFollowerNestedInput
    following?: UserFollowUncheckedUpdateManyWithoutFolloweeNestedInput
    ActivityLog?: ActivityLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DiaryEntryUpsertWithoutLikesInput = {
    update: XOR<DiaryEntryUpdateWithoutLikesInput, DiaryEntryUncheckedUpdateWithoutLikesInput>
    create: XOR<DiaryEntryCreateWithoutLikesInput, DiaryEntryUncheckedCreateWithoutLikesInput>
    where?: DiaryEntryWhereInput
  }

  export type DiaryEntryUpdateToOneWithWhereWithoutLikesInput = {
    where?: DiaryEntryWhereInput
    data: XOR<DiaryEntryUpdateWithoutLikesInput, DiaryEntryUncheckedUpdateWithoutLikesInput>
  }

  export type DiaryEntryUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastWatchedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    watchedCount?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDiaryEntryNestedInput
    movie?: MovieUpdateOneRequiredWithoutDiaryEntryNestedInput
    tags?: EntryTagUpdateManyWithoutEntryNestedInput
  }

  export type DiaryEntryUncheckedUpdateWithoutLikesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    movieId?: StringFieldUpdateOperationsInput | string
    lastWatchedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    watchedCount?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: EntryTagUncheckedUpdateManyWithoutEntryNestedInput
  }

  export type UserCreateWithoutActivityLogInput = {
    id?: string
    username: string
    email: string
    password: string
    photoUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    DiaryEntry?: DiaryEntryCreateNestedManyWithoutUserInput
    followers?: UserFollowCreateNestedManyWithoutFollowerInput
    following?: UserFollowCreateNestedManyWithoutFolloweeInput
    EntryLike?: EntryLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActivityLogInput = {
    id?: string
    username: string
    email: string
    password: string
    photoUrl?: string | null
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    DiaryEntry?: DiaryEntryUncheckedCreateNestedManyWithoutUserInput
    followers?: UserFollowUncheckedCreateNestedManyWithoutFollowerInput
    following?: UserFollowUncheckedCreateNestedManyWithoutFolloweeInput
    EntryLike?: EntryLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActivityLogInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActivityLogInput, UserUncheckedCreateWithoutActivityLogInput>
  }

  export type UserUpsertWithoutActivityLogInput = {
    update: XOR<UserUpdateWithoutActivityLogInput, UserUncheckedUpdateWithoutActivityLogInput>
    create: XOR<UserCreateWithoutActivityLogInput, UserUncheckedCreateWithoutActivityLogInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivityLogInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActivityLogInput, UserUncheckedUpdateWithoutActivityLogInput>
  }

  export type UserUpdateWithoutActivityLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DiaryEntry?: DiaryEntryUpdateManyWithoutUserNestedInput
    followers?: UserFollowUpdateManyWithoutFollowerNestedInput
    following?: UserFollowUpdateManyWithoutFolloweeNestedInput
    EntryLike?: EntryLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActivityLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    DiaryEntry?: DiaryEntryUncheckedUpdateManyWithoutUserNestedInput
    followers?: UserFollowUncheckedUpdateManyWithoutFollowerNestedInput
    following?: UserFollowUncheckedUpdateManyWithoutFolloweeNestedInput
    EntryLike?: EntryLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type DiaryEntryCreateManyUserInput = {
    id?: string
    movieId: string
    lastWatchedDate: Date | string
    watchedCount?: number
    rating: number
    review?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserFollowCreateManyFollowerInput = {
    followeeId: string
  }

  export type UserFollowCreateManyFolloweeInput = {
    followerId: string
  }

  export type EntryLikeCreateManyUserInput = {
    diaryEntryId: string
  }

  export type ActivityLogCreateManyUserInput = {
    id?: string
    type: string
    details?: string | null
    createdAt?: Date | string
  }

  export type DiaryEntryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastWatchedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    watchedCount?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movie?: MovieUpdateOneRequiredWithoutDiaryEntryNestedInput
    tags?: EntryTagUpdateManyWithoutEntryNestedInput
    likes?: EntryLikeUpdateManyWithoutEntryNestedInput
  }

  export type DiaryEntryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: StringFieldUpdateOperationsInput | string
    lastWatchedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    watchedCount?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: EntryTagUncheckedUpdateManyWithoutEntryNestedInput
    likes?: EntryLikeUncheckedUpdateManyWithoutEntryNestedInput
  }

  export type DiaryEntryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    movieId?: StringFieldUpdateOperationsInput | string
    lastWatchedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    watchedCount?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserFollowUpdateWithoutFollowerInput = {
    followee?: UserUpdateOneRequiredWithoutFollowingNestedInput
  }

  export type UserFollowUncheckedUpdateWithoutFollowerInput = {
    followeeId?: StringFieldUpdateOperationsInput | string
  }

  export type UserFollowUncheckedUpdateManyWithoutFollowerInput = {
    followeeId?: StringFieldUpdateOperationsInput | string
  }

  export type UserFollowUpdateWithoutFolloweeInput = {
    follower?: UserUpdateOneRequiredWithoutFollowersNestedInput
  }

  export type UserFollowUncheckedUpdateWithoutFolloweeInput = {
    followerId?: StringFieldUpdateOperationsInput | string
  }

  export type UserFollowUncheckedUpdateManyWithoutFolloweeInput = {
    followerId?: StringFieldUpdateOperationsInput | string
  }

  export type EntryLikeUpdateWithoutUserInput = {
    entry?: DiaryEntryUpdateOneRequiredWithoutLikesNestedInput
  }

  export type EntryLikeUncheckedUpdateWithoutUserInput = {
    diaryEntryId?: StringFieldUpdateOperationsInput | string
  }

  export type EntryLikeUncheckedUpdateManyWithoutUserInput = {
    diaryEntryId?: StringFieldUpdateOperationsInput | string
  }

  export type ActivityLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DiaryEntryCreateManyMovieInput = {
    id?: string
    userId: string
    lastWatchedDate: Date | string
    watchedCount?: number
    rating: number
    review?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MovieGenreCreateManyMovieInput = {
    genreId: string
  }

  export type MovieDirectorCreateManyMovieInput = {
    directorId: string
  }

  export type DiaryEntryUpdateWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    lastWatchedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    watchedCount?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDiaryEntryNestedInput
    tags?: EntryTagUpdateManyWithoutEntryNestedInput
    likes?: EntryLikeUpdateManyWithoutEntryNestedInput
  }

  export type DiaryEntryUncheckedUpdateWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lastWatchedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    watchedCount?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: EntryTagUncheckedUpdateManyWithoutEntryNestedInput
    likes?: EntryLikeUncheckedUpdateManyWithoutEntryNestedInput
  }

  export type DiaryEntryUncheckedUpdateManyWithoutMovieInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    lastWatchedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    watchedCount?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    review?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovieGenreUpdateWithoutMovieInput = {
    genre?: GenreUpdateOneRequiredWithoutMoviesNestedInput
  }

  export type MovieGenreUncheckedUpdateWithoutMovieInput = {
    genreId?: StringFieldUpdateOperationsInput | string
  }

  export type MovieGenreUncheckedUpdateManyWithoutMovieInput = {
    genreId?: StringFieldUpdateOperationsInput | string
  }

  export type MovieDirectorUpdateWithoutMovieInput = {
    director?: DirectorUpdateOneRequiredWithoutMoviesNestedInput
  }

  export type MovieDirectorUncheckedUpdateWithoutMovieInput = {
    directorId?: StringFieldUpdateOperationsInput | string
  }

  export type MovieDirectorUncheckedUpdateManyWithoutMovieInput = {
    directorId?: StringFieldUpdateOperationsInput | string
  }

  export type MovieGenreCreateManyGenreInput = {
    movieId: string
  }

  export type MovieGenreUpdateWithoutGenreInput = {
    movie?: MovieUpdateOneRequiredWithoutGenresNestedInput
  }

  export type MovieGenreUncheckedUpdateWithoutGenreInput = {
    movieId?: StringFieldUpdateOperationsInput | string
  }

  export type MovieGenreUncheckedUpdateManyWithoutGenreInput = {
    movieId?: StringFieldUpdateOperationsInput | string
  }

  export type MovieDirectorCreateManyDirectorInput = {
    movieId: string
  }

  export type MovieDirectorUpdateWithoutDirectorInput = {
    movie?: MovieUpdateOneRequiredWithoutDirectorsNestedInput
  }

  export type MovieDirectorUncheckedUpdateWithoutDirectorInput = {
    movieId?: StringFieldUpdateOperationsInput | string
  }

  export type MovieDirectorUncheckedUpdateManyWithoutDirectorInput = {
    movieId?: StringFieldUpdateOperationsInput | string
  }

  export type EntryTagCreateManyTagInput = {
    diaryEntryId: string
  }

  export type EntryTagUpdateWithoutTagInput = {
    entry?: DiaryEntryUpdateOneRequiredWithoutTagsNestedInput
  }

  export type EntryTagUncheckedUpdateWithoutTagInput = {
    diaryEntryId?: StringFieldUpdateOperationsInput | string
  }

  export type EntryTagUncheckedUpdateManyWithoutTagInput = {
    diaryEntryId?: StringFieldUpdateOperationsInput | string
  }

  export type EntryTagCreateManyEntryInput = {
    tagId: string
  }

  export type EntryLikeCreateManyEntryInput = {
    userId: string
  }

  export type EntryTagUpdateWithoutEntryInput = {
    tag?: TagUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type EntryTagUncheckedUpdateWithoutEntryInput = {
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type EntryTagUncheckedUpdateManyWithoutEntryInput = {
    tagId?: StringFieldUpdateOperationsInput | string
  }

  export type EntryLikeUpdateWithoutEntryInput = {
    user?: UserUpdateOneRequiredWithoutEntryLikeNestedInput
  }

  export type EntryLikeUncheckedUpdateWithoutEntryInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type EntryLikeUncheckedUpdateManyWithoutEntryInput = {
    userId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}