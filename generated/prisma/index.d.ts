
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
 * Model Folder
 * 
 */
export type Folder = $Result.DefaultSelection<Prisma.$FolderPayload>
/**
 * Model File
 * 
 */
export type File = $Result.DefaultSelection<Prisma.$FilePayload>
/**
 * Model FileVersion
 * 
 */
export type FileVersion = $Result.DefaultSelection<Prisma.$FileVersionPayload>
/**
 * Model Share
 * 
 */
export type Share = $Result.DefaultSelection<Prisma.$SharePayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model UploadSession
 * 
 */
export type UploadSession = $Result.DefaultSelection<Prisma.$UploadSessionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UploadStatus: {
  PENDING: 'PENDING',
  UPLOADING: 'UPLOADING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type UploadStatus = (typeof UploadStatus)[keyof typeof UploadStatus]


export const PermissionLevel: {
  view: 'view',
  edit: 'edit',
  comment: 'comment'
};

export type PermissionLevel = (typeof PermissionLevel)[keyof typeof PermissionLevel]


export const PlanType: {
  free: 'free',
  pro: 'pro',
  business: 'business'
};

export type PlanType = (typeof PlanType)[keyof typeof PlanType]


export const UserRole: {
  user: 'user',
  admin: 'admin'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]

}

export type UploadStatus = $Enums.UploadStatus

export const UploadStatus: typeof $Enums.UploadStatus

export type PermissionLevel = $Enums.PermissionLevel

export const PermissionLevel: typeof $Enums.PermissionLevel

export type PlanType = $Enums.PlanType

export const PlanType: typeof $Enums.PlanType

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

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
   * `prisma.folder`: Exposes CRUD operations for the **Folder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Folders
    * const folders = await prisma.folder.findMany()
    * ```
    */
  get folder(): Prisma.FolderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.file`: Exposes CRUD operations for the **File** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Files
    * const files = await prisma.file.findMany()
    * ```
    */
  get file(): Prisma.FileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fileVersion`: Exposes CRUD operations for the **FileVersion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FileVersions
    * const fileVersions = await prisma.fileVersion.findMany()
    * ```
    */
  get fileVersion(): Prisma.FileVersionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.share`: Exposes CRUD operations for the **Share** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shares
    * const shares = await prisma.share.findMany()
    * ```
    */
  get share(): Prisma.ShareDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.uploadSession`: Exposes CRUD operations for the **UploadSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UploadSessions
    * const uploadSessions = await prisma.uploadSession.findMany()
    * ```
    */
  get uploadSession(): Prisma.UploadSessionDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
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
    Folder: 'Folder',
    File: 'File',
    FileVersion: 'FileVersion',
    Share: 'Share',
    AuditLog: 'AuditLog',
    UploadSession: 'UploadSession'
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
      modelProps: "user" | "folder" | "file" | "fileVersion" | "share" | "auditLog" | "uploadSession"
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
      Folder: {
        payload: Prisma.$FolderPayload<ExtArgs>
        fields: Prisma.FolderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FolderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FolderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload>
          }
          findFirst: {
            args: Prisma.FolderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FolderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload>
          }
          findMany: {
            args: Prisma.FolderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload>[]
          }
          create: {
            args: Prisma.FolderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload>
          }
          createMany: {
            args: Prisma.FolderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FolderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload>[]
          }
          delete: {
            args: Prisma.FolderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload>
          }
          update: {
            args: Prisma.FolderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload>
          }
          deleteMany: {
            args: Prisma.FolderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FolderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FolderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload>[]
          }
          upsert: {
            args: Prisma.FolderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FolderPayload>
          }
          aggregate: {
            args: Prisma.FolderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFolder>
          }
          groupBy: {
            args: Prisma.FolderGroupByArgs<ExtArgs>
            result: $Utils.Optional<FolderGroupByOutputType>[]
          }
          count: {
            args: Prisma.FolderCountArgs<ExtArgs>
            result: $Utils.Optional<FolderCountAggregateOutputType> | number
          }
        }
      }
      File: {
        payload: Prisma.$FilePayload<ExtArgs>
        fields: Prisma.FileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          findFirst: {
            args: Prisma.FileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          findMany: {
            args: Prisma.FileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>[]
          }
          create: {
            args: Prisma.FileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          createMany: {
            args: Prisma.FileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>[]
          }
          delete: {
            args: Prisma.FileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          update: {
            args: Prisma.FileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          deleteMany: {
            args: Prisma.FileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>[]
          }
          upsert: {
            args: Prisma.FileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FilePayload>
          }
          aggregate: {
            args: Prisma.FileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFile>
          }
          groupBy: {
            args: Prisma.FileGroupByArgs<ExtArgs>
            result: $Utils.Optional<FileGroupByOutputType>[]
          }
          count: {
            args: Prisma.FileCountArgs<ExtArgs>
            result: $Utils.Optional<FileCountAggregateOutputType> | number
          }
        }
      }
      FileVersion: {
        payload: Prisma.$FileVersionPayload<ExtArgs>
        fields: Prisma.FileVersionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FileVersionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileVersionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FileVersionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileVersionPayload>
          }
          findFirst: {
            args: Prisma.FileVersionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileVersionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FileVersionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileVersionPayload>
          }
          findMany: {
            args: Prisma.FileVersionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileVersionPayload>[]
          }
          create: {
            args: Prisma.FileVersionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileVersionPayload>
          }
          createMany: {
            args: Prisma.FileVersionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FileVersionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileVersionPayload>[]
          }
          delete: {
            args: Prisma.FileVersionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileVersionPayload>
          }
          update: {
            args: Prisma.FileVersionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileVersionPayload>
          }
          deleteMany: {
            args: Prisma.FileVersionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FileVersionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FileVersionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileVersionPayload>[]
          }
          upsert: {
            args: Prisma.FileVersionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FileVersionPayload>
          }
          aggregate: {
            args: Prisma.FileVersionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFileVersion>
          }
          groupBy: {
            args: Prisma.FileVersionGroupByArgs<ExtArgs>
            result: $Utils.Optional<FileVersionGroupByOutputType>[]
          }
          count: {
            args: Prisma.FileVersionCountArgs<ExtArgs>
            result: $Utils.Optional<FileVersionCountAggregateOutputType> | number
          }
        }
      }
      Share: {
        payload: Prisma.$SharePayload<ExtArgs>
        fields: Prisma.ShareFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShareFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShareFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharePayload>
          }
          findFirst: {
            args: Prisma.ShareFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShareFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharePayload>
          }
          findMany: {
            args: Prisma.ShareFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharePayload>[]
          }
          create: {
            args: Prisma.ShareCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharePayload>
          }
          createMany: {
            args: Prisma.ShareCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ShareCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharePayload>[]
          }
          delete: {
            args: Prisma.ShareDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharePayload>
          }
          update: {
            args: Prisma.ShareUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharePayload>
          }
          deleteMany: {
            args: Prisma.ShareDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShareUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ShareUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharePayload>[]
          }
          upsert: {
            args: Prisma.ShareUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SharePayload>
          }
          aggregate: {
            args: Prisma.ShareAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShare>
          }
          groupBy: {
            args: Prisma.ShareGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShareGroupByOutputType>[]
          }
          count: {
            args: Prisma.ShareCountArgs<ExtArgs>
            result: $Utils.Optional<ShareCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      UploadSession: {
        payload: Prisma.$UploadSessionPayload<ExtArgs>
        fields: Prisma.UploadSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UploadSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UploadSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>
          }
          findFirst: {
            args: Prisma.UploadSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UploadSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>
          }
          findMany: {
            args: Prisma.UploadSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>[]
          }
          create: {
            args: Prisma.UploadSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>
          }
          createMany: {
            args: Prisma.UploadSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UploadSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>[]
          }
          delete: {
            args: Prisma.UploadSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>
          }
          update: {
            args: Prisma.UploadSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>
          }
          deleteMany: {
            args: Prisma.UploadSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UploadSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UploadSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>[]
          }
          upsert: {
            args: Prisma.UploadSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadSessionPayload>
          }
          aggregate: {
            args: Prisma.UploadSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUploadSession>
          }
          groupBy: {
            args: Prisma.UploadSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UploadSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.UploadSessionCountArgs<ExtArgs>
            result: $Utils.Optional<UploadSessionCountAggregateOutputType> | number
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
    folder?: FolderOmit
    file?: FileOmit
    fileVersion?: FileVersionOmit
    share?: ShareOmit
    auditLog?: AuditLogOmit
    uploadSession?: UploadSessionOmit
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
    folders: number
    files: number
    uploadSessions: number
    sharesCreated: number
    sharesReceived: number
    auditLogs: number
    fileVersions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    folders?: boolean | UserCountOutputTypeCountFoldersArgs
    files?: boolean | UserCountOutputTypeCountFilesArgs
    uploadSessions?: boolean | UserCountOutputTypeCountUploadSessionsArgs
    sharesCreated?: boolean | UserCountOutputTypeCountSharesCreatedArgs
    sharesReceived?: boolean | UserCountOutputTypeCountSharesReceivedArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
    fileVersions?: boolean | UserCountOutputTypeCountFileVersionsArgs
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
  export type UserCountOutputTypeCountFoldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FolderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUploadSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UploadSessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSharesCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShareWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSharesReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShareWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFileVersionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileVersionWhereInput
  }


  /**
   * Count Type FolderCountOutputType
   */

  export type FolderCountOutputType = {
    children: number
    files: number
    shares: number
  }

  export type FolderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | FolderCountOutputTypeCountChildrenArgs
    files?: boolean | FolderCountOutputTypeCountFilesArgs
    shares?: boolean | FolderCountOutputTypeCountSharesArgs
  }

  // Custom InputTypes
  /**
   * FolderCountOutputType without action
   */
  export type FolderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FolderCountOutputType
     */
    select?: FolderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FolderCountOutputType without action
   */
  export type FolderCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FolderWhereInput
  }

  /**
   * FolderCountOutputType without action
   */
  export type FolderCountOutputTypeCountFilesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileWhereInput
  }

  /**
   * FolderCountOutputType without action
   */
  export type FolderCountOutputTypeCountSharesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShareWhereInput
  }


  /**
   * Count Type FileCountOutputType
   */

  export type FileCountOutputType = {
    shares: number
    versions: number
  }

  export type FileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    shares?: boolean | FileCountOutputTypeCountSharesArgs
    versions?: boolean | FileCountOutputTypeCountVersionsArgs
  }

  // Custom InputTypes
  /**
   * FileCountOutputType without action
   */
  export type FileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileCountOutputType
     */
    select?: FileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FileCountOutputType without action
   */
  export type FileCountOutputTypeCountSharesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShareWhereInput
  }

  /**
   * FileCountOutputType without action
   */
  export type FileCountOutputTypeCountVersionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileVersionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    storageQuota: number | null
    storageUsed: number | null
  }

  export type UserSumAggregateOutputType = {
    storageQuota: bigint | null
    storageUsed: bigint | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    hexId: string | null
    role: $Enums.UserRole | null
    profilePicture: string | null
    profilePictureS3Key: string | null
    storageQuota: bigint | null
    storageUsed: bigint | null
    planType: $Enums.PlanType | null
    refreshToken: string | null
    passwordResetToken: string | null
    passwordResetExpiry: Date | null
    isEmailVerified: boolean | null
    mfaEnabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLoginAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    hexId: string | null
    role: $Enums.UserRole | null
    profilePicture: string | null
    profilePictureS3Key: string | null
    storageQuota: bigint | null
    storageUsed: bigint | null
    planType: $Enums.PlanType | null
    refreshToken: string | null
    passwordResetToken: string | null
    passwordResetExpiry: Date | null
    isEmailVerified: boolean | null
    mfaEnabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLoginAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    hexId: number
    role: number
    profilePicture: number
    profilePictureS3Key: number
    storageQuota: number
    storageUsed: number
    planType: number
    refreshToken: number
    passwordResetToken: number
    passwordResetExpiry: number
    isEmailVerified: number
    mfaEnabled: number
    createdAt: number
    updatedAt: number
    lastLoginAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    storageQuota?: true
    storageUsed?: true
  }

  export type UserSumAggregateInputType = {
    storageQuota?: true
    storageUsed?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    hexId?: true
    role?: true
    profilePicture?: true
    profilePictureS3Key?: true
    storageQuota?: true
    storageUsed?: true
    planType?: true
    refreshToken?: true
    passwordResetToken?: true
    passwordResetExpiry?: true
    isEmailVerified?: true
    mfaEnabled?: true
    createdAt?: true
    updatedAt?: true
    lastLoginAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    hexId?: true
    role?: true
    profilePicture?: true
    profilePictureS3Key?: true
    storageQuota?: true
    storageUsed?: true
    planType?: true
    refreshToken?: true
    passwordResetToken?: true
    passwordResetExpiry?: true
    isEmailVerified?: true
    mfaEnabled?: true
    createdAt?: true
    updatedAt?: true
    lastLoginAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    hexId?: true
    role?: true
    profilePicture?: true
    profilePictureS3Key?: true
    storageQuota?: true
    storageUsed?: true
    planType?: true
    refreshToken?: true
    passwordResetToken?: true
    passwordResetExpiry?: true
    isEmailVerified?: true
    mfaEnabled?: true
    createdAt?: true
    updatedAt?: true
    lastLoginAt?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    password: string | null
    hexId: string | null
    role: $Enums.UserRole
    profilePicture: string | null
    profilePictureS3Key: string | null
    storageQuota: bigint
    storageUsed: bigint
    planType: $Enums.PlanType
    refreshToken: string | null
    passwordResetToken: string | null
    passwordResetExpiry: Date | null
    isEmailVerified: boolean
    mfaEnabled: boolean
    createdAt: Date
    updatedAt: Date
    lastLoginAt: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    email?: boolean
    name?: boolean
    password?: boolean
    hexId?: boolean
    role?: boolean
    profilePicture?: boolean
    profilePictureS3Key?: boolean
    storageQuota?: boolean
    storageUsed?: boolean
    planType?: boolean
    refreshToken?: boolean
    passwordResetToken?: boolean
    passwordResetExpiry?: boolean
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLoginAt?: boolean
    folders?: boolean | User$foldersArgs<ExtArgs>
    files?: boolean | User$filesArgs<ExtArgs>
    uploadSessions?: boolean | User$uploadSessionsArgs<ExtArgs>
    sharesCreated?: boolean | User$sharesCreatedArgs<ExtArgs>
    sharesReceived?: boolean | User$sharesReceivedArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    fileVersions?: boolean | User$fileVersionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    hexId?: boolean
    role?: boolean
    profilePicture?: boolean
    profilePictureS3Key?: boolean
    storageQuota?: boolean
    storageUsed?: boolean
    planType?: boolean
    refreshToken?: boolean
    passwordResetToken?: boolean
    passwordResetExpiry?: boolean
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLoginAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    hexId?: boolean
    role?: boolean
    profilePicture?: boolean
    profilePictureS3Key?: boolean
    storageQuota?: boolean
    storageUsed?: boolean
    planType?: boolean
    refreshToken?: boolean
    passwordResetToken?: boolean
    passwordResetExpiry?: boolean
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLoginAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    hexId?: boolean
    role?: boolean
    profilePicture?: boolean
    profilePictureS3Key?: boolean
    storageQuota?: boolean
    storageUsed?: boolean
    planType?: boolean
    refreshToken?: boolean
    passwordResetToken?: boolean
    passwordResetExpiry?: boolean
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLoginAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password" | "hexId" | "role" | "profilePicture" | "profilePictureS3Key" | "storageQuota" | "storageUsed" | "planType" | "refreshToken" | "passwordResetToken" | "passwordResetExpiry" | "isEmailVerified" | "mfaEnabled" | "createdAt" | "updatedAt" | "lastLoginAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    folders?: boolean | User$foldersArgs<ExtArgs>
    files?: boolean | User$filesArgs<ExtArgs>
    uploadSessions?: boolean | User$uploadSessionsArgs<ExtArgs>
    sharesCreated?: boolean | User$sharesCreatedArgs<ExtArgs>
    sharesReceived?: boolean | User$sharesReceivedArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    fileVersions?: boolean | User$fileVersionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      folders: Prisma.$FolderPayload<ExtArgs>[]
      files: Prisma.$FilePayload<ExtArgs>[]
      uploadSessions: Prisma.$UploadSessionPayload<ExtArgs>[]
      sharesCreated: Prisma.$SharePayload<ExtArgs>[]
      sharesReceived: Prisma.$SharePayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
      fileVersions: Prisma.$FileVersionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      password: string | null
      hexId: string | null
      role: $Enums.UserRole
      profilePicture: string | null
      profilePictureS3Key: string | null
      storageQuota: bigint
      storageUsed: bigint
      planType: $Enums.PlanType
      refreshToken: string | null
      passwordResetToken: string | null
      passwordResetExpiry: Date | null
      isEmailVerified: boolean
      mfaEnabled: boolean
      createdAt: Date
      updatedAt: Date
      lastLoginAt: Date | null
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
    folders<T extends User$foldersArgs<ExtArgs> = {}>(args?: Subset<T, User$foldersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    files<T extends User$filesArgs<ExtArgs> = {}>(args?: Subset<T, User$filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    uploadSessions<T extends User$uploadSessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$uploadSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sharesCreated<T extends User$sharesCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$sharesCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SharePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sharesReceived<T extends User$sharesReceivedArgs<ExtArgs> = {}>(args?: Subset<T, User$sharesReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SharePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    fileVersions<T extends User$fileVersionsArgs<ExtArgs> = {}>(args?: Subset<T, User$fileVersionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly hexId: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly profilePicture: FieldRef<"User", 'String'>
    readonly profilePictureS3Key: FieldRef<"User", 'String'>
    readonly storageQuota: FieldRef<"User", 'BigInt'>
    readonly storageUsed: FieldRef<"User", 'BigInt'>
    readonly planType: FieldRef<"User", 'PlanType'>
    readonly refreshToken: FieldRef<"User", 'String'>
    readonly passwordResetToken: FieldRef<"User", 'String'>
    readonly passwordResetExpiry: FieldRef<"User", 'DateTime'>
    readonly isEmailVerified: FieldRef<"User", 'Boolean'>
    readonly mfaEnabled: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
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
   * User.folders
   */
  export type User$foldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    where?: FolderWhereInput
    orderBy?: FolderOrderByWithRelationInput | FolderOrderByWithRelationInput[]
    cursor?: FolderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FolderScalarFieldEnum | FolderScalarFieldEnum[]
  }

  /**
   * User.files
   */
  export type User$filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    where?: FileWhereInput
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    cursor?: FileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * User.uploadSessions
   */
  export type User$uploadSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    where?: UploadSessionWhereInput
    orderBy?: UploadSessionOrderByWithRelationInput | UploadSessionOrderByWithRelationInput[]
    cursor?: UploadSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UploadSessionScalarFieldEnum | UploadSessionScalarFieldEnum[]
  }

  /**
   * User.sharesCreated
   */
  export type User$sharesCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Share
     */
    select?: ShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Share
     */
    omit?: ShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareInclude<ExtArgs> | null
    where?: ShareWhereInput
    orderBy?: ShareOrderByWithRelationInput | ShareOrderByWithRelationInput[]
    cursor?: ShareWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShareScalarFieldEnum | ShareScalarFieldEnum[]
  }

  /**
   * User.sharesReceived
   */
  export type User$sharesReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Share
     */
    select?: ShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Share
     */
    omit?: ShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareInclude<ExtArgs> | null
    where?: ShareWhereInput
    orderBy?: ShareOrderByWithRelationInput | ShareOrderByWithRelationInput[]
    cursor?: ShareWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShareScalarFieldEnum | ShareScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User.fileVersions
   */
  export type User$fileVersionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileVersion
     */
    select?: FileVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileVersion
     */
    omit?: FileVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileVersionInclude<ExtArgs> | null
    where?: FileVersionWhereInput
    orderBy?: FileVersionOrderByWithRelationInput | FileVersionOrderByWithRelationInput[]
    cursor?: FileVersionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FileVersionScalarFieldEnum | FileVersionScalarFieldEnum[]
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
   * Model Folder
   */

  export type AggregateFolder = {
    _count: FolderCountAggregateOutputType | null
    _min: FolderMinAggregateOutputType | null
    _max: FolderMaxAggregateOutputType | null
  }

  export type FolderMinAggregateOutputType = {
    id: string | null
    name: string | null
    parentId: string | null
    userId: string | null
    color: string | null
    description: string | null
    isStarred: boolean | null
    isInTrash: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    trashedAt: Date | null
  }

  export type FolderMaxAggregateOutputType = {
    id: string | null
    name: string | null
    parentId: string | null
    userId: string | null
    color: string | null
    description: string | null
    isStarred: boolean | null
    isInTrash: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    trashedAt: Date | null
  }

  export type FolderCountAggregateOutputType = {
    id: number
    name: number
    parentId: number
    userId: number
    color: number
    description: number
    isStarred: number
    isInTrash: number
    createdAt: number
    updatedAt: number
    trashedAt: number
    _all: number
  }


  export type FolderMinAggregateInputType = {
    id?: true
    name?: true
    parentId?: true
    userId?: true
    color?: true
    description?: true
    isStarred?: true
    isInTrash?: true
    createdAt?: true
    updatedAt?: true
    trashedAt?: true
  }

  export type FolderMaxAggregateInputType = {
    id?: true
    name?: true
    parentId?: true
    userId?: true
    color?: true
    description?: true
    isStarred?: true
    isInTrash?: true
    createdAt?: true
    updatedAt?: true
    trashedAt?: true
  }

  export type FolderCountAggregateInputType = {
    id?: true
    name?: true
    parentId?: true
    userId?: true
    color?: true
    description?: true
    isStarred?: true
    isInTrash?: true
    createdAt?: true
    updatedAt?: true
    trashedAt?: true
    _all?: true
  }

  export type FolderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Folder to aggregate.
     */
    where?: FolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Folders to fetch.
     */
    orderBy?: FolderOrderByWithRelationInput | FolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Folders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Folders
    **/
    _count?: true | FolderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FolderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FolderMaxAggregateInputType
  }

  export type GetFolderAggregateType<T extends FolderAggregateArgs> = {
        [P in keyof T & keyof AggregateFolder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFolder[P]>
      : GetScalarType<T[P], AggregateFolder[P]>
  }




  export type FolderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FolderWhereInput
    orderBy?: FolderOrderByWithAggregationInput | FolderOrderByWithAggregationInput[]
    by: FolderScalarFieldEnum[] | FolderScalarFieldEnum
    having?: FolderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FolderCountAggregateInputType | true
    _min?: FolderMinAggregateInputType
    _max?: FolderMaxAggregateInputType
  }

  export type FolderGroupByOutputType = {
    id: string
    name: string
    parentId: string | null
    userId: string
    color: string | null
    description: string | null
    isStarred: boolean
    isInTrash: boolean
    createdAt: Date
    updatedAt: Date
    trashedAt: Date | null
    _count: FolderCountAggregateOutputType | null
    _min: FolderMinAggregateOutputType | null
    _max: FolderMaxAggregateOutputType | null
  }

  type GetFolderGroupByPayload<T extends FolderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FolderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FolderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FolderGroupByOutputType[P]>
            : GetScalarType<T[P], FolderGroupByOutputType[P]>
        }
      >
    >


  export type FolderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    parentId?: boolean
    userId?: boolean
    color?: boolean
    description?: boolean
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trashedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | Folder$parentArgs<ExtArgs>
    children?: boolean | Folder$childrenArgs<ExtArgs>
    files?: boolean | Folder$filesArgs<ExtArgs>
    shares?: boolean | Folder$sharesArgs<ExtArgs>
    _count?: boolean | FolderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["folder"]>

  export type FolderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    parentId?: boolean
    userId?: boolean
    color?: boolean
    description?: boolean
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trashedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | Folder$parentArgs<ExtArgs>
  }, ExtArgs["result"]["folder"]>

  export type FolderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    parentId?: boolean
    userId?: boolean
    color?: boolean
    description?: boolean
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trashedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | Folder$parentArgs<ExtArgs>
  }, ExtArgs["result"]["folder"]>

  export type FolderSelectScalar = {
    id?: boolean
    name?: boolean
    parentId?: boolean
    userId?: boolean
    color?: boolean
    description?: boolean
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trashedAt?: boolean
  }

  export type FolderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "parentId" | "userId" | "color" | "description" | "isStarred" | "isInTrash" | "createdAt" | "updatedAt" | "trashedAt", ExtArgs["result"]["folder"]>
  export type FolderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | Folder$parentArgs<ExtArgs>
    children?: boolean | Folder$childrenArgs<ExtArgs>
    files?: boolean | Folder$filesArgs<ExtArgs>
    shares?: boolean | Folder$sharesArgs<ExtArgs>
    _count?: boolean | FolderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FolderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | Folder$parentArgs<ExtArgs>
  }
  export type FolderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | Folder$parentArgs<ExtArgs>
  }

  export type $FolderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Folder"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      parent: Prisma.$FolderPayload<ExtArgs> | null
      children: Prisma.$FolderPayload<ExtArgs>[]
      files: Prisma.$FilePayload<ExtArgs>[]
      shares: Prisma.$SharePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      parentId: string | null
      userId: string
      color: string | null
      description: string | null
      isStarred: boolean
      isInTrash: boolean
      createdAt: Date
      updatedAt: Date
      trashedAt: Date | null
    }, ExtArgs["result"]["folder"]>
    composites: {}
  }

  type FolderGetPayload<S extends boolean | null | undefined | FolderDefaultArgs> = $Result.GetResult<Prisma.$FolderPayload, S>

  type FolderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FolderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FolderCountAggregateInputType | true
    }

  export interface FolderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Folder'], meta: { name: 'Folder' } }
    /**
     * Find zero or one Folder that matches the filter.
     * @param {FolderFindUniqueArgs} args - Arguments to find a Folder
     * @example
     * // Get one Folder
     * const folder = await prisma.folder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FolderFindUniqueArgs>(args: SelectSubset<T, FolderFindUniqueArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Folder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FolderFindUniqueOrThrowArgs} args - Arguments to find a Folder
     * @example
     * // Get one Folder
     * const folder = await prisma.folder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FolderFindUniqueOrThrowArgs>(args: SelectSubset<T, FolderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Folder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderFindFirstArgs} args - Arguments to find a Folder
     * @example
     * // Get one Folder
     * const folder = await prisma.folder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FolderFindFirstArgs>(args?: SelectSubset<T, FolderFindFirstArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Folder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderFindFirstOrThrowArgs} args - Arguments to find a Folder
     * @example
     * // Get one Folder
     * const folder = await prisma.folder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FolderFindFirstOrThrowArgs>(args?: SelectSubset<T, FolderFindFirstOrThrowArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Folders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Folders
     * const folders = await prisma.folder.findMany()
     * 
     * // Get first 10 Folders
     * const folders = await prisma.folder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const folderWithIdOnly = await prisma.folder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FolderFindManyArgs>(args?: SelectSubset<T, FolderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Folder.
     * @param {FolderCreateArgs} args - Arguments to create a Folder.
     * @example
     * // Create one Folder
     * const Folder = await prisma.folder.create({
     *   data: {
     *     // ... data to create a Folder
     *   }
     * })
     * 
     */
    create<T extends FolderCreateArgs>(args: SelectSubset<T, FolderCreateArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Folders.
     * @param {FolderCreateManyArgs} args - Arguments to create many Folders.
     * @example
     * // Create many Folders
     * const folder = await prisma.folder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FolderCreateManyArgs>(args?: SelectSubset<T, FolderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Folders and returns the data saved in the database.
     * @param {FolderCreateManyAndReturnArgs} args - Arguments to create many Folders.
     * @example
     * // Create many Folders
     * const folder = await prisma.folder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Folders and only return the `id`
     * const folderWithIdOnly = await prisma.folder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FolderCreateManyAndReturnArgs>(args?: SelectSubset<T, FolderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Folder.
     * @param {FolderDeleteArgs} args - Arguments to delete one Folder.
     * @example
     * // Delete one Folder
     * const Folder = await prisma.folder.delete({
     *   where: {
     *     // ... filter to delete one Folder
     *   }
     * })
     * 
     */
    delete<T extends FolderDeleteArgs>(args: SelectSubset<T, FolderDeleteArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Folder.
     * @param {FolderUpdateArgs} args - Arguments to update one Folder.
     * @example
     * // Update one Folder
     * const folder = await prisma.folder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FolderUpdateArgs>(args: SelectSubset<T, FolderUpdateArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Folders.
     * @param {FolderDeleteManyArgs} args - Arguments to filter Folders to delete.
     * @example
     * // Delete a few Folders
     * const { count } = await prisma.folder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FolderDeleteManyArgs>(args?: SelectSubset<T, FolderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Folders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Folders
     * const folder = await prisma.folder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FolderUpdateManyArgs>(args: SelectSubset<T, FolderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Folders and returns the data updated in the database.
     * @param {FolderUpdateManyAndReturnArgs} args - Arguments to update many Folders.
     * @example
     * // Update many Folders
     * const folder = await prisma.folder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Folders and only return the `id`
     * const folderWithIdOnly = await prisma.folder.updateManyAndReturn({
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
    updateManyAndReturn<T extends FolderUpdateManyAndReturnArgs>(args: SelectSubset<T, FolderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Folder.
     * @param {FolderUpsertArgs} args - Arguments to update or create a Folder.
     * @example
     * // Update or create a Folder
     * const folder = await prisma.folder.upsert({
     *   create: {
     *     // ... data to create a Folder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Folder we want to update
     *   }
     * })
     */
    upsert<T extends FolderUpsertArgs>(args: SelectSubset<T, FolderUpsertArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Folders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderCountArgs} args - Arguments to filter Folders to count.
     * @example
     * // Count the number of Folders
     * const count = await prisma.folder.count({
     *   where: {
     *     // ... the filter for the Folders we want to count
     *   }
     * })
    **/
    count<T extends FolderCountArgs>(
      args?: Subset<T, FolderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FolderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Folder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FolderAggregateArgs>(args: Subset<T, FolderAggregateArgs>): Prisma.PrismaPromise<GetFolderAggregateType<T>>

    /**
     * Group by Folder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FolderGroupByArgs} args - Group by arguments.
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
      T extends FolderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FolderGroupByArgs['orderBy'] }
        : { orderBy?: FolderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FolderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFolderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Folder model
   */
  readonly fields: FolderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Folder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FolderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parent<T extends Folder$parentArgs<ExtArgs> = {}>(args?: Subset<T, Folder$parentArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends Folder$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Folder$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    files<T extends Folder$filesArgs<ExtArgs> = {}>(args?: Subset<T, Folder$filesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    shares<T extends Folder$sharesArgs<ExtArgs> = {}>(args?: Subset<T, Folder$sharesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SharePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Folder model
   */
  interface FolderFieldRefs {
    readonly id: FieldRef<"Folder", 'String'>
    readonly name: FieldRef<"Folder", 'String'>
    readonly parentId: FieldRef<"Folder", 'String'>
    readonly userId: FieldRef<"Folder", 'String'>
    readonly color: FieldRef<"Folder", 'String'>
    readonly description: FieldRef<"Folder", 'String'>
    readonly isStarred: FieldRef<"Folder", 'Boolean'>
    readonly isInTrash: FieldRef<"Folder", 'Boolean'>
    readonly createdAt: FieldRef<"Folder", 'DateTime'>
    readonly updatedAt: FieldRef<"Folder", 'DateTime'>
    readonly trashedAt: FieldRef<"Folder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Folder findUnique
   */
  export type FolderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    /**
     * Filter, which Folder to fetch.
     */
    where: FolderWhereUniqueInput
  }

  /**
   * Folder findUniqueOrThrow
   */
  export type FolderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    /**
     * Filter, which Folder to fetch.
     */
    where: FolderWhereUniqueInput
  }

  /**
   * Folder findFirst
   */
  export type FolderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    /**
     * Filter, which Folder to fetch.
     */
    where?: FolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Folders to fetch.
     */
    orderBy?: FolderOrderByWithRelationInput | FolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Folders.
     */
    cursor?: FolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Folders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Folders.
     */
    distinct?: FolderScalarFieldEnum | FolderScalarFieldEnum[]
  }

  /**
   * Folder findFirstOrThrow
   */
  export type FolderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    /**
     * Filter, which Folder to fetch.
     */
    where?: FolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Folders to fetch.
     */
    orderBy?: FolderOrderByWithRelationInput | FolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Folders.
     */
    cursor?: FolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Folders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Folders.
     */
    distinct?: FolderScalarFieldEnum | FolderScalarFieldEnum[]
  }

  /**
   * Folder findMany
   */
  export type FolderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    /**
     * Filter, which Folders to fetch.
     */
    where?: FolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Folders to fetch.
     */
    orderBy?: FolderOrderByWithRelationInput | FolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Folders.
     */
    cursor?: FolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Folders.
     */
    skip?: number
    distinct?: FolderScalarFieldEnum | FolderScalarFieldEnum[]
  }

  /**
   * Folder create
   */
  export type FolderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    /**
     * The data needed to create a Folder.
     */
    data: XOR<FolderCreateInput, FolderUncheckedCreateInput>
  }

  /**
   * Folder createMany
   */
  export type FolderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Folders.
     */
    data: FolderCreateManyInput | FolderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Folder createManyAndReturn
   */
  export type FolderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * The data used to create many Folders.
     */
    data: FolderCreateManyInput | FolderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Folder update
   */
  export type FolderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    /**
     * The data needed to update a Folder.
     */
    data: XOR<FolderUpdateInput, FolderUncheckedUpdateInput>
    /**
     * Choose, which Folder to update.
     */
    where: FolderWhereUniqueInput
  }

  /**
   * Folder updateMany
   */
  export type FolderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Folders.
     */
    data: XOR<FolderUpdateManyMutationInput, FolderUncheckedUpdateManyInput>
    /**
     * Filter which Folders to update
     */
    where?: FolderWhereInput
    /**
     * Limit how many Folders to update.
     */
    limit?: number
  }

  /**
   * Folder updateManyAndReturn
   */
  export type FolderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * The data used to update Folders.
     */
    data: XOR<FolderUpdateManyMutationInput, FolderUncheckedUpdateManyInput>
    /**
     * Filter which Folders to update
     */
    where?: FolderWhereInput
    /**
     * Limit how many Folders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Folder upsert
   */
  export type FolderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    /**
     * The filter to search for the Folder to update in case it exists.
     */
    where: FolderWhereUniqueInput
    /**
     * In case the Folder found by the `where` argument doesn't exist, create a new Folder with this data.
     */
    create: XOR<FolderCreateInput, FolderUncheckedCreateInput>
    /**
     * In case the Folder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FolderUpdateInput, FolderUncheckedUpdateInput>
  }

  /**
   * Folder delete
   */
  export type FolderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    /**
     * Filter which Folder to delete.
     */
    where: FolderWhereUniqueInput
  }

  /**
   * Folder deleteMany
   */
  export type FolderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Folders to delete
     */
    where?: FolderWhereInput
    /**
     * Limit how many Folders to delete.
     */
    limit?: number
  }

  /**
   * Folder.parent
   */
  export type Folder$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    where?: FolderWhereInput
  }

  /**
   * Folder.children
   */
  export type Folder$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    where?: FolderWhereInput
    orderBy?: FolderOrderByWithRelationInput | FolderOrderByWithRelationInput[]
    cursor?: FolderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FolderScalarFieldEnum | FolderScalarFieldEnum[]
  }

  /**
   * Folder.files
   */
  export type Folder$filesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    where?: FileWhereInput
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    cursor?: FileWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * Folder.shares
   */
  export type Folder$sharesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Share
     */
    select?: ShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Share
     */
    omit?: ShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareInclude<ExtArgs> | null
    where?: ShareWhereInput
    orderBy?: ShareOrderByWithRelationInput | ShareOrderByWithRelationInput[]
    cursor?: ShareWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShareScalarFieldEnum | ShareScalarFieldEnum[]
  }

  /**
   * Folder without action
   */
  export type FolderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
  }


  /**
   * Model File
   */

  export type AggregateFile = {
    _count: FileCountAggregateOutputType | null
    _avg: FileAvgAggregateOutputType | null
    _sum: FileSumAggregateOutputType | null
    _min: FileMinAggregateOutputType | null
    _max: FileMaxAggregateOutputType | null
  }

  export type FileAvgAggregateOutputType = {
    size: number | null
    versionCount: number | null
  }

  export type FileSumAggregateOutputType = {
    size: bigint | null
    versionCount: number | null
  }

  export type FileMinAggregateOutputType = {
    id: string | null
    name: string | null
    originalName: string | null
    mimeType: string | null
    size: bigint | null
    filePath: string | null
    s3Key: string | null
    cloudFrontUrl: string | null
    folderId: string | null
    userId: string | null
    checksum: string | null
    thumbnail: string | null
    versionCount: number | null
    isStarred: boolean | null
    isInTrash: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    trashedAt: Date | null
    lastAccessedAt: Date | null
  }

  export type FileMaxAggregateOutputType = {
    id: string | null
    name: string | null
    originalName: string | null
    mimeType: string | null
    size: bigint | null
    filePath: string | null
    s3Key: string | null
    cloudFrontUrl: string | null
    folderId: string | null
    userId: string | null
    checksum: string | null
    thumbnail: string | null
    versionCount: number | null
    isStarred: boolean | null
    isInTrash: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    trashedAt: Date | null
    lastAccessedAt: Date | null
  }

  export type FileCountAggregateOutputType = {
    id: number
    name: number
    originalName: number
    mimeType: number
    size: number
    filePath: number
    s3Key: number
    cloudFrontUrl: number
    folderId: number
    userId: number
    checksum: number
    thumbnail: number
    versionCount: number
    isStarred: number
    isInTrash: number
    createdAt: number
    updatedAt: number
    trashedAt: number
    lastAccessedAt: number
    _all: number
  }


  export type FileAvgAggregateInputType = {
    size?: true
    versionCount?: true
  }

  export type FileSumAggregateInputType = {
    size?: true
    versionCount?: true
  }

  export type FileMinAggregateInputType = {
    id?: true
    name?: true
    originalName?: true
    mimeType?: true
    size?: true
    filePath?: true
    s3Key?: true
    cloudFrontUrl?: true
    folderId?: true
    userId?: true
    checksum?: true
    thumbnail?: true
    versionCount?: true
    isStarred?: true
    isInTrash?: true
    createdAt?: true
    updatedAt?: true
    trashedAt?: true
    lastAccessedAt?: true
  }

  export type FileMaxAggregateInputType = {
    id?: true
    name?: true
    originalName?: true
    mimeType?: true
    size?: true
    filePath?: true
    s3Key?: true
    cloudFrontUrl?: true
    folderId?: true
    userId?: true
    checksum?: true
    thumbnail?: true
    versionCount?: true
    isStarred?: true
    isInTrash?: true
    createdAt?: true
    updatedAt?: true
    trashedAt?: true
    lastAccessedAt?: true
  }

  export type FileCountAggregateInputType = {
    id?: true
    name?: true
    originalName?: true
    mimeType?: true
    size?: true
    filePath?: true
    s3Key?: true
    cloudFrontUrl?: true
    folderId?: true
    userId?: true
    checksum?: true
    thumbnail?: true
    versionCount?: true
    isStarred?: true
    isInTrash?: true
    createdAt?: true
    updatedAt?: true
    trashedAt?: true
    lastAccessedAt?: true
    _all?: true
  }

  export type FileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which File to aggregate.
     */
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Files
    **/
    _count?: true | FileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FileMaxAggregateInputType
  }

  export type GetFileAggregateType<T extends FileAggregateArgs> = {
        [P in keyof T & keyof AggregateFile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFile[P]>
      : GetScalarType<T[P], AggregateFile[P]>
  }




  export type FileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileWhereInput
    orderBy?: FileOrderByWithAggregationInput | FileOrderByWithAggregationInput[]
    by: FileScalarFieldEnum[] | FileScalarFieldEnum
    having?: FileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FileCountAggregateInputType | true
    _avg?: FileAvgAggregateInputType
    _sum?: FileSumAggregateInputType
    _min?: FileMinAggregateInputType
    _max?: FileMaxAggregateInputType
  }

  export type FileGroupByOutputType = {
    id: string
    name: string
    originalName: string
    mimeType: string
    size: bigint
    filePath: string | null
    s3Key: string | null
    cloudFrontUrl: string | null
    folderId: string | null
    userId: string
    checksum: string | null
    thumbnail: string | null
    versionCount: number
    isStarred: boolean
    isInTrash: boolean
    createdAt: Date
    updatedAt: Date
    trashedAt: Date | null
    lastAccessedAt: Date | null
    _count: FileCountAggregateOutputType | null
    _avg: FileAvgAggregateOutputType | null
    _sum: FileSumAggregateOutputType | null
    _min: FileMinAggregateOutputType | null
    _max: FileMaxAggregateOutputType | null
  }

  type GetFileGroupByPayload<T extends FileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FileGroupByOutputType[P]>
            : GetScalarType<T[P], FileGroupByOutputType[P]>
        }
      >
    >


  export type FileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    originalName?: boolean
    mimeType?: boolean
    size?: boolean
    filePath?: boolean
    s3Key?: boolean
    cloudFrontUrl?: boolean
    folderId?: boolean
    userId?: boolean
    checksum?: boolean
    thumbnail?: boolean
    versionCount?: boolean
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trashedAt?: boolean
    lastAccessedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    folder?: boolean | File$folderArgs<ExtArgs>
    shares?: boolean | File$sharesArgs<ExtArgs>
    versions?: boolean | File$versionsArgs<ExtArgs>
    _count?: boolean | FileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["file"]>

  export type FileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    originalName?: boolean
    mimeType?: boolean
    size?: boolean
    filePath?: boolean
    s3Key?: boolean
    cloudFrontUrl?: boolean
    folderId?: boolean
    userId?: boolean
    checksum?: boolean
    thumbnail?: boolean
    versionCount?: boolean
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trashedAt?: boolean
    lastAccessedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    folder?: boolean | File$folderArgs<ExtArgs>
  }, ExtArgs["result"]["file"]>

  export type FileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    originalName?: boolean
    mimeType?: boolean
    size?: boolean
    filePath?: boolean
    s3Key?: boolean
    cloudFrontUrl?: boolean
    folderId?: boolean
    userId?: boolean
    checksum?: boolean
    thumbnail?: boolean
    versionCount?: boolean
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trashedAt?: boolean
    lastAccessedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    folder?: boolean | File$folderArgs<ExtArgs>
  }, ExtArgs["result"]["file"]>

  export type FileSelectScalar = {
    id?: boolean
    name?: boolean
    originalName?: boolean
    mimeType?: boolean
    size?: boolean
    filePath?: boolean
    s3Key?: boolean
    cloudFrontUrl?: boolean
    folderId?: boolean
    userId?: boolean
    checksum?: boolean
    thumbnail?: boolean
    versionCount?: boolean
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    trashedAt?: boolean
    lastAccessedAt?: boolean
  }

  export type FileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "originalName" | "mimeType" | "size" | "filePath" | "s3Key" | "cloudFrontUrl" | "folderId" | "userId" | "checksum" | "thumbnail" | "versionCount" | "isStarred" | "isInTrash" | "createdAt" | "updatedAt" | "trashedAt" | "lastAccessedAt", ExtArgs["result"]["file"]>
  export type FileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    folder?: boolean | File$folderArgs<ExtArgs>
    shares?: boolean | File$sharesArgs<ExtArgs>
    versions?: boolean | File$versionsArgs<ExtArgs>
    _count?: boolean | FileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    folder?: boolean | File$folderArgs<ExtArgs>
  }
  export type FileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    folder?: boolean | File$folderArgs<ExtArgs>
  }

  export type $FilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "File"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      folder: Prisma.$FolderPayload<ExtArgs> | null
      shares: Prisma.$SharePayload<ExtArgs>[]
      versions: Prisma.$FileVersionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      originalName: string
      mimeType: string
      size: bigint
      filePath: string | null
      s3Key: string | null
      cloudFrontUrl: string | null
      folderId: string | null
      userId: string
      checksum: string | null
      thumbnail: string | null
      versionCount: number
      isStarred: boolean
      isInTrash: boolean
      createdAt: Date
      updatedAt: Date
      trashedAt: Date | null
      lastAccessedAt: Date | null
    }, ExtArgs["result"]["file"]>
    composites: {}
  }

  type FileGetPayload<S extends boolean | null | undefined | FileDefaultArgs> = $Result.GetResult<Prisma.$FilePayload, S>

  type FileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FileCountAggregateInputType | true
    }

  export interface FileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['File'], meta: { name: 'File' } }
    /**
     * Find zero or one File that matches the filter.
     * @param {FileFindUniqueArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FileFindUniqueArgs>(args: SelectSubset<T, FileFindUniqueArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one File that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FileFindUniqueOrThrowArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FileFindUniqueOrThrowArgs>(args: SelectSubset<T, FileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first File that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileFindFirstArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FileFindFirstArgs>(args?: SelectSubset<T, FileFindFirstArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first File that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileFindFirstOrThrowArgs} args - Arguments to find a File
     * @example
     * // Get one File
     * const file = await prisma.file.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FileFindFirstOrThrowArgs>(args?: SelectSubset<T, FileFindFirstOrThrowArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Files that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Files
     * const files = await prisma.file.findMany()
     * 
     * // Get first 10 Files
     * const files = await prisma.file.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fileWithIdOnly = await prisma.file.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FileFindManyArgs>(args?: SelectSubset<T, FileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a File.
     * @param {FileCreateArgs} args - Arguments to create a File.
     * @example
     * // Create one File
     * const File = await prisma.file.create({
     *   data: {
     *     // ... data to create a File
     *   }
     * })
     * 
     */
    create<T extends FileCreateArgs>(args: SelectSubset<T, FileCreateArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Files.
     * @param {FileCreateManyArgs} args - Arguments to create many Files.
     * @example
     * // Create many Files
     * const file = await prisma.file.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FileCreateManyArgs>(args?: SelectSubset<T, FileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Files and returns the data saved in the database.
     * @param {FileCreateManyAndReturnArgs} args - Arguments to create many Files.
     * @example
     * // Create many Files
     * const file = await prisma.file.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Files and only return the `id`
     * const fileWithIdOnly = await prisma.file.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FileCreateManyAndReturnArgs>(args?: SelectSubset<T, FileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a File.
     * @param {FileDeleteArgs} args - Arguments to delete one File.
     * @example
     * // Delete one File
     * const File = await prisma.file.delete({
     *   where: {
     *     // ... filter to delete one File
     *   }
     * })
     * 
     */
    delete<T extends FileDeleteArgs>(args: SelectSubset<T, FileDeleteArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one File.
     * @param {FileUpdateArgs} args - Arguments to update one File.
     * @example
     * // Update one File
     * const file = await prisma.file.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FileUpdateArgs>(args: SelectSubset<T, FileUpdateArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Files.
     * @param {FileDeleteManyArgs} args - Arguments to filter Files to delete.
     * @example
     * // Delete a few Files
     * const { count } = await prisma.file.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FileDeleteManyArgs>(args?: SelectSubset<T, FileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Files
     * const file = await prisma.file.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FileUpdateManyArgs>(args: SelectSubset<T, FileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Files and returns the data updated in the database.
     * @param {FileUpdateManyAndReturnArgs} args - Arguments to update many Files.
     * @example
     * // Update many Files
     * const file = await prisma.file.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Files and only return the `id`
     * const fileWithIdOnly = await prisma.file.updateManyAndReturn({
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
    updateManyAndReturn<T extends FileUpdateManyAndReturnArgs>(args: SelectSubset<T, FileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one File.
     * @param {FileUpsertArgs} args - Arguments to update or create a File.
     * @example
     * // Update or create a File
     * const file = await prisma.file.upsert({
     *   create: {
     *     // ... data to create a File
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the File we want to update
     *   }
     * })
     */
    upsert<T extends FileUpsertArgs>(args: SelectSubset<T, FileUpsertArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Files.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileCountArgs} args - Arguments to filter Files to count.
     * @example
     * // Count the number of Files
     * const count = await prisma.file.count({
     *   where: {
     *     // ... the filter for the Files we want to count
     *   }
     * })
    **/
    count<T extends FileCountArgs>(
      args?: Subset<T, FileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a File.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FileAggregateArgs>(args: Subset<T, FileAggregateArgs>): Prisma.PrismaPromise<GetFileAggregateType<T>>

    /**
     * Group by File.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileGroupByArgs} args - Group by arguments.
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
      T extends FileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FileGroupByArgs['orderBy'] }
        : { orderBy?: FileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the File model
   */
  readonly fields: FileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for File.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    folder<T extends File$folderArgs<ExtArgs> = {}>(args?: Subset<T, File$folderArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    shares<T extends File$sharesArgs<ExtArgs> = {}>(args?: Subset<T, File$sharesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SharePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    versions<T extends File$versionsArgs<ExtArgs> = {}>(args?: Subset<T, File$versionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the File model
   */
  interface FileFieldRefs {
    readonly id: FieldRef<"File", 'String'>
    readonly name: FieldRef<"File", 'String'>
    readonly originalName: FieldRef<"File", 'String'>
    readonly mimeType: FieldRef<"File", 'String'>
    readonly size: FieldRef<"File", 'BigInt'>
    readonly filePath: FieldRef<"File", 'String'>
    readonly s3Key: FieldRef<"File", 'String'>
    readonly cloudFrontUrl: FieldRef<"File", 'String'>
    readonly folderId: FieldRef<"File", 'String'>
    readonly userId: FieldRef<"File", 'String'>
    readonly checksum: FieldRef<"File", 'String'>
    readonly thumbnail: FieldRef<"File", 'String'>
    readonly versionCount: FieldRef<"File", 'Int'>
    readonly isStarred: FieldRef<"File", 'Boolean'>
    readonly isInTrash: FieldRef<"File", 'Boolean'>
    readonly createdAt: FieldRef<"File", 'DateTime'>
    readonly updatedAt: FieldRef<"File", 'DateTime'>
    readonly trashedAt: FieldRef<"File", 'DateTime'>
    readonly lastAccessedAt: FieldRef<"File", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * File findUnique
   */
  export type FileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which File to fetch.
     */
    where: FileWhereUniqueInput
  }

  /**
   * File findUniqueOrThrow
   */
  export type FileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which File to fetch.
     */
    where: FileWhereUniqueInput
  }

  /**
   * File findFirst
   */
  export type FileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which File to fetch.
     */
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Files.
     */
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Files.
     */
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * File findFirstOrThrow
   */
  export type FileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which File to fetch.
     */
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Files.
     */
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Files.
     */
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * File findMany
   */
  export type FileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter, which Files to fetch.
     */
    where?: FileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Files to fetch.
     */
    orderBy?: FileOrderByWithRelationInput | FileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Files.
     */
    cursor?: FileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Files from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Files.
     */
    skip?: number
    distinct?: FileScalarFieldEnum | FileScalarFieldEnum[]
  }

  /**
   * File create
   */
  export type FileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * The data needed to create a File.
     */
    data: XOR<FileCreateInput, FileUncheckedCreateInput>
  }

  /**
   * File createMany
   */
  export type FileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Files.
     */
    data: FileCreateManyInput | FileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * File createManyAndReturn
   */
  export type FileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * The data used to create many Files.
     */
    data: FileCreateManyInput | FileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * File update
   */
  export type FileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * The data needed to update a File.
     */
    data: XOR<FileUpdateInput, FileUncheckedUpdateInput>
    /**
     * Choose, which File to update.
     */
    where: FileWhereUniqueInput
  }

  /**
   * File updateMany
   */
  export type FileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Files.
     */
    data: XOR<FileUpdateManyMutationInput, FileUncheckedUpdateManyInput>
    /**
     * Filter which Files to update
     */
    where?: FileWhereInput
    /**
     * Limit how many Files to update.
     */
    limit?: number
  }

  /**
   * File updateManyAndReturn
   */
  export type FileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * The data used to update Files.
     */
    data: XOR<FileUpdateManyMutationInput, FileUncheckedUpdateManyInput>
    /**
     * Filter which Files to update
     */
    where?: FileWhereInput
    /**
     * Limit how many Files to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * File upsert
   */
  export type FileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * The filter to search for the File to update in case it exists.
     */
    where: FileWhereUniqueInput
    /**
     * In case the File found by the `where` argument doesn't exist, create a new File with this data.
     */
    create: XOR<FileCreateInput, FileUncheckedCreateInput>
    /**
     * In case the File was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FileUpdateInput, FileUncheckedUpdateInput>
  }

  /**
   * File delete
   */
  export type FileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    /**
     * Filter which File to delete.
     */
    where: FileWhereUniqueInput
  }

  /**
   * File deleteMany
   */
  export type FileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Files to delete
     */
    where?: FileWhereInput
    /**
     * Limit how many Files to delete.
     */
    limit?: number
  }

  /**
   * File.folder
   */
  export type File$folderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    where?: FolderWhereInput
  }

  /**
   * File.shares
   */
  export type File$sharesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Share
     */
    select?: ShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Share
     */
    omit?: ShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareInclude<ExtArgs> | null
    where?: ShareWhereInput
    orderBy?: ShareOrderByWithRelationInput | ShareOrderByWithRelationInput[]
    cursor?: ShareWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ShareScalarFieldEnum | ShareScalarFieldEnum[]
  }

  /**
   * File.versions
   */
  export type File$versionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileVersion
     */
    select?: FileVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileVersion
     */
    omit?: FileVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileVersionInclude<ExtArgs> | null
    where?: FileVersionWhereInput
    orderBy?: FileVersionOrderByWithRelationInput | FileVersionOrderByWithRelationInput[]
    cursor?: FileVersionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FileVersionScalarFieldEnum | FileVersionScalarFieldEnum[]
  }

  /**
   * File without action
   */
  export type FileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
  }


  /**
   * Model FileVersion
   */

  export type AggregateFileVersion = {
    _count: FileVersionCountAggregateOutputType | null
    _avg: FileVersionAvgAggregateOutputType | null
    _sum: FileVersionSumAggregateOutputType | null
    _min: FileVersionMinAggregateOutputType | null
    _max: FileVersionMaxAggregateOutputType | null
  }

  export type FileVersionAvgAggregateOutputType = {
    versionNumber: number | null
    size: number | null
  }

  export type FileVersionSumAggregateOutputType = {
    versionNumber: number | null
    size: bigint | null
  }

  export type FileVersionMinAggregateOutputType = {
    id: string | null
    fileId: string | null
    versionNumber: number | null
    s3Key: string | null
    size: bigint | null
    createdById: string | null
    isCurrent: boolean | null
    label: string | null
    createdAt: Date | null
  }

  export type FileVersionMaxAggregateOutputType = {
    id: string | null
    fileId: string | null
    versionNumber: number | null
    s3Key: string | null
    size: bigint | null
    createdById: string | null
    isCurrent: boolean | null
    label: string | null
    createdAt: Date | null
  }

  export type FileVersionCountAggregateOutputType = {
    id: number
    fileId: number
    versionNumber: number
    s3Key: number
    size: number
    createdById: number
    isCurrent: number
    label: number
    createdAt: number
    _all: number
  }


  export type FileVersionAvgAggregateInputType = {
    versionNumber?: true
    size?: true
  }

  export type FileVersionSumAggregateInputType = {
    versionNumber?: true
    size?: true
  }

  export type FileVersionMinAggregateInputType = {
    id?: true
    fileId?: true
    versionNumber?: true
    s3Key?: true
    size?: true
    createdById?: true
    isCurrent?: true
    label?: true
    createdAt?: true
  }

  export type FileVersionMaxAggregateInputType = {
    id?: true
    fileId?: true
    versionNumber?: true
    s3Key?: true
    size?: true
    createdById?: true
    isCurrent?: true
    label?: true
    createdAt?: true
  }

  export type FileVersionCountAggregateInputType = {
    id?: true
    fileId?: true
    versionNumber?: true
    s3Key?: true
    size?: true
    createdById?: true
    isCurrent?: true
    label?: true
    createdAt?: true
    _all?: true
  }

  export type FileVersionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FileVersion to aggregate.
     */
    where?: FileVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileVersions to fetch.
     */
    orderBy?: FileVersionOrderByWithRelationInput | FileVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FileVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FileVersions
    **/
    _count?: true | FileVersionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FileVersionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FileVersionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FileVersionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FileVersionMaxAggregateInputType
  }

  export type GetFileVersionAggregateType<T extends FileVersionAggregateArgs> = {
        [P in keyof T & keyof AggregateFileVersion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFileVersion[P]>
      : GetScalarType<T[P], AggregateFileVersion[P]>
  }




  export type FileVersionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FileVersionWhereInput
    orderBy?: FileVersionOrderByWithAggregationInput | FileVersionOrderByWithAggregationInput[]
    by: FileVersionScalarFieldEnum[] | FileVersionScalarFieldEnum
    having?: FileVersionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FileVersionCountAggregateInputType | true
    _avg?: FileVersionAvgAggregateInputType
    _sum?: FileVersionSumAggregateInputType
    _min?: FileVersionMinAggregateInputType
    _max?: FileVersionMaxAggregateInputType
  }

  export type FileVersionGroupByOutputType = {
    id: string
    fileId: string
    versionNumber: number
    s3Key: string
    size: bigint
    createdById: string
    isCurrent: boolean
    label: string | null
    createdAt: Date
    _count: FileVersionCountAggregateOutputType | null
    _avg: FileVersionAvgAggregateOutputType | null
    _sum: FileVersionSumAggregateOutputType | null
    _min: FileVersionMinAggregateOutputType | null
    _max: FileVersionMaxAggregateOutputType | null
  }

  type GetFileVersionGroupByPayload<T extends FileVersionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FileVersionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FileVersionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FileVersionGroupByOutputType[P]>
            : GetScalarType<T[P], FileVersionGroupByOutputType[P]>
        }
      >
    >


  export type FileVersionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileId?: boolean
    versionNumber?: boolean
    s3Key?: boolean
    size?: boolean
    createdById?: boolean
    isCurrent?: boolean
    label?: boolean
    createdAt?: boolean
    file?: boolean | FileDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fileVersion"]>

  export type FileVersionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileId?: boolean
    versionNumber?: boolean
    s3Key?: boolean
    size?: boolean
    createdById?: boolean
    isCurrent?: boolean
    label?: boolean
    createdAt?: boolean
    file?: boolean | FileDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fileVersion"]>

  export type FileVersionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileId?: boolean
    versionNumber?: boolean
    s3Key?: boolean
    size?: boolean
    createdById?: boolean
    isCurrent?: boolean
    label?: boolean
    createdAt?: boolean
    file?: boolean | FileDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fileVersion"]>

  export type FileVersionSelectScalar = {
    id?: boolean
    fileId?: boolean
    versionNumber?: boolean
    s3Key?: boolean
    size?: boolean
    createdById?: boolean
    isCurrent?: boolean
    label?: boolean
    createdAt?: boolean
  }

  export type FileVersionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fileId" | "versionNumber" | "s3Key" | "size" | "createdById" | "isCurrent" | "label" | "createdAt", ExtArgs["result"]["fileVersion"]>
  export type FileVersionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    file?: boolean | FileDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FileVersionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    file?: boolean | FileDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FileVersionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    file?: boolean | FileDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FileVersionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FileVersion"
    objects: {
      file: Prisma.$FilePayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fileId: string
      versionNumber: number
      s3Key: string
      size: bigint
      createdById: string
      isCurrent: boolean
      label: string | null
      createdAt: Date
    }, ExtArgs["result"]["fileVersion"]>
    composites: {}
  }

  type FileVersionGetPayload<S extends boolean | null | undefined | FileVersionDefaultArgs> = $Result.GetResult<Prisma.$FileVersionPayload, S>

  type FileVersionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FileVersionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FileVersionCountAggregateInputType | true
    }

  export interface FileVersionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FileVersion'], meta: { name: 'FileVersion' } }
    /**
     * Find zero or one FileVersion that matches the filter.
     * @param {FileVersionFindUniqueArgs} args - Arguments to find a FileVersion
     * @example
     * // Get one FileVersion
     * const fileVersion = await prisma.fileVersion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FileVersionFindUniqueArgs>(args: SelectSubset<T, FileVersionFindUniqueArgs<ExtArgs>>): Prisma__FileVersionClient<$Result.GetResult<Prisma.$FileVersionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FileVersion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FileVersionFindUniqueOrThrowArgs} args - Arguments to find a FileVersion
     * @example
     * // Get one FileVersion
     * const fileVersion = await prisma.fileVersion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FileVersionFindUniqueOrThrowArgs>(args: SelectSubset<T, FileVersionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FileVersionClient<$Result.GetResult<Prisma.$FileVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FileVersion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileVersionFindFirstArgs} args - Arguments to find a FileVersion
     * @example
     * // Get one FileVersion
     * const fileVersion = await prisma.fileVersion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FileVersionFindFirstArgs>(args?: SelectSubset<T, FileVersionFindFirstArgs<ExtArgs>>): Prisma__FileVersionClient<$Result.GetResult<Prisma.$FileVersionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FileVersion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileVersionFindFirstOrThrowArgs} args - Arguments to find a FileVersion
     * @example
     * // Get one FileVersion
     * const fileVersion = await prisma.fileVersion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FileVersionFindFirstOrThrowArgs>(args?: SelectSubset<T, FileVersionFindFirstOrThrowArgs<ExtArgs>>): Prisma__FileVersionClient<$Result.GetResult<Prisma.$FileVersionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FileVersions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileVersionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FileVersions
     * const fileVersions = await prisma.fileVersion.findMany()
     * 
     * // Get first 10 FileVersions
     * const fileVersions = await prisma.fileVersion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fileVersionWithIdOnly = await prisma.fileVersion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FileVersionFindManyArgs>(args?: SelectSubset<T, FileVersionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FileVersion.
     * @param {FileVersionCreateArgs} args - Arguments to create a FileVersion.
     * @example
     * // Create one FileVersion
     * const FileVersion = await prisma.fileVersion.create({
     *   data: {
     *     // ... data to create a FileVersion
     *   }
     * })
     * 
     */
    create<T extends FileVersionCreateArgs>(args: SelectSubset<T, FileVersionCreateArgs<ExtArgs>>): Prisma__FileVersionClient<$Result.GetResult<Prisma.$FileVersionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FileVersions.
     * @param {FileVersionCreateManyArgs} args - Arguments to create many FileVersions.
     * @example
     * // Create many FileVersions
     * const fileVersion = await prisma.fileVersion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FileVersionCreateManyArgs>(args?: SelectSubset<T, FileVersionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FileVersions and returns the data saved in the database.
     * @param {FileVersionCreateManyAndReturnArgs} args - Arguments to create many FileVersions.
     * @example
     * // Create many FileVersions
     * const fileVersion = await prisma.fileVersion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FileVersions and only return the `id`
     * const fileVersionWithIdOnly = await prisma.fileVersion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FileVersionCreateManyAndReturnArgs>(args?: SelectSubset<T, FileVersionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileVersionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FileVersion.
     * @param {FileVersionDeleteArgs} args - Arguments to delete one FileVersion.
     * @example
     * // Delete one FileVersion
     * const FileVersion = await prisma.fileVersion.delete({
     *   where: {
     *     // ... filter to delete one FileVersion
     *   }
     * })
     * 
     */
    delete<T extends FileVersionDeleteArgs>(args: SelectSubset<T, FileVersionDeleteArgs<ExtArgs>>): Prisma__FileVersionClient<$Result.GetResult<Prisma.$FileVersionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FileVersion.
     * @param {FileVersionUpdateArgs} args - Arguments to update one FileVersion.
     * @example
     * // Update one FileVersion
     * const fileVersion = await prisma.fileVersion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FileVersionUpdateArgs>(args: SelectSubset<T, FileVersionUpdateArgs<ExtArgs>>): Prisma__FileVersionClient<$Result.GetResult<Prisma.$FileVersionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FileVersions.
     * @param {FileVersionDeleteManyArgs} args - Arguments to filter FileVersions to delete.
     * @example
     * // Delete a few FileVersions
     * const { count } = await prisma.fileVersion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FileVersionDeleteManyArgs>(args?: SelectSubset<T, FileVersionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FileVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileVersionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FileVersions
     * const fileVersion = await prisma.fileVersion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FileVersionUpdateManyArgs>(args: SelectSubset<T, FileVersionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FileVersions and returns the data updated in the database.
     * @param {FileVersionUpdateManyAndReturnArgs} args - Arguments to update many FileVersions.
     * @example
     * // Update many FileVersions
     * const fileVersion = await prisma.fileVersion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FileVersions and only return the `id`
     * const fileVersionWithIdOnly = await prisma.fileVersion.updateManyAndReturn({
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
    updateManyAndReturn<T extends FileVersionUpdateManyAndReturnArgs>(args: SelectSubset<T, FileVersionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FileVersionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FileVersion.
     * @param {FileVersionUpsertArgs} args - Arguments to update or create a FileVersion.
     * @example
     * // Update or create a FileVersion
     * const fileVersion = await prisma.fileVersion.upsert({
     *   create: {
     *     // ... data to create a FileVersion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FileVersion we want to update
     *   }
     * })
     */
    upsert<T extends FileVersionUpsertArgs>(args: SelectSubset<T, FileVersionUpsertArgs<ExtArgs>>): Prisma__FileVersionClient<$Result.GetResult<Prisma.$FileVersionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FileVersions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileVersionCountArgs} args - Arguments to filter FileVersions to count.
     * @example
     * // Count the number of FileVersions
     * const count = await prisma.fileVersion.count({
     *   where: {
     *     // ... the filter for the FileVersions we want to count
     *   }
     * })
    **/
    count<T extends FileVersionCountArgs>(
      args?: Subset<T, FileVersionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FileVersionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FileVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileVersionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FileVersionAggregateArgs>(args: Subset<T, FileVersionAggregateArgs>): Prisma.PrismaPromise<GetFileVersionAggregateType<T>>

    /**
     * Group by FileVersion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FileVersionGroupByArgs} args - Group by arguments.
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
      T extends FileVersionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FileVersionGroupByArgs['orderBy'] }
        : { orderBy?: FileVersionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FileVersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FileVersion model
   */
  readonly fields: FileVersionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FileVersion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FileVersionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    file<T extends FileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FileDefaultArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the FileVersion model
   */
  interface FileVersionFieldRefs {
    readonly id: FieldRef<"FileVersion", 'String'>
    readonly fileId: FieldRef<"FileVersion", 'String'>
    readonly versionNumber: FieldRef<"FileVersion", 'Int'>
    readonly s3Key: FieldRef<"FileVersion", 'String'>
    readonly size: FieldRef<"FileVersion", 'BigInt'>
    readonly createdById: FieldRef<"FileVersion", 'String'>
    readonly isCurrent: FieldRef<"FileVersion", 'Boolean'>
    readonly label: FieldRef<"FileVersion", 'String'>
    readonly createdAt: FieldRef<"FileVersion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FileVersion findUnique
   */
  export type FileVersionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileVersion
     */
    select?: FileVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileVersion
     */
    omit?: FileVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileVersionInclude<ExtArgs> | null
    /**
     * Filter, which FileVersion to fetch.
     */
    where: FileVersionWhereUniqueInput
  }

  /**
   * FileVersion findUniqueOrThrow
   */
  export type FileVersionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileVersion
     */
    select?: FileVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileVersion
     */
    omit?: FileVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileVersionInclude<ExtArgs> | null
    /**
     * Filter, which FileVersion to fetch.
     */
    where: FileVersionWhereUniqueInput
  }

  /**
   * FileVersion findFirst
   */
  export type FileVersionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileVersion
     */
    select?: FileVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileVersion
     */
    omit?: FileVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileVersionInclude<ExtArgs> | null
    /**
     * Filter, which FileVersion to fetch.
     */
    where?: FileVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileVersions to fetch.
     */
    orderBy?: FileVersionOrderByWithRelationInput | FileVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FileVersions.
     */
    cursor?: FileVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FileVersions.
     */
    distinct?: FileVersionScalarFieldEnum | FileVersionScalarFieldEnum[]
  }

  /**
   * FileVersion findFirstOrThrow
   */
  export type FileVersionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileVersion
     */
    select?: FileVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileVersion
     */
    omit?: FileVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileVersionInclude<ExtArgs> | null
    /**
     * Filter, which FileVersion to fetch.
     */
    where?: FileVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileVersions to fetch.
     */
    orderBy?: FileVersionOrderByWithRelationInput | FileVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FileVersions.
     */
    cursor?: FileVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileVersions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FileVersions.
     */
    distinct?: FileVersionScalarFieldEnum | FileVersionScalarFieldEnum[]
  }

  /**
   * FileVersion findMany
   */
  export type FileVersionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileVersion
     */
    select?: FileVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileVersion
     */
    omit?: FileVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileVersionInclude<ExtArgs> | null
    /**
     * Filter, which FileVersions to fetch.
     */
    where?: FileVersionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FileVersions to fetch.
     */
    orderBy?: FileVersionOrderByWithRelationInput | FileVersionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FileVersions.
     */
    cursor?: FileVersionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FileVersions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FileVersions.
     */
    skip?: number
    distinct?: FileVersionScalarFieldEnum | FileVersionScalarFieldEnum[]
  }

  /**
   * FileVersion create
   */
  export type FileVersionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileVersion
     */
    select?: FileVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileVersion
     */
    omit?: FileVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileVersionInclude<ExtArgs> | null
    /**
     * The data needed to create a FileVersion.
     */
    data: XOR<FileVersionCreateInput, FileVersionUncheckedCreateInput>
  }

  /**
   * FileVersion createMany
   */
  export type FileVersionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FileVersions.
     */
    data: FileVersionCreateManyInput | FileVersionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FileVersion createManyAndReturn
   */
  export type FileVersionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileVersion
     */
    select?: FileVersionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FileVersion
     */
    omit?: FileVersionOmit<ExtArgs> | null
    /**
     * The data used to create many FileVersions.
     */
    data: FileVersionCreateManyInput | FileVersionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileVersionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FileVersion update
   */
  export type FileVersionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileVersion
     */
    select?: FileVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileVersion
     */
    omit?: FileVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileVersionInclude<ExtArgs> | null
    /**
     * The data needed to update a FileVersion.
     */
    data: XOR<FileVersionUpdateInput, FileVersionUncheckedUpdateInput>
    /**
     * Choose, which FileVersion to update.
     */
    where: FileVersionWhereUniqueInput
  }

  /**
   * FileVersion updateMany
   */
  export type FileVersionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FileVersions.
     */
    data: XOR<FileVersionUpdateManyMutationInput, FileVersionUncheckedUpdateManyInput>
    /**
     * Filter which FileVersions to update
     */
    where?: FileVersionWhereInput
    /**
     * Limit how many FileVersions to update.
     */
    limit?: number
  }

  /**
   * FileVersion updateManyAndReturn
   */
  export type FileVersionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileVersion
     */
    select?: FileVersionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FileVersion
     */
    omit?: FileVersionOmit<ExtArgs> | null
    /**
     * The data used to update FileVersions.
     */
    data: XOR<FileVersionUpdateManyMutationInput, FileVersionUncheckedUpdateManyInput>
    /**
     * Filter which FileVersions to update
     */
    where?: FileVersionWhereInput
    /**
     * Limit how many FileVersions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileVersionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FileVersion upsert
   */
  export type FileVersionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileVersion
     */
    select?: FileVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileVersion
     */
    omit?: FileVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileVersionInclude<ExtArgs> | null
    /**
     * The filter to search for the FileVersion to update in case it exists.
     */
    where: FileVersionWhereUniqueInput
    /**
     * In case the FileVersion found by the `where` argument doesn't exist, create a new FileVersion with this data.
     */
    create: XOR<FileVersionCreateInput, FileVersionUncheckedCreateInput>
    /**
     * In case the FileVersion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FileVersionUpdateInput, FileVersionUncheckedUpdateInput>
  }

  /**
   * FileVersion delete
   */
  export type FileVersionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileVersion
     */
    select?: FileVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileVersion
     */
    omit?: FileVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileVersionInclude<ExtArgs> | null
    /**
     * Filter which FileVersion to delete.
     */
    where: FileVersionWhereUniqueInput
  }

  /**
   * FileVersion deleteMany
   */
  export type FileVersionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FileVersions to delete
     */
    where?: FileVersionWhereInput
    /**
     * Limit how many FileVersions to delete.
     */
    limit?: number
  }

  /**
   * FileVersion without action
   */
  export type FileVersionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FileVersion
     */
    select?: FileVersionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FileVersion
     */
    omit?: FileVersionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileVersionInclude<ExtArgs> | null
  }


  /**
   * Model Share
   */

  export type AggregateShare = {
    _count: ShareCountAggregateOutputType | null
    _avg: ShareAvgAggregateOutputType | null
    _sum: ShareSumAggregateOutputType | null
    _min: ShareMinAggregateOutputType | null
    _max: ShareMaxAggregateOutputType | null
  }

  export type ShareAvgAggregateOutputType = {
    accessCount: number | null
  }

  export type ShareSumAggregateOutputType = {
    accessCount: number | null
  }

  export type ShareMinAggregateOutputType = {
    id: string | null
    fileId: string | null
    folderId: string | null
    sharedByUserId: string | null
    sharedWithUserId: string | null
    sharedWithEmail: string | null
    permissionLevel: $Enums.PermissionLevel | null
    shareToken: string | null
    isPublic: boolean | null
    expiresAt: Date | null
    isRevoked: boolean | null
    accessCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShareMaxAggregateOutputType = {
    id: string | null
    fileId: string | null
    folderId: string | null
    sharedByUserId: string | null
    sharedWithUserId: string | null
    sharedWithEmail: string | null
    permissionLevel: $Enums.PermissionLevel | null
    shareToken: string | null
    isPublic: boolean | null
    expiresAt: Date | null
    isRevoked: boolean | null
    accessCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ShareCountAggregateOutputType = {
    id: number
    fileId: number
    folderId: number
    sharedByUserId: number
    sharedWithUserId: number
    sharedWithEmail: number
    permissionLevel: number
    shareToken: number
    isPublic: number
    expiresAt: number
    isRevoked: number
    accessCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ShareAvgAggregateInputType = {
    accessCount?: true
  }

  export type ShareSumAggregateInputType = {
    accessCount?: true
  }

  export type ShareMinAggregateInputType = {
    id?: true
    fileId?: true
    folderId?: true
    sharedByUserId?: true
    sharedWithUserId?: true
    sharedWithEmail?: true
    permissionLevel?: true
    shareToken?: true
    isPublic?: true
    expiresAt?: true
    isRevoked?: true
    accessCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShareMaxAggregateInputType = {
    id?: true
    fileId?: true
    folderId?: true
    sharedByUserId?: true
    sharedWithUserId?: true
    sharedWithEmail?: true
    permissionLevel?: true
    shareToken?: true
    isPublic?: true
    expiresAt?: true
    isRevoked?: true
    accessCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ShareCountAggregateInputType = {
    id?: true
    fileId?: true
    folderId?: true
    sharedByUserId?: true
    sharedWithUserId?: true
    sharedWithEmail?: true
    permissionLevel?: true
    shareToken?: true
    isPublic?: true
    expiresAt?: true
    isRevoked?: true
    accessCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ShareAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Share to aggregate.
     */
    where?: ShareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shares to fetch.
     */
    orderBy?: ShareOrderByWithRelationInput | ShareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Shares
    **/
    _count?: true | ShareCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShareAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShareSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShareMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShareMaxAggregateInputType
  }

  export type GetShareAggregateType<T extends ShareAggregateArgs> = {
        [P in keyof T & keyof AggregateShare]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShare[P]>
      : GetScalarType<T[P], AggregateShare[P]>
  }




  export type ShareGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShareWhereInput
    orderBy?: ShareOrderByWithAggregationInput | ShareOrderByWithAggregationInput[]
    by: ShareScalarFieldEnum[] | ShareScalarFieldEnum
    having?: ShareScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShareCountAggregateInputType | true
    _avg?: ShareAvgAggregateInputType
    _sum?: ShareSumAggregateInputType
    _min?: ShareMinAggregateInputType
    _max?: ShareMaxAggregateInputType
  }

  export type ShareGroupByOutputType = {
    id: string
    fileId: string | null
    folderId: string | null
    sharedByUserId: string
    sharedWithUserId: string | null
    sharedWithEmail: string | null
    permissionLevel: $Enums.PermissionLevel
    shareToken: string
    isPublic: boolean
    expiresAt: Date | null
    isRevoked: boolean
    accessCount: number
    createdAt: Date
    updatedAt: Date
    _count: ShareCountAggregateOutputType | null
    _avg: ShareAvgAggregateOutputType | null
    _sum: ShareSumAggregateOutputType | null
    _min: ShareMinAggregateOutputType | null
    _max: ShareMaxAggregateOutputType | null
  }

  type GetShareGroupByPayload<T extends ShareGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShareGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShareGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShareGroupByOutputType[P]>
            : GetScalarType<T[P], ShareGroupByOutputType[P]>
        }
      >
    >


  export type ShareSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileId?: boolean
    folderId?: boolean
    sharedByUserId?: boolean
    sharedWithUserId?: boolean
    sharedWithEmail?: boolean
    permissionLevel?: boolean
    shareToken?: boolean
    isPublic?: boolean
    expiresAt?: boolean
    isRevoked?: boolean
    accessCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    file?: boolean | Share$fileArgs<ExtArgs>
    folder?: boolean | Share$folderArgs<ExtArgs>
    sharedBy?: boolean | UserDefaultArgs<ExtArgs>
    sharedWith?: boolean | Share$sharedWithArgs<ExtArgs>
  }, ExtArgs["result"]["share"]>

  export type ShareSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileId?: boolean
    folderId?: boolean
    sharedByUserId?: boolean
    sharedWithUserId?: boolean
    sharedWithEmail?: boolean
    permissionLevel?: boolean
    shareToken?: boolean
    isPublic?: boolean
    expiresAt?: boolean
    isRevoked?: boolean
    accessCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    file?: boolean | Share$fileArgs<ExtArgs>
    folder?: boolean | Share$folderArgs<ExtArgs>
    sharedBy?: boolean | UserDefaultArgs<ExtArgs>
    sharedWith?: boolean | Share$sharedWithArgs<ExtArgs>
  }, ExtArgs["result"]["share"]>

  export type ShareSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileId?: boolean
    folderId?: boolean
    sharedByUserId?: boolean
    sharedWithUserId?: boolean
    sharedWithEmail?: boolean
    permissionLevel?: boolean
    shareToken?: boolean
    isPublic?: boolean
    expiresAt?: boolean
    isRevoked?: boolean
    accessCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    file?: boolean | Share$fileArgs<ExtArgs>
    folder?: boolean | Share$folderArgs<ExtArgs>
    sharedBy?: boolean | UserDefaultArgs<ExtArgs>
    sharedWith?: boolean | Share$sharedWithArgs<ExtArgs>
  }, ExtArgs["result"]["share"]>

  export type ShareSelectScalar = {
    id?: boolean
    fileId?: boolean
    folderId?: boolean
    sharedByUserId?: boolean
    sharedWithUserId?: boolean
    sharedWithEmail?: boolean
    permissionLevel?: boolean
    shareToken?: boolean
    isPublic?: boolean
    expiresAt?: boolean
    isRevoked?: boolean
    accessCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ShareOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fileId" | "folderId" | "sharedByUserId" | "sharedWithUserId" | "sharedWithEmail" | "permissionLevel" | "shareToken" | "isPublic" | "expiresAt" | "isRevoked" | "accessCount" | "createdAt" | "updatedAt", ExtArgs["result"]["share"]>
  export type ShareInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    file?: boolean | Share$fileArgs<ExtArgs>
    folder?: boolean | Share$folderArgs<ExtArgs>
    sharedBy?: boolean | UserDefaultArgs<ExtArgs>
    sharedWith?: boolean | Share$sharedWithArgs<ExtArgs>
  }
  export type ShareIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    file?: boolean | Share$fileArgs<ExtArgs>
    folder?: boolean | Share$folderArgs<ExtArgs>
    sharedBy?: boolean | UserDefaultArgs<ExtArgs>
    sharedWith?: boolean | Share$sharedWithArgs<ExtArgs>
  }
  export type ShareIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    file?: boolean | Share$fileArgs<ExtArgs>
    folder?: boolean | Share$folderArgs<ExtArgs>
    sharedBy?: boolean | UserDefaultArgs<ExtArgs>
    sharedWith?: boolean | Share$sharedWithArgs<ExtArgs>
  }

  export type $SharePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Share"
    objects: {
      file: Prisma.$FilePayload<ExtArgs> | null
      folder: Prisma.$FolderPayload<ExtArgs> | null
      sharedBy: Prisma.$UserPayload<ExtArgs>
      sharedWith: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fileId: string | null
      folderId: string | null
      sharedByUserId: string
      sharedWithUserId: string | null
      sharedWithEmail: string | null
      permissionLevel: $Enums.PermissionLevel
      shareToken: string
      isPublic: boolean
      expiresAt: Date | null
      isRevoked: boolean
      accessCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["share"]>
    composites: {}
  }

  type ShareGetPayload<S extends boolean | null | undefined | ShareDefaultArgs> = $Result.GetResult<Prisma.$SharePayload, S>

  type ShareCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ShareFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ShareCountAggregateInputType | true
    }

  export interface ShareDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Share'], meta: { name: 'Share' } }
    /**
     * Find zero or one Share that matches the filter.
     * @param {ShareFindUniqueArgs} args - Arguments to find a Share
     * @example
     * // Get one Share
     * const share = await prisma.share.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShareFindUniqueArgs>(args: SelectSubset<T, ShareFindUniqueArgs<ExtArgs>>): Prisma__ShareClient<$Result.GetResult<Prisma.$SharePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Share that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShareFindUniqueOrThrowArgs} args - Arguments to find a Share
     * @example
     * // Get one Share
     * const share = await prisma.share.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShareFindUniqueOrThrowArgs>(args: SelectSubset<T, ShareFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShareClient<$Result.GetResult<Prisma.$SharePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Share that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShareFindFirstArgs} args - Arguments to find a Share
     * @example
     * // Get one Share
     * const share = await prisma.share.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShareFindFirstArgs>(args?: SelectSubset<T, ShareFindFirstArgs<ExtArgs>>): Prisma__ShareClient<$Result.GetResult<Prisma.$SharePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Share that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShareFindFirstOrThrowArgs} args - Arguments to find a Share
     * @example
     * // Get one Share
     * const share = await prisma.share.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShareFindFirstOrThrowArgs>(args?: SelectSubset<T, ShareFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShareClient<$Result.GetResult<Prisma.$SharePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Shares that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShareFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shares
     * const shares = await prisma.share.findMany()
     * 
     * // Get first 10 Shares
     * const shares = await prisma.share.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shareWithIdOnly = await prisma.share.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShareFindManyArgs>(args?: SelectSubset<T, ShareFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SharePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Share.
     * @param {ShareCreateArgs} args - Arguments to create a Share.
     * @example
     * // Create one Share
     * const Share = await prisma.share.create({
     *   data: {
     *     // ... data to create a Share
     *   }
     * })
     * 
     */
    create<T extends ShareCreateArgs>(args: SelectSubset<T, ShareCreateArgs<ExtArgs>>): Prisma__ShareClient<$Result.GetResult<Prisma.$SharePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Shares.
     * @param {ShareCreateManyArgs} args - Arguments to create many Shares.
     * @example
     * // Create many Shares
     * const share = await prisma.share.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShareCreateManyArgs>(args?: SelectSubset<T, ShareCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Shares and returns the data saved in the database.
     * @param {ShareCreateManyAndReturnArgs} args - Arguments to create many Shares.
     * @example
     * // Create many Shares
     * const share = await prisma.share.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Shares and only return the `id`
     * const shareWithIdOnly = await prisma.share.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ShareCreateManyAndReturnArgs>(args?: SelectSubset<T, ShareCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SharePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Share.
     * @param {ShareDeleteArgs} args - Arguments to delete one Share.
     * @example
     * // Delete one Share
     * const Share = await prisma.share.delete({
     *   where: {
     *     // ... filter to delete one Share
     *   }
     * })
     * 
     */
    delete<T extends ShareDeleteArgs>(args: SelectSubset<T, ShareDeleteArgs<ExtArgs>>): Prisma__ShareClient<$Result.GetResult<Prisma.$SharePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Share.
     * @param {ShareUpdateArgs} args - Arguments to update one Share.
     * @example
     * // Update one Share
     * const share = await prisma.share.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShareUpdateArgs>(args: SelectSubset<T, ShareUpdateArgs<ExtArgs>>): Prisma__ShareClient<$Result.GetResult<Prisma.$SharePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Shares.
     * @param {ShareDeleteManyArgs} args - Arguments to filter Shares to delete.
     * @example
     * // Delete a few Shares
     * const { count } = await prisma.share.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShareDeleteManyArgs>(args?: SelectSubset<T, ShareDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShareUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shares
     * const share = await prisma.share.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShareUpdateManyArgs>(args: SelectSubset<T, ShareUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shares and returns the data updated in the database.
     * @param {ShareUpdateManyAndReturnArgs} args - Arguments to update many Shares.
     * @example
     * // Update many Shares
     * const share = await prisma.share.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Shares and only return the `id`
     * const shareWithIdOnly = await prisma.share.updateManyAndReturn({
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
    updateManyAndReturn<T extends ShareUpdateManyAndReturnArgs>(args: SelectSubset<T, ShareUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SharePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Share.
     * @param {ShareUpsertArgs} args - Arguments to update or create a Share.
     * @example
     * // Update or create a Share
     * const share = await prisma.share.upsert({
     *   create: {
     *     // ... data to create a Share
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Share we want to update
     *   }
     * })
     */
    upsert<T extends ShareUpsertArgs>(args: SelectSubset<T, ShareUpsertArgs<ExtArgs>>): Prisma__ShareClient<$Result.GetResult<Prisma.$SharePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Shares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShareCountArgs} args - Arguments to filter Shares to count.
     * @example
     * // Count the number of Shares
     * const count = await prisma.share.count({
     *   where: {
     *     // ... the filter for the Shares we want to count
     *   }
     * })
    **/
    count<T extends ShareCountArgs>(
      args?: Subset<T, ShareCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShareCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Share.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShareAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ShareAggregateArgs>(args: Subset<T, ShareAggregateArgs>): Prisma.PrismaPromise<GetShareAggregateType<T>>

    /**
     * Group by Share.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShareGroupByArgs} args - Group by arguments.
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
      T extends ShareGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShareGroupByArgs['orderBy'] }
        : { orderBy?: ShareGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ShareGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShareGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Share model
   */
  readonly fields: ShareFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Share.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShareClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    file<T extends Share$fileArgs<ExtArgs> = {}>(args?: Subset<T, Share$fileArgs<ExtArgs>>): Prisma__FileClient<$Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    folder<T extends Share$folderArgs<ExtArgs> = {}>(args?: Subset<T, Share$folderArgs<ExtArgs>>): Prisma__FolderClient<$Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sharedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sharedWith<T extends Share$sharedWithArgs<ExtArgs> = {}>(args?: Subset<T, Share$sharedWithArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Share model
   */
  interface ShareFieldRefs {
    readonly id: FieldRef<"Share", 'String'>
    readonly fileId: FieldRef<"Share", 'String'>
    readonly folderId: FieldRef<"Share", 'String'>
    readonly sharedByUserId: FieldRef<"Share", 'String'>
    readonly sharedWithUserId: FieldRef<"Share", 'String'>
    readonly sharedWithEmail: FieldRef<"Share", 'String'>
    readonly permissionLevel: FieldRef<"Share", 'PermissionLevel'>
    readonly shareToken: FieldRef<"Share", 'String'>
    readonly isPublic: FieldRef<"Share", 'Boolean'>
    readonly expiresAt: FieldRef<"Share", 'DateTime'>
    readonly isRevoked: FieldRef<"Share", 'Boolean'>
    readonly accessCount: FieldRef<"Share", 'Int'>
    readonly createdAt: FieldRef<"Share", 'DateTime'>
    readonly updatedAt: FieldRef<"Share", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Share findUnique
   */
  export type ShareFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Share
     */
    select?: ShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Share
     */
    omit?: ShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareInclude<ExtArgs> | null
    /**
     * Filter, which Share to fetch.
     */
    where: ShareWhereUniqueInput
  }

  /**
   * Share findUniqueOrThrow
   */
  export type ShareFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Share
     */
    select?: ShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Share
     */
    omit?: ShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareInclude<ExtArgs> | null
    /**
     * Filter, which Share to fetch.
     */
    where: ShareWhereUniqueInput
  }

  /**
   * Share findFirst
   */
  export type ShareFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Share
     */
    select?: ShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Share
     */
    omit?: ShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareInclude<ExtArgs> | null
    /**
     * Filter, which Share to fetch.
     */
    where?: ShareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shares to fetch.
     */
    orderBy?: ShareOrderByWithRelationInput | ShareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shares.
     */
    cursor?: ShareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shares.
     */
    distinct?: ShareScalarFieldEnum | ShareScalarFieldEnum[]
  }

  /**
   * Share findFirstOrThrow
   */
  export type ShareFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Share
     */
    select?: ShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Share
     */
    omit?: ShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareInclude<ExtArgs> | null
    /**
     * Filter, which Share to fetch.
     */
    where?: ShareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shares to fetch.
     */
    orderBy?: ShareOrderByWithRelationInput | ShareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shares.
     */
    cursor?: ShareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shares.
     */
    distinct?: ShareScalarFieldEnum | ShareScalarFieldEnum[]
  }

  /**
   * Share findMany
   */
  export type ShareFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Share
     */
    select?: ShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Share
     */
    omit?: ShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareInclude<ExtArgs> | null
    /**
     * Filter, which Shares to fetch.
     */
    where?: ShareWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shares to fetch.
     */
    orderBy?: ShareOrderByWithRelationInput | ShareOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Shares.
     */
    cursor?: ShareWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shares.
     */
    skip?: number
    distinct?: ShareScalarFieldEnum | ShareScalarFieldEnum[]
  }

  /**
   * Share create
   */
  export type ShareCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Share
     */
    select?: ShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Share
     */
    omit?: ShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareInclude<ExtArgs> | null
    /**
     * The data needed to create a Share.
     */
    data: XOR<ShareCreateInput, ShareUncheckedCreateInput>
  }

  /**
   * Share createMany
   */
  export type ShareCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Shares.
     */
    data: ShareCreateManyInput | ShareCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Share createManyAndReturn
   */
  export type ShareCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Share
     */
    select?: ShareSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Share
     */
    omit?: ShareOmit<ExtArgs> | null
    /**
     * The data used to create many Shares.
     */
    data: ShareCreateManyInput | ShareCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Share update
   */
  export type ShareUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Share
     */
    select?: ShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Share
     */
    omit?: ShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareInclude<ExtArgs> | null
    /**
     * The data needed to update a Share.
     */
    data: XOR<ShareUpdateInput, ShareUncheckedUpdateInput>
    /**
     * Choose, which Share to update.
     */
    where: ShareWhereUniqueInput
  }

  /**
   * Share updateMany
   */
  export type ShareUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Shares.
     */
    data: XOR<ShareUpdateManyMutationInput, ShareUncheckedUpdateManyInput>
    /**
     * Filter which Shares to update
     */
    where?: ShareWhereInput
    /**
     * Limit how many Shares to update.
     */
    limit?: number
  }

  /**
   * Share updateManyAndReturn
   */
  export type ShareUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Share
     */
    select?: ShareSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Share
     */
    omit?: ShareOmit<ExtArgs> | null
    /**
     * The data used to update Shares.
     */
    data: XOR<ShareUpdateManyMutationInput, ShareUncheckedUpdateManyInput>
    /**
     * Filter which Shares to update
     */
    where?: ShareWhereInput
    /**
     * Limit how many Shares to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Share upsert
   */
  export type ShareUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Share
     */
    select?: ShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Share
     */
    omit?: ShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareInclude<ExtArgs> | null
    /**
     * The filter to search for the Share to update in case it exists.
     */
    where: ShareWhereUniqueInput
    /**
     * In case the Share found by the `where` argument doesn't exist, create a new Share with this data.
     */
    create: XOR<ShareCreateInput, ShareUncheckedCreateInput>
    /**
     * In case the Share was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShareUpdateInput, ShareUncheckedUpdateInput>
  }

  /**
   * Share delete
   */
  export type ShareDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Share
     */
    select?: ShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Share
     */
    omit?: ShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareInclude<ExtArgs> | null
    /**
     * Filter which Share to delete.
     */
    where: ShareWhereUniqueInput
  }

  /**
   * Share deleteMany
   */
  export type ShareDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shares to delete
     */
    where?: ShareWhereInput
    /**
     * Limit how many Shares to delete.
     */
    limit?: number
  }

  /**
   * Share.file
   */
  export type Share$fileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the File
     */
    select?: FileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the File
     */
    omit?: FileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FileInclude<ExtArgs> | null
    where?: FileWhereInput
  }

  /**
   * Share.folder
   */
  export type Share$folderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Folder
     */
    select?: FolderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Folder
     */
    omit?: FolderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FolderInclude<ExtArgs> | null
    where?: FolderWhereInput
  }

  /**
   * Share.sharedWith
   */
  export type Share$sharedWithArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
    where?: UserWhereInput
  }

  /**
   * Share without action
   */
  export type ShareDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Share
     */
    select?: ShareSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Share
     */
    omit?: ShareOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ShareInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    resourceType: string | null
    resourceId: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    resourceType: string | null
    resourceId: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    resourceType: number
    resourceId: number
    metadata: number
    ipAddress: number
    userAgent: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    resourceType?: true
    resourceId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    resourceType?: true
    resourceId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    resourceType?: true
    resourceId?: true
    metadata?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    userId: string
    action: string
    resourceType: string
    resourceId: string | null
    metadata: JsonValue
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    resourceType?: boolean
    resourceId?: boolean
    metadata?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "action" | "resourceType" | "resourceId" | "metadata" | "ipAddress" | "userAgent" | "createdAt", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      action: string
      resourceType: string
      resourceId: string | null
      metadata: Prisma.JsonValue
      ipAddress: string | null
      userAgent: string | null
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
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
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly resourceType: FieldRef<"AuditLog", 'String'>
    readonly resourceId: FieldRef<"AuditLog", 'String'>
    readonly metadata: FieldRef<"AuditLog", 'Json'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model UploadSession
   */

  export type AggregateUploadSession = {
    _count: UploadSessionCountAggregateOutputType | null
    _avg: UploadSessionAvgAggregateOutputType | null
    _sum: UploadSessionSumAggregateOutputType | null
    _min: UploadSessionMinAggregateOutputType | null
    _max: UploadSessionMaxAggregateOutputType | null
  }

  export type UploadSessionAvgAggregateOutputType = {
    fileSize: number | null
    progress: number | null
  }

  export type UploadSessionSumAggregateOutputType = {
    fileSize: bigint | null
    progress: number | null
  }

  export type UploadSessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    fileName: string | null
    fileSize: bigint | null
    mimeType: string | null
    folderId: string | null
    s3Key: string | null
    filePath: string | null
    status: $Enums.UploadStatus | null
    progress: number | null
    errorMessage: string | null
    uploadId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
  }

  export type UploadSessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    fileName: string | null
    fileSize: bigint | null
    mimeType: string | null
    folderId: string | null
    s3Key: string | null
    filePath: string | null
    status: $Enums.UploadStatus | null
    progress: number | null
    errorMessage: string | null
    uploadId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
  }

  export type UploadSessionCountAggregateOutputType = {
    id: number
    userId: number
    fileName: number
    fileSize: number
    mimeType: number
    folderId: number
    s3Key: number
    filePath: number
    status: number
    progress: number
    errorMessage: number
    uploadId: number
    createdAt: number
    updatedAt: number
    completedAt: number
    _all: number
  }


  export type UploadSessionAvgAggregateInputType = {
    fileSize?: true
    progress?: true
  }

  export type UploadSessionSumAggregateInputType = {
    fileSize?: true
    progress?: true
  }

  export type UploadSessionMinAggregateInputType = {
    id?: true
    userId?: true
    fileName?: true
    fileSize?: true
    mimeType?: true
    folderId?: true
    s3Key?: true
    filePath?: true
    status?: true
    progress?: true
    errorMessage?: true
    uploadId?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
  }

  export type UploadSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    fileName?: true
    fileSize?: true
    mimeType?: true
    folderId?: true
    s3Key?: true
    filePath?: true
    status?: true
    progress?: true
    errorMessage?: true
    uploadId?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
  }

  export type UploadSessionCountAggregateInputType = {
    id?: true
    userId?: true
    fileName?: true
    fileSize?: true
    mimeType?: true
    folderId?: true
    s3Key?: true
    filePath?: true
    status?: true
    progress?: true
    errorMessage?: true
    uploadId?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
    _all?: true
  }

  export type UploadSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UploadSession to aggregate.
     */
    where?: UploadSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadSessions to fetch.
     */
    orderBy?: UploadSessionOrderByWithRelationInput | UploadSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UploadSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UploadSessions
    **/
    _count?: true | UploadSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UploadSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UploadSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UploadSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UploadSessionMaxAggregateInputType
  }

  export type GetUploadSessionAggregateType<T extends UploadSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateUploadSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUploadSession[P]>
      : GetScalarType<T[P], AggregateUploadSession[P]>
  }




  export type UploadSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UploadSessionWhereInput
    orderBy?: UploadSessionOrderByWithAggregationInput | UploadSessionOrderByWithAggregationInput[]
    by: UploadSessionScalarFieldEnum[] | UploadSessionScalarFieldEnum
    having?: UploadSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UploadSessionCountAggregateInputType | true
    _avg?: UploadSessionAvgAggregateInputType
    _sum?: UploadSessionSumAggregateInputType
    _min?: UploadSessionMinAggregateInputType
    _max?: UploadSessionMaxAggregateInputType
  }

  export type UploadSessionGroupByOutputType = {
    id: string
    userId: string
    fileName: string
    fileSize: bigint | null
    mimeType: string | null
    folderId: string | null
    s3Key: string | null
    filePath: string | null
    status: $Enums.UploadStatus
    progress: number
    errorMessage: string | null
    uploadId: string | null
    createdAt: Date
    updatedAt: Date
    completedAt: Date | null
    _count: UploadSessionCountAggregateOutputType | null
    _avg: UploadSessionAvgAggregateOutputType | null
    _sum: UploadSessionSumAggregateOutputType | null
    _min: UploadSessionMinAggregateOutputType | null
    _max: UploadSessionMaxAggregateOutputType | null
  }

  type GetUploadSessionGroupByPayload<T extends UploadSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UploadSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UploadSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UploadSessionGroupByOutputType[P]>
            : GetScalarType<T[P], UploadSessionGroupByOutputType[P]>
        }
      >
    >


  export type UploadSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fileName?: boolean
    fileSize?: boolean
    mimeType?: boolean
    folderId?: boolean
    s3Key?: boolean
    filePath?: boolean
    status?: boolean
    progress?: boolean
    errorMessage?: boolean
    uploadId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadSession"]>

  export type UploadSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fileName?: boolean
    fileSize?: boolean
    mimeType?: boolean
    folderId?: boolean
    s3Key?: boolean
    filePath?: boolean
    status?: boolean
    progress?: boolean
    errorMessage?: boolean
    uploadId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadSession"]>

  export type UploadSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    fileName?: boolean
    fileSize?: boolean
    mimeType?: boolean
    folderId?: boolean
    s3Key?: boolean
    filePath?: boolean
    status?: boolean
    progress?: boolean
    errorMessage?: boolean
    uploadId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadSession"]>

  export type UploadSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    fileName?: boolean
    fileSize?: boolean
    mimeType?: boolean
    folderId?: boolean
    s3Key?: boolean
    filePath?: boolean
    status?: boolean
    progress?: boolean
    errorMessage?: boolean
    uploadId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
  }

  export type UploadSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "fileName" | "fileSize" | "mimeType" | "folderId" | "s3Key" | "filePath" | "status" | "progress" | "errorMessage" | "uploadId" | "createdAt" | "updatedAt" | "completedAt", ExtArgs["result"]["uploadSession"]>
  export type UploadSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UploadSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UploadSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UploadSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UploadSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      fileName: string
      fileSize: bigint | null
      mimeType: string | null
      folderId: string | null
      s3Key: string | null
      filePath: string | null
      status: $Enums.UploadStatus
      progress: number
      errorMessage: string | null
      uploadId: string | null
      createdAt: Date
      updatedAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["uploadSession"]>
    composites: {}
  }

  type UploadSessionGetPayload<S extends boolean | null | undefined | UploadSessionDefaultArgs> = $Result.GetResult<Prisma.$UploadSessionPayload, S>

  type UploadSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UploadSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UploadSessionCountAggregateInputType | true
    }

  export interface UploadSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UploadSession'], meta: { name: 'UploadSession' } }
    /**
     * Find zero or one UploadSession that matches the filter.
     * @param {UploadSessionFindUniqueArgs} args - Arguments to find a UploadSession
     * @example
     * // Get one UploadSession
     * const uploadSession = await prisma.uploadSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UploadSessionFindUniqueArgs>(args: SelectSubset<T, UploadSessionFindUniqueArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UploadSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UploadSessionFindUniqueOrThrowArgs} args - Arguments to find a UploadSession
     * @example
     * // Get one UploadSession
     * const uploadSession = await prisma.uploadSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UploadSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, UploadSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UploadSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionFindFirstArgs} args - Arguments to find a UploadSession
     * @example
     * // Get one UploadSession
     * const uploadSession = await prisma.uploadSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UploadSessionFindFirstArgs>(args?: SelectSubset<T, UploadSessionFindFirstArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UploadSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionFindFirstOrThrowArgs} args - Arguments to find a UploadSession
     * @example
     * // Get one UploadSession
     * const uploadSession = await prisma.uploadSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UploadSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, UploadSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UploadSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UploadSessions
     * const uploadSessions = await prisma.uploadSession.findMany()
     * 
     * // Get first 10 UploadSessions
     * const uploadSessions = await prisma.uploadSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const uploadSessionWithIdOnly = await prisma.uploadSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UploadSessionFindManyArgs>(args?: SelectSubset<T, UploadSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UploadSession.
     * @param {UploadSessionCreateArgs} args - Arguments to create a UploadSession.
     * @example
     * // Create one UploadSession
     * const UploadSession = await prisma.uploadSession.create({
     *   data: {
     *     // ... data to create a UploadSession
     *   }
     * })
     * 
     */
    create<T extends UploadSessionCreateArgs>(args: SelectSubset<T, UploadSessionCreateArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UploadSessions.
     * @param {UploadSessionCreateManyArgs} args - Arguments to create many UploadSessions.
     * @example
     * // Create many UploadSessions
     * const uploadSession = await prisma.uploadSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UploadSessionCreateManyArgs>(args?: SelectSubset<T, UploadSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UploadSessions and returns the data saved in the database.
     * @param {UploadSessionCreateManyAndReturnArgs} args - Arguments to create many UploadSessions.
     * @example
     * // Create many UploadSessions
     * const uploadSession = await prisma.uploadSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UploadSessions and only return the `id`
     * const uploadSessionWithIdOnly = await prisma.uploadSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UploadSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, UploadSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UploadSession.
     * @param {UploadSessionDeleteArgs} args - Arguments to delete one UploadSession.
     * @example
     * // Delete one UploadSession
     * const UploadSession = await prisma.uploadSession.delete({
     *   where: {
     *     // ... filter to delete one UploadSession
     *   }
     * })
     * 
     */
    delete<T extends UploadSessionDeleteArgs>(args: SelectSubset<T, UploadSessionDeleteArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UploadSession.
     * @param {UploadSessionUpdateArgs} args - Arguments to update one UploadSession.
     * @example
     * // Update one UploadSession
     * const uploadSession = await prisma.uploadSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UploadSessionUpdateArgs>(args: SelectSubset<T, UploadSessionUpdateArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UploadSessions.
     * @param {UploadSessionDeleteManyArgs} args - Arguments to filter UploadSessions to delete.
     * @example
     * // Delete a few UploadSessions
     * const { count } = await prisma.uploadSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UploadSessionDeleteManyArgs>(args?: SelectSubset<T, UploadSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UploadSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UploadSessions
     * const uploadSession = await prisma.uploadSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UploadSessionUpdateManyArgs>(args: SelectSubset<T, UploadSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UploadSessions and returns the data updated in the database.
     * @param {UploadSessionUpdateManyAndReturnArgs} args - Arguments to update many UploadSessions.
     * @example
     * // Update many UploadSessions
     * const uploadSession = await prisma.uploadSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UploadSessions and only return the `id`
     * const uploadSessionWithIdOnly = await prisma.uploadSession.updateManyAndReturn({
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
    updateManyAndReturn<T extends UploadSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, UploadSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UploadSession.
     * @param {UploadSessionUpsertArgs} args - Arguments to update or create a UploadSession.
     * @example
     * // Update or create a UploadSession
     * const uploadSession = await prisma.uploadSession.upsert({
     *   create: {
     *     // ... data to create a UploadSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UploadSession we want to update
     *   }
     * })
     */
    upsert<T extends UploadSessionUpsertArgs>(args: SelectSubset<T, UploadSessionUpsertArgs<ExtArgs>>): Prisma__UploadSessionClient<$Result.GetResult<Prisma.$UploadSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UploadSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionCountArgs} args - Arguments to filter UploadSessions to count.
     * @example
     * // Count the number of UploadSessions
     * const count = await prisma.uploadSession.count({
     *   where: {
     *     // ... the filter for the UploadSessions we want to count
     *   }
     * })
    **/
    count<T extends UploadSessionCountArgs>(
      args?: Subset<T, UploadSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UploadSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UploadSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UploadSessionAggregateArgs>(args: Subset<T, UploadSessionAggregateArgs>): Prisma.PrismaPromise<GetUploadSessionAggregateType<T>>

    /**
     * Group by UploadSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadSessionGroupByArgs} args - Group by arguments.
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
      T extends UploadSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UploadSessionGroupByArgs['orderBy'] }
        : { orderBy?: UploadSessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UploadSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUploadSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UploadSession model
   */
  readonly fields: UploadSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UploadSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UploadSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the UploadSession model
   */
  interface UploadSessionFieldRefs {
    readonly id: FieldRef<"UploadSession", 'String'>
    readonly userId: FieldRef<"UploadSession", 'String'>
    readonly fileName: FieldRef<"UploadSession", 'String'>
    readonly fileSize: FieldRef<"UploadSession", 'BigInt'>
    readonly mimeType: FieldRef<"UploadSession", 'String'>
    readonly folderId: FieldRef<"UploadSession", 'String'>
    readonly s3Key: FieldRef<"UploadSession", 'String'>
    readonly filePath: FieldRef<"UploadSession", 'String'>
    readonly status: FieldRef<"UploadSession", 'UploadStatus'>
    readonly progress: FieldRef<"UploadSession", 'Float'>
    readonly errorMessage: FieldRef<"UploadSession", 'String'>
    readonly uploadId: FieldRef<"UploadSession", 'String'>
    readonly createdAt: FieldRef<"UploadSession", 'DateTime'>
    readonly updatedAt: FieldRef<"UploadSession", 'DateTime'>
    readonly completedAt: FieldRef<"UploadSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UploadSession findUnique
   */
  export type UploadSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * Filter, which UploadSession to fetch.
     */
    where: UploadSessionWhereUniqueInput
  }

  /**
   * UploadSession findUniqueOrThrow
   */
  export type UploadSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * Filter, which UploadSession to fetch.
     */
    where: UploadSessionWhereUniqueInput
  }

  /**
   * UploadSession findFirst
   */
  export type UploadSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * Filter, which UploadSession to fetch.
     */
    where?: UploadSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadSessions to fetch.
     */
    orderBy?: UploadSessionOrderByWithRelationInput | UploadSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadSessions.
     */
    cursor?: UploadSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadSessions.
     */
    distinct?: UploadSessionScalarFieldEnum | UploadSessionScalarFieldEnum[]
  }

  /**
   * UploadSession findFirstOrThrow
   */
  export type UploadSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * Filter, which UploadSession to fetch.
     */
    where?: UploadSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadSessions to fetch.
     */
    orderBy?: UploadSessionOrderByWithRelationInput | UploadSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadSessions.
     */
    cursor?: UploadSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadSessions.
     */
    distinct?: UploadSessionScalarFieldEnum | UploadSessionScalarFieldEnum[]
  }

  /**
   * UploadSession findMany
   */
  export type UploadSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * Filter, which UploadSessions to fetch.
     */
    where?: UploadSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadSessions to fetch.
     */
    orderBy?: UploadSessionOrderByWithRelationInput | UploadSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UploadSessions.
     */
    cursor?: UploadSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadSessions.
     */
    skip?: number
    distinct?: UploadSessionScalarFieldEnum | UploadSessionScalarFieldEnum[]
  }

  /**
   * UploadSession create
   */
  export type UploadSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a UploadSession.
     */
    data: XOR<UploadSessionCreateInput, UploadSessionUncheckedCreateInput>
  }

  /**
   * UploadSession createMany
   */
  export type UploadSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UploadSessions.
     */
    data: UploadSessionCreateManyInput | UploadSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UploadSession createManyAndReturn
   */
  export type UploadSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * The data used to create many UploadSessions.
     */
    data: UploadSessionCreateManyInput | UploadSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UploadSession update
   */
  export type UploadSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a UploadSession.
     */
    data: XOR<UploadSessionUpdateInput, UploadSessionUncheckedUpdateInput>
    /**
     * Choose, which UploadSession to update.
     */
    where: UploadSessionWhereUniqueInput
  }

  /**
   * UploadSession updateMany
   */
  export type UploadSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UploadSessions.
     */
    data: XOR<UploadSessionUpdateManyMutationInput, UploadSessionUncheckedUpdateManyInput>
    /**
     * Filter which UploadSessions to update
     */
    where?: UploadSessionWhereInput
    /**
     * Limit how many UploadSessions to update.
     */
    limit?: number
  }

  /**
   * UploadSession updateManyAndReturn
   */
  export type UploadSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * The data used to update UploadSessions.
     */
    data: XOR<UploadSessionUpdateManyMutationInput, UploadSessionUncheckedUpdateManyInput>
    /**
     * Filter which UploadSessions to update
     */
    where?: UploadSessionWhereInput
    /**
     * Limit how many UploadSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UploadSession upsert
   */
  export type UploadSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the UploadSession to update in case it exists.
     */
    where: UploadSessionWhereUniqueInput
    /**
     * In case the UploadSession found by the `where` argument doesn't exist, create a new UploadSession with this data.
     */
    create: XOR<UploadSessionCreateInput, UploadSessionUncheckedCreateInput>
    /**
     * In case the UploadSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UploadSessionUpdateInput, UploadSessionUncheckedUpdateInput>
  }

  /**
   * UploadSession delete
   */
  export type UploadSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
    /**
     * Filter which UploadSession to delete.
     */
    where: UploadSessionWhereUniqueInput
  }

  /**
   * UploadSession deleteMany
   */
  export type UploadSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UploadSessions to delete
     */
    where?: UploadSessionWhereInput
    /**
     * Limit how many UploadSessions to delete.
     */
    limit?: number
  }

  /**
   * UploadSession without action
   */
  export type UploadSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadSession
     */
    select?: UploadSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadSession
     */
    omit?: UploadSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadSessionInclude<ExtArgs> | null
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
    email: 'email',
    name: 'name',
    password: 'password',
    hexId: 'hexId',
    role: 'role',
    profilePicture: 'profilePicture',
    profilePictureS3Key: 'profilePictureS3Key',
    storageQuota: 'storageQuota',
    storageUsed: 'storageUsed',
    planType: 'planType',
    refreshToken: 'refreshToken',
    passwordResetToken: 'passwordResetToken',
    passwordResetExpiry: 'passwordResetExpiry',
    isEmailVerified: 'isEmailVerified',
    mfaEnabled: 'mfaEnabled',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastLoginAt: 'lastLoginAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FolderScalarFieldEnum: {
    id: 'id',
    name: 'name',
    parentId: 'parentId',
    userId: 'userId',
    color: 'color',
    description: 'description',
    isStarred: 'isStarred',
    isInTrash: 'isInTrash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    trashedAt: 'trashedAt'
  };

  export type FolderScalarFieldEnum = (typeof FolderScalarFieldEnum)[keyof typeof FolderScalarFieldEnum]


  export const FileScalarFieldEnum: {
    id: 'id',
    name: 'name',
    originalName: 'originalName',
    mimeType: 'mimeType',
    size: 'size',
    filePath: 'filePath',
    s3Key: 's3Key',
    cloudFrontUrl: 'cloudFrontUrl',
    folderId: 'folderId',
    userId: 'userId',
    checksum: 'checksum',
    thumbnail: 'thumbnail',
    versionCount: 'versionCount',
    isStarred: 'isStarred',
    isInTrash: 'isInTrash',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    trashedAt: 'trashedAt',
    lastAccessedAt: 'lastAccessedAt'
  };

  export type FileScalarFieldEnum = (typeof FileScalarFieldEnum)[keyof typeof FileScalarFieldEnum]


  export const FileVersionScalarFieldEnum: {
    id: 'id',
    fileId: 'fileId',
    versionNumber: 'versionNumber',
    s3Key: 's3Key',
    size: 'size',
    createdById: 'createdById',
    isCurrent: 'isCurrent',
    label: 'label',
    createdAt: 'createdAt'
  };

  export type FileVersionScalarFieldEnum = (typeof FileVersionScalarFieldEnum)[keyof typeof FileVersionScalarFieldEnum]


  export const ShareScalarFieldEnum: {
    id: 'id',
    fileId: 'fileId',
    folderId: 'folderId',
    sharedByUserId: 'sharedByUserId',
    sharedWithUserId: 'sharedWithUserId',
    sharedWithEmail: 'sharedWithEmail',
    permissionLevel: 'permissionLevel',
    shareToken: 'shareToken',
    isPublic: 'isPublic',
    expiresAt: 'expiresAt',
    isRevoked: 'isRevoked',
    accessCount: 'accessCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ShareScalarFieldEnum = (typeof ShareScalarFieldEnum)[keyof typeof ShareScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    resourceType: 'resourceType',
    resourceId: 'resourceId',
    metadata: 'metadata',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const UploadSessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    fileName: 'fileName',
    fileSize: 'fileSize',
    mimeType: 'mimeType',
    folderId: 'folderId',
    s3Key: 's3Key',
    filePath: 'filePath',
    status: 'status',
    progress: 'progress',
    errorMessage: 'errorMessage',
    uploadId: 'uploadId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    completedAt: 'completedAt'
  };

  export type UploadSessionScalarFieldEnum = (typeof UploadSessionScalarFieldEnum)[keyof typeof UploadSessionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'PlanType'
   */
  export type EnumPlanTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanType'>
    


  /**
   * Reference to a field of type 'PlanType[]'
   */
  export type ListEnumPlanTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanType[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'PermissionLevel'
   */
  export type EnumPermissionLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PermissionLevel'>
    


  /**
   * Reference to a field of type 'PermissionLevel[]'
   */
  export type ListEnumPermissionLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PermissionLevel[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'UploadStatus'
   */
  export type EnumUploadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UploadStatus'>
    


  /**
   * Reference to a field of type 'UploadStatus[]'
   */
  export type ListEnumUploadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UploadStatus[]'>
    


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
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    hexId?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    profilePicture?: StringNullableFilter<"User"> | string | null
    profilePictureS3Key?: StringNullableFilter<"User"> | string | null
    storageQuota?: BigIntFilter<"User"> | bigint | number
    storageUsed?: BigIntFilter<"User"> | bigint | number
    planType?: EnumPlanTypeFilter<"User"> | $Enums.PlanType
    refreshToken?: StringNullableFilter<"User"> | string | null
    passwordResetToken?: StringNullableFilter<"User"> | string | null
    passwordResetExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    isEmailVerified?: BoolFilter<"User"> | boolean
    mfaEnabled?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    folders?: FolderListRelationFilter
    files?: FileListRelationFilter
    uploadSessions?: UploadSessionListRelationFilter
    sharesCreated?: ShareListRelationFilter
    sharesReceived?: ShareListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    fileVersions?: FileVersionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    hexId?: SortOrderInput | SortOrder
    role?: SortOrder
    profilePicture?: SortOrderInput | SortOrder
    profilePictureS3Key?: SortOrderInput | SortOrder
    storageQuota?: SortOrder
    storageUsed?: SortOrder
    planType?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    passwordResetToken?: SortOrderInput | SortOrder
    passwordResetExpiry?: SortOrderInput | SortOrder
    isEmailVerified?: SortOrder
    mfaEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    folders?: FolderOrderByRelationAggregateInput
    files?: FileOrderByRelationAggregateInput
    uploadSessions?: UploadSessionOrderByRelationAggregateInput
    sharesCreated?: ShareOrderByRelationAggregateInput
    sharesReceived?: ShareOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
    fileVersions?: FileVersionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    hexId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    profilePicture?: StringNullableFilter<"User"> | string | null
    profilePictureS3Key?: StringNullableFilter<"User"> | string | null
    storageQuota?: BigIntFilter<"User"> | bigint | number
    storageUsed?: BigIntFilter<"User"> | bigint | number
    planType?: EnumPlanTypeFilter<"User"> | $Enums.PlanType
    refreshToken?: StringNullableFilter<"User"> | string | null
    passwordResetToken?: StringNullableFilter<"User"> | string | null
    passwordResetExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    isEmailVerified?: BoolFilter<"User"> | boolean
    mfaEnabled?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    folders?: FolderListRelationFilter
    files?: FileListRelationFilter
    uploadSessions?: UploadSessionListRelationFilter
    sharesCreated?: ShareListRelationFilter
    sharesReceived?: ShareListRelationFilter
    auditLogs?: AuditLogListRelationFilter
    fileVersions?: FileVersionListRelationFilter
  }, "id" | "email" | "hexId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    hexId?: SortOrderInput | SortOrder
    role?: SortOrder
    profilePicture?: SortOrderInput | SortOrder
    profilePictureS3Key?: SortOrderInput | SortOrder
    storageQuota?: SortOrder
    storageUsed?: SortOrder
    planType?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    passwordResetToken?: SortOrderInput | SortOrder
    passwordResetExpiry?: SortOrderInput | SortOrder
    isEmailVerified?: SortOrder
    mfaEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    hexId?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    profilePicture?: StringNullableWithAggregatesFilter<"User"> | string | null
    profilePictureS3Key?: StringNullableWithAggregatesFilter<"User"> | string | null
    storageQuota?: BigIntWithAggregatesFilter<"User"> | bigint | number
    storageUsed?: BigIntWithAggregatesFilter<"User"> | bigint | number
    planType?: EnumPlanTypeWithAggregatesFilter<"User"> | $Enums.PlanType
    refreshToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordResetToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordResetExpiry?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    isEmailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    mfaEnabled?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type FolderWhereInput = {
    AND?: FolderWhereInput | FolderWhereInput[]
    OR?: FolderWhereInput[]
    NOT?: FolderWhereInput | FolderWhereInput[]
    id?: StringFilter<"Folder"> | string
    name?: StringFilter<"Folder"> | string
    parentId?: StringNullableFilter<"Folder"> | string | null
    userId?: StringFilter<"Folder"> | string
    color?: StringNullableFilter<"Folder"> | string | null
    description?: StringNullableFilter<"Folder"> | string | null
    isStarred?: BoolFilter<"Folder"> | boolean
    isInTrash?: BoolFilter<"Folder"> | boolean
    createdAt?: DateTimeFilter<"Folder"> | Date | string
    updatedAt?: DateTimeFilter<"Folder"> | Date | string
    trashedAt?: DateTimeNullableFilter<"Folder"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    parent?: XOR<FolderNullableScalarRelationFilter, FolderWhereInput> | null
    children?: FolderListRelationFilter
    files?: FileListRelationFilter
    shares?: ShareListRelationFilter
  }

  export type FolderOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrderInput | SortOrder
    userId?: SortOrder
    color?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isStarred?: SortOrder
    isInTrash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trashedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    parent?: FolderOrderByWithRelationInput
    children?: FolderOrderByRelationAggregateInput
    files?: FileOrderByRelationAggregateInput
    shares?: ShareOrderByRelationAggregateInput
  }

  export type FolderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FolderWhereInput | FolderWhereInput[]
    OR?: FolderWhereInput[]
    NOT?: FolderWhereInput | FolderWhereInput[]
    name?: StringFilter<"Folder"> | string
    parentId?: StringNullableFilter<"Folder"> | string | null
    userId?: StringFilter<"Folder"> | string
    color?: StringNullableFilter<"Folder"> | string | null
    description?: StringNullableFilter<"Folder"> | string | null
    isStarred?: BoolFilter<"Folder"> | boolean
    isInTrash?: BoolFilter<"Folder"> | boolean
    createdAt?: DateTimeFilter<"Folder"> | Date | string
    updatedAt?: DateTimeFilter<"Folder"> | Date | string
    trashedAt?: DateTimeNullableFilter<"Folder"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    parent?: XOR<FolderNullableScalarRelationFilter, FolderWhereInput> | null
    children?: FolderListRelationFilter
    files?: FileListRelationFilter
    shares?: ShareListRelationFilter
  }, "id">

  export type FolderOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrderInput | SortOrder
    userId?: SortOrder
    color?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    isStarred?: SortOrder
    isInTrash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trashedAt?: SortOrderInput | SortOrder
    _count?: FolderCountOrderByAggregateInput
    _max?: FolderMaxOrderByAggregateInput
    _min?: FolderMinOrderByAggregateInput
  }

  export type FolderScalarWhereWithAggregatesInput = {
    AND?: FolderScalarWhereWithAggregatesInput | FolderScalarWhereWithAggregatesInput[]
    OR?: FolderScalarWhereWithAggregatesInput[]
    NOT?: FolderScalarWhereWithAggregatesInput | FolderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Folder"> | string
    name?: StringWithAggregatesFilter<"Folder"> | string
    parentId?: StringNullableWithAggregatesFilter<"Folder"> | string | null
    userId?: StringWithAggregatesFilter<"Folder"> | string
    color?: StringNullableWithAggregatesFilter<"Folder"> | string | null
    description?: StringNullableWithAggregatesFilter<"Folder"> | string | null
    isStarred?: BoolWithAggregatesFilter<"Folder"> | boolean
    isInTrash?: BoolWithAggregatesFilter<"Folder"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Folder"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Folder"> | Date | string
    trashedAt?: DateTimeNullableWithAggregatesFilter<"Folder"> | Date | string | null
  }

  export type FileWhereInput = {
    AND?: FileWhereInput | FileWhereInput[]
    OR?: FileWhereInput[]
    NOT?: FileWhereInput | FileWhereInput[]
    id?: StringFilter<"File"> | string
    name?: StringFilter<"File"> | string
    originalName?: StringFilter<"File"> | string
    mimeType?: StringFilter<"File"> | string
    size?: BigIntFilter<"File"> | bigint | number
    filePath?: StringNullableFilter<"File"> | string | null
    s3Key?: StringNullableFilter<"File"> | string | null
    cloudFrontUrl?: StringNullableFilter<"File"> | string | null
    folderId?: StringNullableFilter<"File"> | string | null
    userId?: StringFilter<"File"> | string
    checksum?: StringNullableFilter<"File"> | string | null
    thumbnail?: StringNullableFilter<"File"> | string | null
    versionCount?: IntFilter<"File"> | number
    isStarred?: BoolFilter<"File"> | boolean
    isInTrash?: BoolFilter<"File"> | boolean
    createdAt?: DateTimeFilter<"File"> | Date | string
    updatedAt?: DateTimeFilter<"File"> | Date | string
    trashedAt?: DateTimeNullableFilter<"File"> | Date | string | null
    lastAccessedAt?: DateTimeNullableFilter<"File"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    folder?: XOR<FolderNullableScalarRelationFilter, FolderWhereInput> | null
    shares?: ShareListRelationFilter
    versions?: FileVersionListRelationFilter
  }

  export type FileOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    filePath?: SortOrderInput | SortOrder
    s3Key?: SortOrderInput | SortOrder
    cloudFrontUrl?: SortOrderInput | SortOrder
    folderId?: SortOrderInput | SortOrder
    userId?: SortOrder
    checksum?: SortOrderInput | SortOrder
    thumbnail?: SortOrderInput | SortOrder
    versionCount?: SortOrder
    isStarred?: SortOrder
    isInTrash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trashedAt?: SortOrderInput | SortOrder
    lastAccessedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    folder?: FolderOrderByWithRelationInput
    shares?: ShareOrderByRelationAggregateInput
    versions?: FileVersionOrderByRelationAggregateInput
  }

  export type FileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FileWhereInput | FileWhereInput[]
    OR?: FileWhereInput[]
    NOT?: FileWhereInput | FileWhereInput[]
    name?: StringFilter<"File"> | string
    originalName?: StringFilter<"File"> | string
    mimeType?: StringFilter<"File"> | string
    size?: BigIntFilter<"File"> | bigint | number
    filePath?: StringNullableFilter<"File"> | string | null
    s3Key?: StringNullableFilter<"File"> | string | null
    cloudFrontUrl?: StringNullableFilter<"File"> | string | null
    folderId?: StringNullableFilter<"File"> | string | null
    userId?: StringFilter<"File"> | string
    checksum?: StringNullableFilter<"File"> | string | null
    thumbnail?: StringNullableFilter<"File"> | string | null
    versionCount?: IntFilter<"File"> | number
    isStarred?: BoolFilter<"File"> | boolean
    isInTrash?: BoolFilter<"File"> | boolean
    createdAt?: DateTimeFilter<"File"> | Date | string
    updatedAt?: DateTimeFilter<"File"> | Date | string
    trashedAt?: DateTimeNullableFilter<"File"> | Date | string | null
    lastAccessedAt?: DateTimeNullableFilter<"File"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    folder?: XOR<FolderNullableScalarRelationFilter, FolderWhereInput> | null
    shares?: ShareListRelationFilter
    versions?: FileVersionListRelationFilter
  }, "id">

  export type FileOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    filePath?: SortOrderInput | SortOrder
    s3Key?: SortOrderInput | SortOrder
    cloudFrontUrl?: SortOrderInput | SortOrder
    folderId?: SortOrderInput | SortOrder
    userId?: SortOrder
    checksum?: SortOrderInput | SortOrder
    thumbnail?: SortOrderInput | SortOrder
    versionCount?: SortOrder
    isStarred?: SortOrder
    isInTrash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trashedAt?: SortOrderInput | SortOrder
    lastAccessedAt?: SortOrderInput | SortOrder
    _count?: FileCountOrderByAggregateInput
    _avg?: FileAvgOrderByAggregateInput
    _max?: FileMaxOrderByAggregateInput
    _min?: FileMinOrderByAggregateInput
    _sum?: FileSumOrderByAggregateInput
  }

  export type FileScalarWhereWithAggregatesInput = {
    AND?: FileScalarWhereWithAggregatesInput | FileScalarWhereWithAggregatesInput[]
    OR?: FileScalarWhereWithAggregatesInput[]
    NOT?: FileScalarWhereWithAggregatesInput | FileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"File"> | string
    name?: StringWithAggregatesFilter<"File"> | string
    originalName?: StringWithAggregatesFilter<"File"> | string
    mimeType?: StringWithAggregatesFilter<"File"> | string
    size?: BigIntWithAggregatesFilter<"File"> | bigint | number
    filePath?: StringNullableWithAggregatesFilter<"File"> | string | null
    s3Key?: StringNullableWithAggregatesFilter<"File"> | string | null
    cloudFrontUrl?: StringNullableWithAggregatesFilter<"File"> | string | null
    folderId?: StringNullableWithAggregatesFilter<"File"> | string | null
    userId?: StringWithAggregatesFilter<"File"> | string
    checksum?: StringNullableWithAggregatesFilter<"File"> | string | null
    thumbnail?: StringNullableWithAggregatesFilter<"File"> | string | null
    versionCount?: IntWithAggregatesFilter<"File"> | number
    isStarred?: BoolWithAggregatesFilter<"File"> | boolean
    isInTrash?: BoolWithAggregatesFilter<"File"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"File"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"File"> | Date | string
    trashedAt?: DateTimeNullableWithAggregatesFilter<"File"> | Date | string | null
    lastAccessedAt?: DateTimeNullableWithAggregatesFilter<"File"> | Date | string | null
  }

  export type FileVersionWhereInput = {
    AND?: FileVersionWhereInput | FileVersionWhereInput[]
    OR?: FileVersionWhereInput[]
    NOT?: FileVersionWhereInput | FileVersionWhereInput[]
    id?: StringFilter<"FileVersion"> | string
    fileId?: StringFilter<"FileVersion"> | string
    versionNumber?: IntFilter<"FileVersion"> | number
    s3Key?: StringFilter<"FileVersion"> | string
    size?: BigIntFilter<"FileVersion"> | bigint | number
    createdById?: StringFilter<"FileVersion"> | string
    isCurrent?: BoolFilter<"FileVersion"> | boolean
    label?: StringNullableFilter<"FileVersion"> | string | null
    createdAt?: DateTimeFilter<"FileVersion"> | Date | string
    file?: XOR<FileScalarRelationFilter, FileWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FileVersionOrderByWithRelationInput = {
    id?: SortOrder
    fileId?: SortOrder
    versionNumber?: SortOrder
    s3Key?: SortOrder
    size?: SortOrder
    createdById?: SortOrder
    isCurrent?: SortOrder
    label?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    file?: FileOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type FileVersionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FileVersionWhereInput | FileVersionWhereInput[]
    OR?: FileVersionWhereInput[]
    NOT?: FileVersionWhereInput | FileVersionWhereInput[]
    fileId?: StringFilter<"FileVersion"> | string
    versionNumber?: IntFilter<"FileVersion"> | number
    s3Key?: StringFilter<"FileVersion"> | string
    size?: BigIntFilter<"FileVersion"> | bigint | number
    createdById?: StringFilter<"FileVersion"> | string
    isCurrent?: BoolFilter<"FileVersion"> | boolean
    label?: StringNullableFilter<"FileVersion"> | string | null
    createdAt?: DateTimeFilter<"FileVersion"> | Date | string
    file?: XOR<FileScalarRelationFilter, FileWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type FileVersionOrderByWithAggregationInput = {
    id?: SortOrder
    fileId?: SortOrder
    versionNumber?: SortOrder
    s3Key?: SortOrder
    size?: SortOrder
    createdById?: SortOrder
    isCurrent?: SortOrder
    label?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FileVersionCountOrderByAggregateInput
    _avg?: FileVersionAvgOrderByAggregateInput
    _max?: FileVersionMaxOrderByAggregateInput
    _min?: FileVersionMinOrderByAggregateInput
    _sum?: FileVersionSumOrderByAggregateInput
  }

  export type FileVersionScalarWhereWithAggregatesInput = {
    AND?: FileVersionScalarWhereWithAggregatesInput | FileVersionScalarWhereWithAggregatesInput[]
    OR?: FileVersionScalarWhereWithAggregatesInput[]
    NOT?: FileVersionScalarWhereWithAggregatesInput | FileVersionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FileVersion"> | string
    fileId?: StringWithAggregatesFilter<"FileVersion"> | string
    versionNumber?: IntWithAggregatesFilter<"FileVersion"> | number
    s3Key?: StringWithAggregatesFilter<"FileVersion"> | string
    size?: BigIntWithAggregatesFilter<"FileVersion"> | bigint | number
    createdById?: StringWithAggregatesFilter<"FileVersion"> | string
    isCurrent?: BoolWithAggregatesFilter<"FileVersion"> | boolean
    label?: StringNullableWithAggregatesFilter<"FileVersion"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FileVersion"> | Date | string
  }

  export type ShareWhereInput = {
    AND?: ShareWhereInput | ShareWhereInput[]
    OR?: ShareWhereInput[]
    NOT?: ShareWhereInput | ShareWhereInput[]
    id?: StringFilter<"Share"> | string
    fileId?: StringNullableFilter<"Share"> | string | null
    folderId?: StringNullableFilter<"Share"> | string | null
    sharedByUserId?: StringFilter<"Share"> | string
    sharedWithUserId?: StringNullableFilter<"Share"> | string | null
    sharedWithEmail?: StringNullableFilter<"Share"> | string | null
    permissionLevel?: EnumPermissionLevelFilter<"Share"> | $Enums.PermissionLevel
    shareToken?: StringFilter<"Share"> | string
    isPublic?: BoolFilter<"Share"> | boolean
    expiresAt?: DateTimeNullableFilter<"Share"> | Date | string | null
    isRevoked?: BoolFilter<"Share"> | boolean
    accessCount?: IntFilter<"Share"> | number
    createdAt?: DateTimeFilter<"Share"> | Date | string
    updatedAt?: DateTimeFilter<"Share"> | Date | string
    file?: XOR<FileNullableScalarRelationFilter, FileWhereInput> | null
    folder?: XOR<FolderNullableScalarRelationFilter, FolderWhereInput> | null
    sharedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    sharedWith?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type ShareOrderByWithRelationInput = {
    id?: SortOrder
    fileId?: SortOrderInput | SortOrder
    folderId?: SortOrderInput | SortOrder
    sharedByUserId?: SortOrder
    sharedWithUserId?: SortOrderInput | SortOrder
    sharedWithEmail?: SortOrderInput | SortOrder
    permissionLevel?: SortOrder
    shareToken?: SortOrder
    isPublic?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    isRevoked?: SortOrder
    accessCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    file?: FileOrderByWithRelationInput
    folder?: FolderOrderByWithRelationInput
    sharedBy?: UserOrderByWithRelationInput
    sharedWith?: UserOrderByWithRelationInput
  }

  export type ShareWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    shareToken?: string
    AND?: ShareWhereInput | ShareWhereInput[]
    OR?: ShareWhereInput[]
    NOT?: ShareWhereInput | ShareWhereInput[]
    fileId?: StringNullableFilter<"Share"> | string | null
    folderId?: StringNullableFilter<"Share"> | string | null
    sharedByUserId?: StringFilter<"Share"> | string
    sharedWithUserId?: StringNullableFilter<"Share"> | string | null
    sharedWithEmail?: StringNullableFilter<"Share"> | string | null
    permissionLevel?: EnumPermissionLevelFilter<"Share"> | $Enums.PermissionLevel
    isPublic?: BoolFilter<"Share"> | boolean
    expiresAt?: DateTimeNullableFilter<"Share"> | Date | string | null
    isRevoked?: BoolFilter<"Share"> | boolean
    accessCount?: IntFilter<"Share"> | number
    createdAt?: DateTimeFilter<"Share"> | Date | string
    updatedAt?: DateTimeFilter<"Share"> | Date | string
    file?: XOR<FileNullableScalarRelationFilter, FileWhereInput> | null
    folder?: XOR<FolderNullableScalarRelationFilter, FolderWhereInput> | null
    sharedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    sharedWith?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "shareToken">

  export type ShareOrderByWithAggregationInput = {
    id?: SortOrder
    fileId?: SortOrderInput | SortOrder
    folderId?: SortOrderInput | SortOrder
    sharedByUserId?: SortOrder
    sharedWithUserId?: SortOrderInput | SortOrder
    sharedWithEmail?: SortOrderInput | SortOrder
    permissionLevel?: SortOrder
    shareToken?: SortOrder
    isPublic?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    isRevoked?: SortOrder
    accessCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ShareCountOrderByAggregateInput
    _avg?: ShareAvgOrderByAggregateInput
    _max?: ShareMaxOrderByAggregateInput
    _min?: ShareMinOrderByAggregateInput
    _sum?: ShareSumOrderByAggregateInput
  }

  export type ShareScalarWhereWithAggregatesInput = {
    AND?: ShareScalarWhereWithAggregatesInput | ShareScalarWhereWithAggregatesInput[]
    OR?: ShareScalarWhereWithAggregatesInput[]
    NOT?: ShareScalarWhereWithAggregatesInput | ShareScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Share"> | string
    fileId?: StringNullableWithAggregatesFilter<"Share"> | string | null
    folderId?: StringNullableWithAggregatesFilter<"Share"> | string | null
    sharedByUserId?: StringWithAggregatesFilter<"Share"> | string
    sharedWithUserId?: StringNullableWithAggregatesFilter<"Share"> | string | null
    sharedWithEmail?: StringNullableWithAggregatesFilter<"Share"> | string | null
    permissionLevel?: EnumPermissionLevelWithAggregatesFilter<"Share"> | $Enums.PermissionLevel
    shareToken?: StringWithAggregatesFilter<"Share"> | string
    isPublic?: BoolWithAggregatesFilter<"Share"> | boolean
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Share"> | Date | string | null
    isRevoked?: BoolWithAggregatesFilter<"Share"> | boolean
    accessCount?: IntWithAggregatesFilter<"Share"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Share"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Share"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    resourceType?: StringFilter<"AuditLog"> | string
    resourceId?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: JsonFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    metadata?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    resourceType?: StringFilter<"AuditLog"> | string
    resourceId?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: JsonFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    metadata?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringWithAggregatesFilter<"AuditLog"> | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    resourceType?: StringWithAggregatesFilter<"AuditLog"> | string
    resourceId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    metadata?: JsonWithAggregatesFilter<"AuditLog">
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UploadSessionWhereInput = {
    AND?: UploadSessionWhereInput | UploadSessionWhereInput[]
    OR?: UploadSessionWhereInput[]
    NOT?: UploadSessionWhereInput | UploadSessionWhereInput[]
    id?: StringFilter<"UploadSession"> | string
    userId?: StringFilter<"UploadSession"> | string
    fileName?: StringFilter<"UploadSession"> | string
    fileSize?: BigIntNullableFilter<"UploadSession"> | bigint | number | null
    mimeType?: StringNullableFilter<"UploadSession"> | string | null
    folderId?: StringNullableFilter<"UploadSession"> | string | null
    s3Key?: StringNullableFilter<"UploadSession"> | string | null
    filePath?: StringNullableFilter<"UploadSession"> | string | null
    status?: EnumUploadStatusFilter<"UploadSession"> | $Enums.UploadStatus
    progress?: FloatFilter<"UploadSession"> | number
    errorMessage?: StringNullableFilter<"UploadSession"> | string | null
    uploadId?: StringNullableFilter<"UploadSession"> | string | null
    createdAt?: DateTimeFilter<"UploadSession"> | Date | string
    updatedAt?: DateTimeFilter<"UploadSession"> | Date | string
    completedAt?: DateTimeNullableFilter<"UploadSession"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UploadSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    fileSize?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    folderId?: SortOrderInput | SortOrder
    s3Key?: SortOrderInput | SortOrder
    filePath?: SortOrderInput | SortOrder
    status?: SortOrder
    progress?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    uploadId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UploadSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UploadSessionWhereInput | UploadSessionWhereInput[]
    OR?: UploadSessionWhereInput[]
    NOT?: UploadSessionWhereInput | UploadSessionWhereInput[]
    userId?: StringFilter<"UploadSession"> | string
    fileName?: StringFilter<"UploadSession"> | string
    fileSize?: BigIntNullableFilter<"UploadSession"> | bigint | number | null
    mimeType?: StringNullableFilter<"UploadSession"> | string | null
    folderId?: StringNullableFilter<"UploadSession"> | string | null
    s3Key?: StringNullableFilter<"UploadSession"> | string | null
    filePath?: StringNullableFilter<"UploadSession"> | string | null
    status?: EnumUploadStatusFilter<"UploadSession"> | $Enums.UploadStatus
    progress?: FloatFilter<"UploadSession"> | number
    errorMessage?: StringNullableFilter<"UploadSession"> | string | null
    uploadId?: StringNullableFilter<"UploadSession"> | string | null
    createdAt?: DateTimeFilter<"UploadSession"> | Date | string
    updatedAt?: DateTimeFilter<"UploadSession"> | Date | string
    completedAt?: DateTimeNullableFilter<"UploadSession"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UploadSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    fileSize?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    folderId?: SortOrderInput | SortOrder
    s3Key?: SortOrderInput | SortOrder
    filePath?: SortOrderInput | SortOrder
    status?: SortOrder
    progress?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    uploadId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: UploadSessionCountOrderByAggregateInput
    _avg?: UploadSessionAvgOrderByAggregateInput
    _max?: UploadSessionMaxOrderByAggregateInput
    _min?: UploadSessionMinOrderByAggregateInput
    _sum?: UploadSessionSumOrderByAggregateInput
  }

  export type UploadSessionScalarWhereWithAggregatesInput = {
    AND?: UploadSessionScalarWhereWithAggregatesInput | UploadSessionScalarWhereWithAggregatesInput[]
    OR?: UploadSessionScalarWhereWithAggregatesInput[]
    NOT?: UploadSessionScalarWhereWithAggregatesInput | UploadSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UploadSession"> | string
    userId?: StringWithAggregatesFilter<"UploadSession"> | string
    fileName?: StringWithAggregatesFilter<"UploadSession"> | string
    fileSize?: BigIntNullableWithAggregatesFilter<"UploadSession"> | bigint | number | null
    mimeType?: StringNullableWithAggregatesFilter<"UploadSession"> | string | null
    folderId?: StringNullableWithAggregatesFilter<"UploadSession"> | string | null
    s3Key?: StringNullableWithAggregatesFilter<"UploadSession"> | string | null
    filePath?: StringNullableWithAggregatesFilter<"UploadSession"> | string | null
    status?: EnumUploadStatusWithAggregatesFilter<"UploadSession"> | $Enums.UploadStatus
    progress?: FloatWithAggregatesFilter<"UploadSession"> | number
    errorMessage?: StringNullableWithAggregatesFilter<"UploadSession"> | string | null
    uploadId?: StringNullableWithAggregatesFilter<"UploadSession"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UploadSession"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UploadSession"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"UploadSession"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    hexId?: string | null
    role?: $Enums.UserRole
    profilePicture?: string | null
    profilePictureS3Key?: string | null
    storageQuota?: bigint | number
    storageUsed?: bigint | number
    planType?: $Enums.PlanType
    refreshToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    folders?: FolderCreateNestedManyWithoutUserInput
    files?: FileCreateNestedManyWithoutUserInput
    uploadSessions?: UploadSessionCreateNestedManyWithoutUserInput
    sharesCreated?: ShareCreateNestedManyWithoutSharedByInput
    sharesReceived?: ShareCreateNestedManyWithoutSharedWithInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    fileVersions?: FileVersionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    hexId?: string | null
    role?: $Enums.UserRole
    profilePicture?: string | null
    profilePictureS3Key?: string | null
    storageQuota?: bigint | number
    storageUsed?: bigint | number
    planType?: $Enums.PlanType
    refreshToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    folders?: FolderUncheckedCreateNestedManyWithoutUserInput
    files?: FileUncheckedCreateNestedManyWithoutUserInput
    uploadSessions?: UploadSessionUncheckedCreateNestedManyWithoutUserInput
    sharesCreated?: ShareUncheckedCreateNestedManyWithoutSharedByInput
    sharesReceived?: ShareUncheckedCreateNestedManyWithoutSharedWithInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    fileVersions?: FileVersionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hexId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    storageQuota?: BigIntFieldUpdateOperationsInput | bigint | number
    storageUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folders?: FolderUpdateManyWithoutUserNestedInput
    files?: FileUpdateManyWithoutUserNestedInput
    uploadSessions?: UploadSessionUpdateManyWithoutUserNestedInput
    sharesCreated?: ShareUpdateManyWithoutSharedByNestedInput
    sharesReceived?: ShareUpdateManyWithoutSharedWithNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    fileVersions?: FileVersionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hexId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    storageQuota?: BigIntFieldUpdateOperationsInput | bigint | number
    storageUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folders?: FolderUncheckedUpdateManyWithoutUserNestedInput
    files?: FileUncheckedUpdateManyWithoutUserNestedInput
    uploadSessions?: UploadSessionUncheckedUpdateManyWithoutUserNestedInput
    sharesCreated?: ShareUncheckedUpdateManyWithoutSharedByNestedInput
    sharesReceived?: ShareUncheckedUpdateManyWithoutSharedWithNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    fileVersions?: FileVersionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    hexId?: string | null
    role?: $Enums.UserRole
    profilePicture?: string | null
    profilePictureS3Key?: string | null
    storageQuota?: bigint | number
    storageUsed?: bigint | number
    planType?: $Enums.PlanType
    refreshToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hexId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    storageQuota?: BigIntFieldUpdateOperationsInput | bigint | number
    storageUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hexId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    storageQuota?: BigIntFieldUpdateOperationsInput | bigint | number
    storageUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FolderCreateInput = {
    id?: string
    name: string
    color?: string | null
    description?: string | null
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    user: UserCreateNestedOneWithoutFoldersInput
    parent?: FolderCreateNestedOneWithoutChildrenInput
    children?: FolderCreateNestedManyWithoutParentInput
    files?: FileCreateNestedManyWithoutFolderInput
    shares?: ShareCreateNestedManyWithoutFolderInput
  }

  export type FolderUncheckedCreateInput = {
    id?: string
    name: string
    parentId?: string | null
    userId: string
    color?: string | null
    description?: string | null
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    children?: FolderUncheckedCreateNestedManyWithoutParentInput
    files?: FileUncheckedCreateNestedManyWithoutFolderInput
    shares?: ShareUncheckedCreateNestedManyWithoutFolderInput
  }

  export type FolderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutFoldersNestedInput
    parent?: FolderUpdateOneWithoutChildrenNestedInput
    children?: FolderUpdateManyWithoutParentNestedInput
    files?: FileUpdateManyWithoutFolderNestedInput
    shares?: ShareUpdateManyWithoutFolderNestedInput
  }

  export type FolderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    children?: FolderUncheckedUpdateManyWithoutParentNestedInput
    files?: FileUncheckedUpdateManyWithoutFolderNestedInput
    shares?: ShareUncheckedUpdateManyWithoutFolderNestedInput
  }

  export type FolderCreateManyInput = {
    id?: string
    name: string
    parentId?: string | null
    userId: string
    color?: string | null
    description?: string | null
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
  }

  export type FolderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FolderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileCreateInput = {
    id?: string
    name: string
    originalName: string
    mimeType: string
    size: bigint | number
    filePath?: string | null
    s3Key?: string | null
    cloudFrontUrl?: string | null
    checksum?: string | null
    thumbnail?: string | null
    versionCount?: number
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    lastAccessedAt?: Date | string | null
    user: UserCreateNestedOneWithoutFilesInput
    folder?: FolderCreateNestedOneWithoutFilesInput
    shares?: ShareCreateNestedManyWithoutFileInput
    versions?: FileVersionCreateNestedManyWithoutFileInput
  }

  export type FileUncheckedCreateInput = {
    id?: string
    name: string
    originalName: string
    mimeType: string
    size: bigint | number
    filePath?: string | null
    s3Key?: string | null
    cloudFrontUrl?: string | null
    folderId?: string | null
    userId: string
    checksum?: string | null
    thumbnail?: string | null
    versionCount?: number
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    lastAccessedAt?: Date | string | null
    shares?: ShareUncheckedCreateNestedManyWithoutFileInput
    versions?: FileVersionUncheckedCreateNestedManyWithoutFileInput
  }

  export type FileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    cloudFrontUrl?: NullableStringFieldUpdateOperationsInput | string | null
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    versionCount?: IntFieldUpdateOperationsInput | number
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutFilesNestedInput
    folder?: FolderUpdateOneWithoutFilesNestedInput
    shares?: ShareUpdateManyWithoutFileNestedInput
    versions?: FileVersionUpdateManyWithoutFileNestedInput
  }

  export type FileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    cloudFrontUrl?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    versionCount?: IntFieldUpdateOperationsInput | number
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shares?: ShareUncheckedUpdateManyWithoutFileNestedInput
    versions?: FileVersionUncheckedUpdateManyWithoutFileNestedInput
  }

  export type FileCreateManyInput = {
    id?: string
    name: string
    originalName: string
    mimeType: string
    size: bigint | number
    filePath?: string | null
    s3Key?: string | null
    cloudFrontUrl?: string | null
    folderId?: string | null
    userId: string
    checksum?: string | null
    thumbnail?: string | null
    versionCount?: number
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    lastAccessedAt?: Date | string | null
  }

  export type FileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    cloudFrontUrl?: NullableStringFieldUpdateOperationsInput | string | null
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    versionCount?: IntFieldUpdateOperationsInput | number
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    cloudFrontUrl?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    versionCount?: IntFieldUpdateOperationsInput | number
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileVersionCreateInput = {
    id?: string
    versionNumber: number
    s3Key: string
    size: bigint | number
    isCurrent?: boolean
    label?: string | null
    createdAt?: Date | string
    file: FileCreateNestedOneWithoutVersionsInput
    createdBy: UserCreateNestedOneWithoutFileVersionsInput
  }

  export type FileVersionUncheckedCreateInput = {
    id?: string
    fileId: string
    versionNumber: number
    s3Key: string
    size: bigint | number
    createdById: string
    isCurrent?: boolean
    label?: string | null
    createdAt?: Date | string
  }

  export type FileVersionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    file?: FileUpdateOneRequiredWithoutVersionsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutFileVersionsNestedInput
  }

  export type FileVersionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    createdById?: StringFieldUpdateOperationsInput | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileVersionCreateManyInput = {
    id?: string
    fileId: string
    versionNumber: number
    s3Key: string
    size: bigint | number
    createdById: string
    isCurrent?: boolean
    label?: string | null
    createdAt?: Date | string
  }

  export type FileVersionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileVersionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    createdById?: StringFieldUpdateOperationsInput | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShareCreateInput = {
    id?: string
    sharedWithEmail?: string | null
    permissionLevel?: $Enums.PermissionLevel
    shareToken?: string
    isPublic?: boolean
    expiresAt?: Date | string | null
    isRevoked?: boolean
    accessCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    file?: FileCreateNestedOneWithoutSharesInput
    folder?: FolderCreateNestedOneWithoutSharesInput
    sharedBy: UserCreateNestedOneWithoutSharesCreatedInput
    sharedWith?: UserCreateNestedOneWithoutSharesReceivedInput
  }

  export type ShareUncheckedCreateInput = {
    id?: string
    fileId?: string | null
    folderId?: string | null
    sharedByUserId: string
    sharedWithUserId?: string | null
    sharedWithEmail?: string | null
    permissionLevel?: $Enums.PermissionLevel
    shareToken?: string
    isPublic?: boolean
    expiresAt?: Date | string | null
    isRevoked?: boolean
    accessCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShareUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedWithEmail?: NullableStringFieldUpdateOperationsInput | string | null
    permissionLevel?: EnumPermissionLevelFieldUpdateOperationsInput | $Enums.PermissionLevel
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    accessCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    file?: FileUpdateOneWithoutSharesNestedInput
    folder?: FolderUpdateOneWithoutSharesNestedInput
    sharedBy?: UserUpdateOneRequiredWithoutSharesCreatedNestedInput
    sharedWith?: UserUpdateOneWithoutSharesReceivedNestedInput
  }

  export type ShareUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    sharedByUserId?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: NullableStringFieldUpdateOperationsInput | string | null
    sharedWithEmail?: NullableStringFieldUpdateOperationsInput | string | null
    permissionLevel?: EnumPermissionLevelFieldUpdateOperationsInput | $Enums.PermissionLevel
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    accessCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShareCreateManyInput = {
    id?: string
    fileId?: string | null
    folderId?: string | null
    sharedByUserId: string
    sharedWithUserId?: string | null
    sharedWithEmail?: string | null
    permissionLevel?: $Enums.PermissionLevel
    shareToken?: string
    isPublic?: boolean
    expiresAt?: Date | string | null
    isRevoked?: boolean
    accessCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShareUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedWithEmail?: NullableStringFieldUpdateOperationsInput | string | null
    permissionLevel?: EnumPermissionLevelFieldUpdateOperationsInput | $Enums.PermissionLevel
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    accessCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShareUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    sharedByUserId?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: NullableStringFieldUpdateOperationsInput | string | null
    sharedWithEmail?: NullableStringFieldUpdateOperationsInput | string | null
    permissionLevel?: EnumPermissionLevelFieldUpdateOperationsInput | $Enums.PermissionLevel
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    accessCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    resourceType: string
    resourceId?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    userId: string
    action: string
    resourceType: string
    resourceId?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    userId: string
    action: string
    resourceType: string
    resourceId?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadSessionCreateInput = {
    id?: string
    fileName: string
    fileSize?: bigint | number | null
    mimeType?: string | null
    folderId?: string | null
    s3Key?: string | null
    filePath?: string | null
    status?: $Enums.UploadStatus
    progress?: number
    errorMessage?: string | null
    uploadId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
    user: UserCreateNestedOneWithoutUploadSessionsInput
  }

  export type UploadSessionUncheckedCreateInput = {
    id?: string
    userId: string
    fileName: string
    fileSize?: bigint | number | null
    mimeType?: string | null
    folderId?: string | null
    s3Key?: string | null
    filePath?: string | null
    status?: $Enums.UploadStatus
    progress?: number
    errorMessage?: string | null
    uploadId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type UploadSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    progress?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    uploadId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutUploadSessionsNestedInput
  }

  export type UploadSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    progress?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    uploadId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UploadSessionCreateManyInput = {
    id?: string
    userId: string
    fileName: string
    fileSize?: bigint | number | null
    mimeType?: string | null
    folderId?: string | null
    s3Key?: string | null
    filePath?: string | null
    status?: $Enums.UploadStatus
    progress?: number
    errorMessage?: string | null
    uploadId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type UploadSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    progress?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    uploadId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UploadSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    progress?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    uploadId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type EnumPlanTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeFilter<$PrismaModel> | $Enums.PlanType
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type FolderListRelationFilter = {
    every?: FolderWhereInput
    some?: FolderWhereInput
    none?: FolderWhereInput
  }

  export type FileListRelationFilter = {
    every?: FileWhereInput
    some?: FileWhereInput
    none?: FileWhereInput
  }

  export type UploadSessionListRelationFilter = {
    every?: UploadSessionWhereInput
    some?: UploadSessionWhereInput
    none?: UploadSessionWhereInput
  }

  export type ShareListRelationFilter = {
    every?: ShareWhereInput
    some?: ShareWhereInput
    none?: ShareWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type FileVersionListRelationFilter = {
    every?: FileVersionWhereInput
    some?: FileVersionWhereInput
    none?: FileVersionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FolderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FileOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UploadSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ShareOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FileVersionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    hexId?: SortOrder
    role?: SortOrder
    profilePicture?: SortOrder
    profilePictureS3Key?: SortOrder
    storageQuota?: SortOrder
    storageUsed?: SortOrder
    planType?: SortOrder
    refreshToken?: SortOrder
    passwordResetToken?: SortOrder
    passwordResetExpiry?: SortOrder
    isEmailVerified?: SortOrder
    mfaEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    storageQuota?: SortOrder
    storageUsed?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    hexId?: SortOrder
    role?: SortOrder
    profilePicture?: SortOrder
    profilePictureS3Key?: SortOrder
    storageQuota?: SortOrder
    storageUsed?: SortOrder
    planType?: SortOrder
    refreshToken?: SortOrder
    passwordResetToken?: SortOrder
    passwordResetExpiry?: SortOrder
    isEmailVerified?: SortOrder
    mfaEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    hexId?: SortOrder
    role?: SortOrder
    profilePicture?: SortOrder
    profilePictureS3Key?: SortOrder
    storageQuota?: SortOrder
    storageUsed?: SortOrder
    planType?: SortOrder
    refreshToken?: SortOrder
    passwordResetToken?: SortOrder
    passwordResetExpiry?: SortOrder
    isEmailVerified?: SortOrder
    mfaEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    storageQuota?: SortOrder
    storageUsed?: SortOrder
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

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type EnumPlanTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeWithAggregatesFilter<$PrismaModel> | $Enums.PlanType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanTypeFilter<$PrismaModel>
    _max?: NestedEnumPlanTypeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type FolderNullableScalarRelationFilter = {
    is?: FolderWhereInput | null
    isNot?: FolderWhereInput | null
  }

  export type FolderCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    userId?: SortOrder
    color?: SortOrder
    description?: SortOrder
    isStarred?: SortOrder
    isInTrash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trashedAt?: SortOrder
  }

  export type FolderMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    userId?: SortOrder
    color?: SortOrder
    description?: SortOrder
    isStarred?: SortOrder
    isInTrash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trashedAt?: SortOrder
  }

  export type FolderMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    userId?: SortOrder
    color?: SortOrder
    description?: SortOrder
    isStarred?: SortOrder
    isInTrash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trashedAt?: SortOrder
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

  export type FileCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    filePath?: SortOrder
    s3Key?: SortOrder
    cloudFrontUrl?: SortOrder
    folderId?: SortOrder
    userId?: SortOrder
    checksum?: SortOrder
    thumbnail?: SortOrder
    versionCount?: SortOrder
    isStarred?: SortOrder
    isInTrash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trashedAt?: SortOrder
    lastAccessedAt?: SortOrder
  }

  export type FileAvgOrderByAggregateInput = {
    size?: SortOrder
    versionCount?: SortOrder
  }

  export type FileMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    filePath?: SortOrder
    s3Key?: SortOrder
    cloudFrontUrl?: SortOrder
    folderId?: SortOrder
    userId?: SortOrder
    checksum?: SortOrder
    thumbnail?: SortOrder
    versionCount?: SortOrder
    isStarred?: SortOrder
    isInTrash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trashedAt?: SortOrder
    lastAccessedAt?: SortOrder
  }

  export type FileMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    originalName?: SortOrder
    mimeType?: SortOrder
    size?: SortOrder
    filePath?: SortOrder
    s3Key?: SortOrder
    cloudFrontUrl?: SortOrder
    folderId?: SortOrder
    userId?: SortOrder
    checksum?: SortOrder
    thumbnail?: SortOrder
    versionCount?: SortOrder
    isStarred?: SortOrder
    isInTrash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    trashedAt?: SortOrder
    lastAccessedAt?: SortOrder
  }

  export type FileSumOrderByAggregateInput = {
    size?: SortOrder
    versionCount?: SortOrder
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

  export type FileScalarRelationFilter = {
    is?: FileWhereInput
    isNot?: FileWhereInput
  }

  export type FileVersionCountOrderByAggregateInput = {
    id?: SortOrder
    fileId?: SortOrder
    versionNumber?: SortOrder
    s3Key?: SortOrder
    size?: SortOrder
    createdById?: SortOrder
    isCurrent?: SortOrder
    label?: SortOrder
    createdAt?: SortOrder
  }

  export type FileVersionAvgOrderByAggregateInput = {
    versionNumber?: SortOrder
    size?: SortOrder
  }

  export type FileVersionMaxOrderByAggregateInput = {
    id?: SortOrder
    fileId?: SortOrder
    versionNumber?: SortOrder
    s3Key?: SortOrder
    size?: SortOrder
    createdById?: SortOrder
    isCurrent?: SortOrder
    label?: SortOrder
    createdAt?: SortOrder
  }

  export type FileVersionMinOrderByAggregateInput = {
    id?: SortOrder
    fileId?: SortOrder
    versionNumber?: SortOrder
    s3Key?: SortOrder
    size?: SortOrder
    createdById?: SortOrder
    isCurrent?: SortOrder
    label?: SortOrder
    createdAt?: SortOrder
  }

  export type FileVersionSumOrderByAggregateInput = {
    versionNumber?: SortOrder
    size?: SortOrder
  }

  export type EnumPermissionLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.PermissionLevel | EnumPermissionLevelFieldRefInput<$PrismaModel>
    in?: $Enums.PermissionLevel[] | ListEnumPermissionLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.PermissionLevel[] | ListEnumPermissionLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumPermissionLevelFilter<$PrismaModel> | $Enums.PermissionLevel
  }

  export type FileNullableScalarRelationFilter = {
    is?: FileWhereInput | null
    isNot?: FileWhereInput | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ShareCountOrderByAggregateInput = {
    id?: SortOrder
    fileId?: SortOrder
    folderId?: SortOrder
    sharedByUserId?: SortOrder
    sharedWithUserId?: SortOrder
    sharedWithEmail?: SortOrder
    permissionLevel?: SortOrder
    shareToken?: SortOrder
    isPublic?: SortOrder
    expiresAt?: SortOrder
    isRevoked?: SortOrder
    accessCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShareAvgOrderByAggregateInput = {
    accessCount?: SortOrder
  }

  export type ShareMaxOrderByAggregateInput = {
    id?: SortOrder
    fileId?: SortOrder
    folderId?: SortOrder
    sharedByUserId?: SortOrder
    sharedWithUserId?: SortOrder
    sharedWithEmail?: SortOrder
    permissionLevel?: SortOrder
    shareToken?: SortOrder
    isPublic?: SortOrder
    expiresAt?: SortOrder
    isRevoked?: SortOrder
    accessCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShareMinOrderByAggregateInput = {
    id?: SortOrder
    fileId?: SortOrder
    folderId?: SortOrder
    sharedByUserId?: SortOrder
    sharedWithUserId?: SortOrder
    sharedWithEmail?: SortOrder
    permissionLevel?: SortOrder
    shareToken?: SortOrder
    isPublic?: SortOrder
    expiresAt?: SortOrder
    isRevoked?: SortOrder
    accessCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ShareSumOrderByAggregateInput = {
    accessCount?: SortOrder
  }

  export type EnumPermissionLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PermissionLevel | EnumPermissionLevelFieldRefInput<$PrismaModel>
    in?: $Enums.PermissionLevel[] | ListEnumPermissionLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.PermissionLevel[] | ListEnumPermissionLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumPermissionLevelWithAggregatesFilter<$PrismaModel> | $Enums.PermissionLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPermissionLevelFilter<$PrismaModel>
    _max?: NestedEnumPermissionLevelFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    metadata?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type EnumUploadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadStatus | EnumUploadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadStatus[] | ListEnumUploadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadStatus[] | ListEnumUploadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadStatusFilter<$PrismaModel> | $Enums.UploadStatus
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type UploadSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    folderId?: SortOrder
    s3Key?: SortOrder
    filePath?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    errorMessage?: SortOrder
    uploadId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type UploadSessionAvgOrderByAggregateInput = {
    fileSize?: SortOrder
    progress?: SortOrder
  }

  export type UploadSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    folderId?: SortOrder
    s3Key?: SortOrder
    filePath?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    errorMessage?: SortOrder
    uploadId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type UploadSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    fileName?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    folderId?: SortOrder
    s3Key?: SortOrder
    filePath?: SortOrder
    status?: SortOrder
    progress?: SortOrder
    errorMessage?: SortOrder
    uploadId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type UploadSessionSumOrderByAggregateInput = {
    fileSize?: SortOrder
    progress?: SortOrder
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type EnumUploadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadStatus | EnumUploadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadStatus[] | ListEnumUploadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadStatus[] | ListEnumUploadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadStatusWithAggregatesFilter<$PrismaModel> | $Enums.UploadStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUploadStatusFilter<$PrismaModel>
    _max?: NestedEnumUploadStatusFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FolderCreateNestedManyWithoutUserInput = {
    create?: XOR<FolderCreateWithoutUserInput, FolderUncheckedCreateWithoutUserInput> | FolderCreateWithoutUserInput[] | FolderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FolderCreateOrConnectWithoutUserInput | FolderCreateOrConnectWithoutUserInput[]
    createMany?: FolderCreateManyUserInputEnvelope
    connect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
  }

  export type FileCreateNestedManyWithoutUserInput = {
    create?: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput> | FileCreateWithoutUserInput[] | FileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUserInput | FileCreateOrConnectWithoutUserInput[]
    createMany?: FileCreateManyUserInputEnvelope
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
  }

  export type UploadSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<UploadSessionCreateWithoutUserInput, UploadSessionUncheckedCreateWithoutUserInput> | UploadSessionCreateWithoutUserInput[] | UploadSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UploadSessionCreateOrConnectWithoutUserInput | UploadSessionCreateOrConnectWithoutUserInput[]
    createMany?: UploadSessionCreateManyUserInputEnvelope
    connect?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
  }

  export type ShareCreateNestedManyWithoutSharedByInput = {
    create?: XOR<ShareCreateWithoutSharedByInput, ShareUncheckedCreateWithoutSharedByInput> | ShareCreateWithoutSharedByInput[] | ShareUncheckedCreateWithoutSharedByInput[]
    connectOrCreate?: ShareCreateOrConnectWithoutSharedByInput | ShareCreateOrConnectWithoutSharedByInput[]
    createMany?: ShareCreateManySharedByInputEnvelope
    connect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
  }

  export type ShareCreateNestedManyWithoutSharedWithInput = {
    create?: XOR<ShareCreateWithoutSharedWithInput, ShareUncheckedCreateWithoutSharedWithInput> | ShareCreateWithoutSharedWithInput[] | ShareUncheckedCreateWithoutSharedWithInput[]
    connectOrCreate?: ShareCreateOrConnectWithoutSharedWithInput | ShareCreateOrConnectWithoutSharedWithInput[]
    createMany?: ShareCreateManySharedWithInputEnvelope
    connect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type FileVersionCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<FileVersionCreateWithoutCreatedByInput, FileVersionUncheckedCreateWithoutCreatedByInput> | FileVersionCreateWithoutCreatedByInput[] | FileVersionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: FileVersionCreateOrConnectWithoutCreatedByInput | FileVersionCreateOrConnectWithoutCreatedByInput[]
    createMany?: FileVersionCreateManyCreatedByInputEnvelope
    connect?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
  }

  export type FolderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FolderCreateWithoutUserInput, FolderUncheckedCreateWithoutUserInput> | FolderCreateWithoutUserInput[] | FolderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FolderCreateOrConnectWithoutUserInput | FolderCreateOrConnectWithoutUserInput[]
    createMany?: FolderCreateManyUserInputEnvelope
    connect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
  }

  export type FileUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput> | FileCreateWithoutUserInput[] | FileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUserInput | FileCreateOrConnectWithoutUserInput[]
    createMany?: FileCreateManyUserInputEnvelope
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
  }

  export type UploadSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UploadSessionCreateWithoutUserInput, UploadSessionUncheckedCreateWithoutUserInput> | UploadSessionCreateWithoutUserInput[] | UploadSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UploadSessionCreateOrConnectWithoutUserInput | UploadSessionCreateOrConnectWithoutUserInput[]
    createMany?: UploadSessionCreateManyUserInputEnvelope
    connect?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
  }

  export type ShareUncheckedCreateNestedManyWithoutSharedByInput = {
    create?: XOR<ShareCreateWithoutSharedByInput, ShareUncheckedCreateWithoutSharedByInput> | ShareCreateWithoutSharedByInput[] | ShareUncheckedCreateWithoutSharedByInput[]
    connectOrCreate?: ShareCreateOrConnectWithoutSharedByInput | ShareCreateOrConnectWithoutSharedByInput[]
    createMany?: ShareCreateManySharedByInputEnvelope
    connect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
  }

  export type ShareUncheckedCreateNestedManyWithoutSharedWithInput = {
    create?: XOR<ShareCreateWithoutSharedWithInput, ShareUncheckedCreateWithoutSharedWithInput> | ShareCreateWithoutSharedWithInput[] | ShareUncheckedCreateWithoutSharedWithInput[]
    connectOrCreate?: ShareCreateOrConnectWithoutSharedWithInput | ShareCreateOrConnectWithoutSharedWithInput[]
    createMany?: ShareCreateManySharedWithInputEnvelope
    connect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type FileVersionUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<FileVersionCreateWithoutCreatedByInput, FileVersionUncheckedCreateWithoutCreatedByInput> | FileVersionCreateWithoutCreatedByInput[] | FileVersionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: FileVersionCreateOrConnectWithoutCreatedByInput | FileVersionCreateOrConnectWithoutCreatedByInput[]
    createMany?: FileVersionCreateManyCreatedByInputEnvelope
    connect?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumPlanTypeFieldUpdateOperationsInput = {
    set?: $Enums.PlanType
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FolderUpdateManyWithoutUserNestedInput = {
    create?: XOR<FolderCreateWithoutUserInput, FolderUncheckedCreateWithoutUserInput> | FolderCreateWithoutUserInput[] | FolderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FolderCreateOrConnectWithoutUserInput | FolderCreateOrConnectWithoutUserInput[]
    upsert?: FolderUpsertWithWhereUniqueWithoutUserInput | FolderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FolderCreateManyUserInputEnvelope
    set?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    disconnect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    delete?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    connect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    update?: FolderUpdateWithWhereUniqueWithoutUserInput | FolderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FolderUpdateManyWithWhereWithoutUserInput | FolderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FolderScalarWhereInput | FolderScalarWhereInput[]
  }

  export type FileUpdateManyWithoutUserNestedInput = {
    create?: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput> | FileCreateWithoutUserInput[] | FileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUserInput | FileCreateOrConnectWithoutUserInput[]
    upsert?: FileUpsertWithWhereUniqueWithoutUserInput | FileUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FileCreateManyUserInputEnvelope
    set?: FileWhereUniqueInput | FileWhereUniqueInput[]
    disconnect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    delete?: FileWhereUniqueInput | FileWhereUniqueInput[]
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    update?: FileUpdateWithWhereUniqueWithoutUserInput | FileUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FileUpdateManyWithWhereWithoutUserInput | FileUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FileScalarWhereInput | FileScalarWhereInput[]
  }

  export type UploadSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<UploadSessionCreateWithoutUserInput, UploadSessionUncheckedCreateWithoutUserInput> | UploadSessionCreateWithoutUserInput[] | UploadSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UploadSessionCreateOrConnectWithoutUserInput | UploadSessionCreateOrConnectWithoutUserInput[]
    upsert?: UploadSessionUpsertWithWhereUniqueWithoutUserInput | UploadSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UploadSessionCreateManyUserInputEnvelope
    set?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
    disconnect?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
    delete?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
    connect?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
    update?: UploadSessionUpdateWithWhereUniqueWithoutUserInput | UploadSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UploadSessionUpdateManyWithWhereWithoutUserInput | UploadSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UploadSessionScalarWhereInput | UploadSessionScalarWhereInput[]
  }

  export type ShareUpdateManyWithoutSharedByNestedInput = {
    create?: XOR<ShareCreateWithoutSharedByInput, ShareUncheckedCreateWithoutSharedByInput> | ShareCreateWithoutSharedByInput[] | ShareUncheckedCreateWithoutSharedByInput[]
    connectOrCreate?: ShareCreateOrConnectWithoutSharedByInput | ShareCreateOrConnectWithoutSharedByInput[]
    upsert?: ShareUpsertWithWhereUniqueWithoutSharedByInput | ShareUpsertWithWhereUniqueWithoutSharedByInput[]
    createMany?: ShareCreateManySharedByInputEnvelope
    set?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    disconnect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    delete?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    connect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    update?: ShareUpdateWithWhereUniqueWithoutSharedByInput | ShareUpdateWithWhereUniqueWithoutSharedByInput[]
    updateMany?: ShareUpdateManyWithWhereWithoutSharedByInput | ShareUpdateManyWithWhereWithoutSharedByInput[]
    deleteMany?: ShareScalarWhereInput | ShareScalarWhereInput[]
  }

  export type ShareUpdateManyWithoutSharedWithNestedInput = {
    create?: XOR<ShareCreateWithoutSharedWithInput, ShareUncheckedCreateWithoutSharedWithInput> | ShareCreateWithoutSharedWithInput[] | ShareUncheckedCreateWithoutSharedWithInput[]
    connectOrCreate?: ShareCreateOrConnectWithoutSharedWithInput | ShareCreateOrConnectWithoutSharedWithInput[]
    upsert?: ShareUpsertWithWhereUniqueWithoutSharedWithInput | ShareUpsertWithWhereUniqueWithoutSharedWithInput[]
    createMany?: ShareCreateManySharedWithInputEnvelope
    set?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    disconnect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    delete?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    connect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    update?: ShareUpdateWithWhereUniqueWithoutSharedWithInput | ShareUpdateWithWhereUniqueWithoutSharedWithInput[]
    updateMany?: ShareUpdateManyWithWhereWithoutSharedWithInput | ShareUpdateManyWithWhereWithoutSharedWithInput[]
    deleteMany?: ShareScalarWhereInput | ShareScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type FileVersionUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<FileVersionCreateWithoutCreatedByInput, FileVersionUncheckedCreateWithoutCreatedByInput> | FileVersionCreateWithoutCreatedByInput[] | FileVersionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: FileVersionCreateOrConnectWithoutCreatedByInput | FileVersionCreateOrConnectWithoutCreatedByInput[]
    upsert?: FileVersionUpsertWithWhereUniqueWithoutCreatedByInput | FileVersionUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: FileVersionCreateManyCreatedByInputEnvelope
    set?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
    disconnect?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
    delete?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
    connect?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
    update?: FileVersionUpdateWithWhereUniqueWithoutCreatedByInput | FileVersionUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: FileVersionUpdateManyWithWhereWithoutCreatedByInput | FileVersionUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: FileVersionScalarWhereInput | FileVersionScalarWhereInput[]
  }

  export type FolderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FolderCreateWithoutUserInput, FolderUncheckedCreateWithoutUserInput> | FolderCreateWithoutUserInput[] | FolderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FolderCreateOrConnectWithoutUserInput | FolderCreateOrConnectWithoutUserInput[]
    upsert?: FolderUpsertWithWhereUniqueWithoutUserInput | FolderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FolderCreateManyUserInputEnvelope
    set?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    disconnect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    delete?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    connect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    update?: FolderUpdateWithWhereUniqueWithoutUserInput | FolderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FolderUpdateManyWithWhereWithoutUserInput | FolderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FolderScalarWhereInput | FolderScalarWhereInput[]
  }

  export type FileUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput> | FileCreateWithoutUserInput[] | FileUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FileCreateOrConnectWithoutUserInput | FileCreateOrConnectWithoutUserInput[]
    upsert?: FileUpsertWithWhereUniqueWithoutUserInput | FileUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FileCreateManyUserInputEnvelope
    set?: FileWhereUniqueInput | FileWhereUniqueInput[]
    disconnect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    delete?: FileWhereUniqueInput | FileWhereUniqueInput[]
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    update?: FileUpdateWithWhereUniqueWithoutUserInput | FileUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FileUpdateManyWithWhereWithoutUserInput | FileUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FileScalarWhereInput | FileScalarWhereInput[]
  }

  export type UploadSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UploadSessionCreateWithoutUserInput, UploadSessionUncheckedCreateWithoutUserInput> | UploadSessionCreateWithoutUserInput[] | UploadSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UploadSessionCreateOrConnectWithoutUserInput | UploadSessionCreateOrConnectWithoutUserInput[]
    upsert?: UploadSessionUpsertWithWhereUniqueWithoutUserInput | UploadSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UploadSessionCreateManyUserInputEnvelope
    set?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
    disconnect?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
    delete?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
    connect?: UploadSessionWhereUniqueInput | UploadSessionWhereUniqueInput[]
    update?: UploadSessionUpdateWithWhereUniqueWithoutUserInput | UploadSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UploadSessionUpdateManyWithWhereWithoutUserInput | UploadSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UploadSessionScalarWhereInput | UploadSessionScalarWhereInput[]
  }

  export type ShareUncheckedUpdateManyWithoutSharedByNestedInput = {
    create?: XOR<ShareCreateWithoutSharedByInput, ShareUncheckedCreateWithoutSharedByInput> | ShareCreateWithoutSharedByInput[] | ShareUncheckedCreateWithoutSharedByInput[]
    connectOrCreate?: ShareCreateOrConnectWithoutSharedByInput | ShareCreateOrConnectWithoutSharedByInput[]
    upsert?: ShareUpsertWithWhereUniqueWithoutSharedByInput | ShareUpsertWithWhereUniqueWithoutSharedByInput[]
    createMany?: ShareCreateManySharedByInputEnvelope
    set?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    disconnect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    delete?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    connect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    update?: ShareUpdateWithWhereUniqueWithoutSharedByInput | ShareUpdateWithWhereUniqueWithoutSharedByInput[]
    updateMany?: ShareUpdateManyWithWhereWithoutSharedByInput | ShareUpdateManyWithWhereWithoutSharedByInput[]
    deleteMany?: ShareScalarWhereInput | ShareScalarWhereInput[]
  }

  export type ShareUncheckedUpdateManyWithoutSharedWithNestedInput = {
    create?: XOR<ShareCreateWithoutSharedWithInput, ShareUncheckedCreateWithoutSharedWithInput> | ShareCreateWithoutSharedWithInput[] | ShareUncheckedCreateWithoutSharedWithInput[]
    connectOrCreate?: ShareCreateOrConnectWithoutSharedWithInput | ShareCreateOrConnectWithoutSharedWithInput[]
    upsert?: ShareUpsertWithWhereUniqueWithoutSharedWithInput | ShareUpsertWithWhereUniqueWithoutSharedWithInput[]
    createMany?: ShareCreateManySharedWithInputEnvelope
    set?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    disconnect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    delete?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    connect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    update?: ShareUpdateWithWhereUniqueWithoutSharedWithInput | ShareUpdateWithWhereUniqueWithoutSharedWithInput[]
    updateMany?: ShareUpdateManyWithWhereWithoutSharedWithInput | ShareUpdateManyWithWhereWithoutSharedWithInput[]
    deleteMany?: ShareScalarWhereInput | ShareScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type FileVersionUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<FileVersionCreateWithoutCreatedByInput, FileVersionUncheckedCreateWithoutCreatedByInput> | FileVersionCreateWithoutCreatedByInput[] | FileVersionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: FileVersionCreateOrConnectWithoutCreatedByInput | FileVersionCreateOrConnectWithoutCreatedByInput[]
    upsert?: FileVersionUpsertWithWhereUniqueWithoutCreatedByInput | FileVersionUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: FileVersionCreateManyCreatedByInputEnvelope
    set?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
    disconnect?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
    delete?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
    connect?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
    update?: FileVersionUpdateWithWhereUniqueWithoutCreatedByInput | FileVersionUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: FileVersionUpdateManyWithWhereWithoutCreatedByInput | FileVersionUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: FileVersionScalarWhereInput | FileVersionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutFoldersInput = {
    create?: XOR<UserCreateWithoutFoldersInput, UserUncheckedCreateWithoutFoldersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFoldersInput
    connect?: UserWhereUniqueInput
  }

  export type FolderCreateNestedOneWithoutChildrenInput = {
    create?: XOR<FolderCreateWithoutChildrenInput, FolderUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: FolderCreateOrConnectWithoutChildrenInput
    connect?: FolderWhereUniqueInput
  }

  export type FolderCreateNestedManyWithoutParentInput = {
    create?: XOR<FolderCreateWithoutParentInput, FolderUncheckedCreateWithoutParentInput> | FolderCreateWithoutParentInput[] | FolderUncheckedCreateWithoutParentInput[]
    connectOrCreate?: FolderCreateOrConnectWithoutParentInput | FolderCreateOrConnectWithoutParentInput[]
    createMany?: FolderCreateManyParentInputEnvelope
    connect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
  }

  export type FileCreateNestedManyWithoutFolderInput = {
    create?: XOR<FileCreateWithoutFolderInput, FileUncheckedCreateWithoutFolderInput> | FileCreateWithoutFolderInput[] | FileUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: FileCreateOrConnectWithoutFolderInput | FileCreateOrConnectWithoutFolderInput[]
    createMany?: FileCreateManyFolderInputEnvelope
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
  }

  export type ShareCreateNestedManyWithoutFolderInput = {
    create?: XOR<ShareCreateWithoutFolderInput, ShareUncheckedCreateWithoutFolderInput> | ShareCreateWithoutFolderInput[] | ShareUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: ShareCreateOrConnectWithoutFolderInput | ShareCreateOrConnectWithoutFolderInput[]
    createMany?: ShareCreateManyFolderInputEnvelope
    connect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
  }

  export type FolderUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<FolderCreateWithoutParentInput, FolderUncheckedCreateWithoutParentInput> | FolderCreateWithoutParentInput[] | FolderUncheckedCreateWithoutParentInput[]
    connectOrCreate?: FolderCreateOrConnectWithoutParentInput | FolderCreateOrConnectWithoutParentInput[]
    createMany?: FolderCreateManyParentInputEnvelope
    connect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
  }

  export type FileUncheckedCreateNestedManyWithoutFolderInput = {
    create?: XOR<FileCreateWithoutFolderInput, FileUncheckedCreateWithoutFolderInput> | FileCreateWithoutFolderInput[] | FileUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: FileCreateOrConnectWithoutFolderInput | FileCreateOrConnectWithoutFolderInput[]
    createMany?: FileCreateManyFolderInputEnvelope
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
  }

  export type ShareUncheckedCreateNestedManyWithoutFolderInput = {
    create?: XOR<ShareCreateWithoutFolderInput, ShareUncheckedCreateWithoutFolderInput> | ShareCreateWithoutFolderInput[] | ShareUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: ShareCreateOrConnectWithoutFolderInput | ShareCreateOrConnectWithoutFolderInput[]
    createMany?: ShareCreateManyFolderInputEnvelope
    connect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutFoldersNestedInput = {
    create?: XOR<UserCreateWithoutFoldersInput, UserUncheckedCreateWithoutFoldersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFoldersInput
    upsert?: UserUpsertWithoutFoldersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFoldersInput, UserUpdateWithoutFoldersInput>, UserUncheckedUpdateWithoutFoldersInput>
  }

  export type FolderUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<FolderCreateWithoutChildrenInput, FolderUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: FolderCreateOrConnectWithoutChildrenInput
    upsert?: FolderUpsertWithoutChildrenInput
    disconnect?: FolderWhereInput | boolean
    delete?: FolderWhereInput | boolean
    connect?: FolderWhereUniqueInput
    update?: XOR<XOR<FolderUpdateToOneWithWhereWithoutChildrenInput, FolderUpdateWithoutChildrenInput>, FolderUncheckedUpdateWithoutChildrenInput>
  }

  export type FolderUpdateManyWithoutParentNestedInput = {
    create?: XOR<FolderCreateWithoutParentInput, FolderUncheckedCreateWithoutParentInput> | FolderCreateWithoutParentInput[] | FolderUncheckedCreateWithoutParentInput[]
    connectOrCreate?: FolderCreateOrConnectWithoutParentInput | FolderCreateOrConnectWithoutParentInput[]
    upsert?: FolderUpsertWithWhereUniqueWithoutParentInput | FolderUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: FolderCreateManyParentInputEnvelope
    set?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    disconnect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    delete?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    connect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    update?: FolderUpdateWithWhereUniqueWithoutParentInput | FolderUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: FolderUpdateManyWithWhereWithoutParentInput | FolderUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: FolderScalarWhereInput | FolderScalarWhereInput[]
  }

  export type FileUpdateManyWithoutFolderNestedInput = {
    create?: XOR<FileCreateWithoutFolderInput, FileUncheckedCreateWithoutFolderInput> | FileCreateWithoutFolderInput[] | FileUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: FileCreateOrConnectWithoutFolderInput | FileCreateOrConnectWithoutFolderInput[]
    upsert?: FileUpsertWithWhereUniqueWithoutFolderInput | FileUpsertWithWhereUniqueWithoutFolderInput[]
    createMany?: FileCreateManyFolderInputEnvelope
    set?: FileWhereUniqueInput | FileWhereUniqueInput[]
    disconnect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    delete?: FileWhereUniqueInput | FileWhereUniqueInput[]
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    update?: FileUpdateWithWhereUniqueWithoutFolderInput | FileUpdateWithWhereUniqueWithoutFolderInput[]
    updateMany?: FileUpdateManyWithWhereWithoutFolderInput | FileUpdateManyWithWhereWithoutFolderInput[]
    deleteMany?: FileScalarWhereInput | FileScalarWhereInput[]
  }

  export type ShareUpdateManyWithoutFolderNestedInput = {
    create?: XOR<ShareCreateWithoutFolderInput, ShareUncheckedCreateWithoutFolderInput> | ShareCreateWithoutFolderInput[] | ShareUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: ShareCreateOrConnectWithoutFolderInput | ShareCreateOrConnectWithoutFolderInput[]
    upsert?: ShareUpsertWithWhereUniqueWithoutFolderInput | ShareUpsertWithWhereUniqueWithoutFolderInput[]
    createMany?: ShareCreateManyFolderInputEnvelope
    set?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    disconnect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    delete?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    connect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    update?: ShareUpdateWithWhereUniqueWithoutFolderInput | ShareUpdateWithWhereUniqueWithoutFolderInput[]
    updateMany?: ShareUpdateManyWithWhereWithoutFolderInput | ShareUpdateManyWithWhereWithoutFolderInput[]
    deleteMany?: ShareScalarWhereInput | ShareScalarWhereInput[]
  }

  export type FolderUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<FolderCreateWithoutParentInput, FolderUncheckedCreateWithoutParentInput> | FolderCreateWithoutParentInput[] | FolderUncheckedCreateWithoutParentInput[]
    connectOrCreate?: FolderCreateOrConnectWithoutParentInput | FolderCreateOrConnectWithoutParentInput[]
    upsert?: FolderUpsertWithWhereUniqueWithoutParentInput | FolderUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: FolderCreateManyParentInputEnvelope
    set?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    disconnect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    delete?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    connect?: FolderWhereUniqueInput | FolderWhereUniqueInput[]
    update?: FolderUpdateWithWhereUniqueWithoutParentInput | FolderUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: FolderUpdateManyWithWhereWithoutParentInput | FolderUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: FolderScalarWhereInput | FolderScalarWhereInput[]
  }

  export type FileUncheckedUpdateManyWithoutFolderNestedInput = {
    create?: XOR<FileCreateWithoutFolderInput, FileUncheckedCreateWithoutFolderInput> | FileCreateWithoutFolderInput[] | FileUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: FileCreateOrConnectWithoutFolderInput | FileCreateOrConnectWithoutFolderInput[]
    upsert?: FileUpsertWithWhereUniqueWithoutFolderInput | FileUpsertWithWhereUniqueWithoutFolderInput[]
    createMany?: FileCreateManyFolderInputEnvelope
    set?: FileWhereUniqueInput | FileWhereUniqueInput[]
    disconnect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    delete?: FileWhereUniqueInput | FileWhereUniqueInput[]
    connect?: FileWhereUniqueInput | FileWhereUniqueInput[]
    update?: FileUpdateWithWhereUniqueWithoutFolderInput | FileUpdateWithWhereUniqueWithoutFolderInput[]
    updateMany?: FileUpdateManyWithWhereWithoutFolderInput | FileUpdateManyWithWhereWithoutFolderInput[]
    deleteMany?: FileScalarWhereInput | FileScalarWhereInput[]
  }

  export type ShareUncheckedUpdateManyWithoutFolderNestedInput = {
    create?: XOR<ShareCreateWithoutFolderInput, ShareUncheckedCreateWithoutFolderInput> | ShareCreateWithoutFolderInput[] | ShareUncheckedCreateWithoutFolderInput[]
    connectOrCreate?: ShareCreateOrConnectWithoutFolderInput | ShareCreateOrConnectWithoutFolderInput[]
    upsert?: ShareUpsertWithWhereUniqueWithoutFolderInput | ShareUpsertWithWhereUniqueWithoutFolderInput[]
    createMany?: ShareCreateManyFolderInputEnvelope
    set?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    disconnect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    delete?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    connect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    update?: ShareUpdateWithWhereUniqueWithoutFolderInput | ShareUpdateWithWhereUniqueWithoutFolderInput[]
    updateMany?: ShareUpdateManyWithWhereWithoutFolderInput | ShareUpdateManyWithWhereWithoutFolderInput[]
    deleteMany?: ShareScalarWhereInput | ShareScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutFilesInput = {
    create?: XOR<UserCreateWithoutFilesInput, UserUncheckedCreateWithoutFilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFilesInput
    connect?: UserWhereUniqueInput
  }

  export type FolderCreateNestedOneWithoutFilesInput = {
    create?: XOR<FolderCreateWithoutFilesInput, FolderUncheckedCreateWithoutFilesInput>
    connectOrCreate?: FolderCreateOrConnectWithoutFilesInput
    connect?: FolderWhereUniqueInput
  }

  export type ShareCreateNestedManyWithoutFileInput = {
    create?: XOR<ShareCreateWithoutFileInput, ShareUncheckedCreateWithoutFileInput> | ShareCreateWithoutFileInput[] | ShareUncheckedCreateWithoutFileInput[]
    connectOrCreate?: ShareCreateOrConnectWithoutFileInput | ShareCreateOrConnectWithoutFileInput[]
    createMany?: ShareCreateManyFileInputEnvelope
    connect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
  }

  export type FileVersionCreateNestedManyWithoutFileInput = {
    create?: XOR<FileVersionCreateWithoutFileInput, FileVersionUncheckedCreateWithoutFileInput> | FileVersionCreateWithoutFileInput[] | FileVersionUncheckedCreateWithoutFileInput[]
    connectOrCreate?: FileVersionCreateOrConnectWithoutFileInput | FileVersionCreateOrConnectWithoutFileInput[]
    createMany?: FileVersionCreateManyFileInputEnvelope
    connect?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
  }

  export type ShareUncheckedCreateNestedManyWithoutFileInput = {
    create?: XOR<ShareCreateWithoutFileInput, ShareUncheckedCreateWithoutFileInput> | ShareCreateWithoutFileInput[] | ShareUncheckedCreateWithoutFileInput[]
    connectOrCreate?: ShareCreateOrConnectWithoutFileInput | ShareCreateOrConnectWithoutFileInput[]
    createMany?: ShareCreateManyFileInputEnvelope
    connect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
  }

  export type FileVersionUncheckedCreateNestedManyWithoutFileInput = {
    create?: XOR<FileVersionCreateWithoutFileInput, FileVersionUncheckedCreateWithoutFileInput> | FileVersionCreateWithoutFileInput[] | FileVersionUncheckedCreateWithoutFileInput[]
    connectOrCreate?: FileVersionCreateOrConnectWithoutFileInput | FileVersionCreateOrConnectWithoutFileInput[]
    createMany?: FileVersionCreateManyFileInputEnvelope
    connect?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutFilesNestedInput = {
    create?: XOR<UserCreateWithoutFilesInput, UserUncheckedCreateWithoutFilesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFilesInput
    upsert?: UserUpsertWithoutFilesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFilesInput, UserUpdateWithoutFilesInput>, UserUncheckedUpdateWithoutFilesInput>
  }

  export type FolderUpdateOneWithoutFilesNestedInput = {
    create?: XOR<FolderCreateWithoutFilesInput, FolderUncheckedCreateWithoutFilesInput>
    connectOrCreate?: FolderCreateOrConnectWithoutFilesInput
    upsert?: FolderUpsertWithoutFilesInput
    disconnect?: FolderWhereInput | boolean
    delete?: FolderWhereInput | boolean
    connect?: FolderWhereUniqueInput
    update?: XOR<XOR<FolderUpdateToOneWithWhereWithoutFilesInput, FolderUpdateWithoutFilesInput>, FolderUncheckedUpdateWithoutFilesInput>
  }

  export type ShareUpdateManyWithoutFileNestedInput = {
    create?: XOR<ShareCreateWithoutFileInput, ShareUncheckedCreateWithoutFileInput> | ShareCreateWithoutFileInput[] | ShareUncheckedCreateWithoutFileInput[]
    connectOrCreate?: ShareCreateOrConnectWithoutFileInput | ShareCreateOrConnectWithoutFileInput[]
    upsert?: ShareUpsertWithWhereUniqueWithoutFileInput | ShareUpsertWithWhereUniqueWithoutFileInput[]
    createMany?: ShareCreateManyFileInputEnvelope
    set?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    disconnect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    delete?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    connect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    update?: ShareUpdateWithWhereUniqueWithoutFileInput | ShareUpdateWithWhereUniqueWithoutFileInput[]
    updateMany?: ShareUpdateManyWithWhereWithoutFileInput | ShareUpdateManyWithWhereWithoutFileInput[]
    deleteMany?: ShareScalarWhereInput | ShareScalarWhereInput[]
  }

  export type FileVersionUpdateManyWithoutFileNestedInput = {
    create?: XOR<FileVersionCreateWithoutFileInput, FileVersionUncheckedCreateWithoutFileInput> | FileVersionCreateWithoutFileInput[] | FileVersionUncheckedCreateWithoutFileInput[]
    connectOrCreate?: FileVersionCreateOrConnectWithoutFileInput | FileVersionCreateOrConnectWithoutFileInput[]
    upsert?: FileVersionUpsertWithWhereUniqueWithoutFileInput | FileVersionUpsertWithWhereUniqueWithoutFileInput[]
    createMany?: FileVersionCreateManyFileInputEnvelope
    set?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
    disconnect?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
    delete?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
    connect?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
    update?: FileVersionUpdateWithWhereUniqueWithoutFileInput | FileVersionUpdateWithWhereUniqueWithoutFileInput[]
    updateMany?: FileVersionUpdateManyWithWhereWithoutFileInput | FileVersionUpdateManyWithWhereWithoutFileInput[]
    deleteMany?: FileVersionScalarWhereInput | FileVersionScalarWhereInput[]
  }

  export type ShareUncheckedUpdateManyWithoutFileNestedInput = {
    create?: XOR<ShareCreateWithoutFileInput, ShareUncheckedCreateWithoutFileInput> | ShareCreateWithoutFileInput[] | ShareUncheckedCreateWithoutFileInput[]
    connectOrCreate?: ShareCreateOrConnectWithoutFileInput | ShareCreateOrConnectWithoutFileInput[]
    upsert?: ShareUpsertWithWhereUniqueWithoutFileInput | ShareUpsertWithWhereUniqueWithoutFileInput[]
    createMany?: ShareCreateManyFileInputEnvelope
    set?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    disconnect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    delete?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    connect?: ShareWhereUniqueInput | ShareWhereUniqueInput[]
    update?: ShareUpdateWithWhereUniqueWithoutFileInput | ShareUpdateWithWhereUniqueWithoutFileInput[]
    updateMany?: ShareUpdateManyWithWhereWithoutFileInput | ShareUpdateManyWithWhereWithoutFileInput[]
    deleteMany?: ShareScalarWhereInput | ShareScalarWhereInput[]
  }

  export type FileVersionUncheckedUpdateManyWithoutFileNestedInput = {
    create?: XOR<FileVersionCreateWithoutFileInput, FileVersionUncheckedCreateWithoutFileInput> | FileVersionCreateWithoutFileInput[] | FileVersionUncheckedCreateWithoutFileInput[]
    connectOrCreate?: FileVersionCreateOrConnectWithoutFileInput | FileVersionCreateOrConnectWithoutFileInput[]
    upsert?: FileVersionUpsertWithWhereUniqueWithoutFileInput | FileVersionUpsertWithWhereUniqueWithoutFileInput[]
    createMany?: FileVersionCreateManyFileInputEnvelope
    set?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
    disconnect?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
    delete?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
    connect?: FileVersionWhereUniqueInput | FileVersionWhereUniqueInput[]
    update?: FileVersionUpdateWithWhereUniqueWithoutFileInput | FileVersionUpdateWithWhereUniqueWithoutFileInput[]
    updateMany?: FileVersionUpdateManyWithWhereWithoutFileInput | FileVersionUpdateManyWithWhereWithoutFileInput[]
    deleteMany?: FileVersionScalarWhereInput | FileVersionScalarWhereInput[]
  }

  export type FileCreateNestedOneWithoutVersionsInput = {
    create?: XOR<FileCreateWithoutVersionsInput, FileUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: FileCreateOrConnectWithoutVersionsInput
    connect?: FileWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFileVersionsInput = {
    create?: XOR<UserCreateWithoutFileVersionsInput, UserUncheckedCreateWithoutFileVersionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFileVersionsInput
    connect?: UserWhereUniqueInput
  }

  export type FileUpdateOneRequiredWithoutVersionsNestedInput = {
    create?: XOR<FileCreateWithoutVersionsInput, FileUncheckedCreateWithoutVersionsInput>
    connectOrCreate?: FileCreateOrConnectWithoutVersionsInput
    upsert?: FileUpsertWithoutVersionsInput
    connect?: FileWhereUniqueInput
    update?: XOR<XOR<FileUpdateToOneWithWhereWithoutVersionsInput, FileUpdateWithoutVersionsInput>, FileUncheckedUpdateWithoutVersionsInput>
  }

  export type UserUpdateOneRequiredWithoutFileVersionsNestedInput = {
    create?: XOR<UserCreateWithoutFileVersionsInput, UserUncheckedCreateWithoutFileVersionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFileVersionsInput
    upsert?: UserUpsertWithoutFileVersionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFileVersionsInput, UserUpdateWithoutFileVersionsInput>, UserUncheckedUpdateWithoutFileVersionsInput>
  }

  export type FileCreateNestedOneWithoutSharesInput = {
    create?: XOR<FileCreateWithoutSharesInput, FileUncheckedCreateWithoutSharesInput>
    connectOrCreate?: FileCreateOrConnectWithoutSharesInput
    connect?: FileWhereUniqueInput
  }

  export type FolderCreateNestedOneWithoutSharesInput = {
    create?: XOR<FolderCreateWithoutSharesInput, FolderUncheckedCreateWithoutSharesInput>
    connectOrCreate?: FolderCreateOrConnectWithoutSharesInput
    connect?: FolderWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSharesCreatedInput = {
    create?: XOR<UserCreateWithoutSharesCreatedInput, UserUncheckedCreateWithoutSharesCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutSharesCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSharesReceivedInput = {
    create?: XOR<UserCreateWithoutSharesReceivedInput, UserUncheckedCreateWithoutSharesReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutSharesReceivedInput
    connect?: UserWhereUniqueInput
  }

  export type EnumPermissionLevelFieldUpdateOperationsInput = {
    set?: $Enums.PermissionLevel
  }

  export type FileUpdateOneWithoutSharesNestedInput = {
    create?: XOR<FileCreateWithoutSharesInput, FileUncheckedCreateWithoutSharesInput>
    connectOrCreate?: FileCreateOrConnectWithoutSharesInput
    upsert?: FileUpsertWithoutSharesInput
    disconnect?: FileWhereInput | boolean
    delete?: FileWhereInput | boolean
    connect?: FileWhereUniqueInput
    update?: XOR<XOR<FileUpdateToOneWithWhereWithoutSharesInput, FileUpdateWithoutSharesInput>, FileUncheckedUpdateWithoutSharesInput>
  }

  export type FolderUpdateOneWithoutSharesNestedInput = {
    create?: XOR<FolderCreateWithoutSharesInput, FolderUncheckedCreateWithoutSharesInput>
    connectOrCreate?: FolderCreateOrConnectWithoutSharesInput
    upsert?: FolderUpsertWithoutSharesInput
    disconnect?: FolderWhereInput | boolean
    delete?: FolderWhereInput | boolean
    connect?: FolderWhereUniqueInput
    update?: XOR<XOR<FolderUpdateToOneWithWhereWithoutSharesInput, FolderUpdateWithoutSharesInput>, FolderUncheckedUpdateWithoutSharesInput>
  }

  export type UserUpdateOneRequiredWithoutSharesCreatedNestedInput = {
    create?: XOR<UserCreateWithoutSharesCreatedInput, UserUncheckedCreateWithoutSharesCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutSharesCreatedInput
    upsert?: UserUpsertWithoutSharesCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSharesCreatedInput, UserUpdateWithoutSharesCreatedInput>, UserUncheckedUpdateWithoutSharesCreatedInput>
  }

  export type UserUpdateOneWithoutSharesReceivedNestedInput = {
    create?: XOR<UserCreateWithoutSharesReceivedInput, UserUncheckedCreateWithoutSharesReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutSharesReceivedInput
    upsert?: UserUpsertWithoutSharesReceivedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSharesReceivedInput, UserUpdateWithoutSharesReceivedInput>, UserUncheckedUpdateWithoutSharesReceivedInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserCreateNestedOneWithoutUploadSessionsInput = {
    create?: XOR<UserCreateWithoutUploadSessionsInput, UserUncheckedCreateWithoutUploadSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumUploadStatusFieldUpdateOperationsInput = {
    set?: $Enums.UploadStatus
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutUploadSessionsNestedInput = {
    create?: XOR<UserCreateWithoutUploadSessionsInput, UserUncheckedCreateWithoutUploadSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUploadSessionsInput
    upsert?: UserUpsertWithoutUploadSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUploadSessionsInput, UserUpdateWithoutUploadSessionsInput>, UserUncheckedUpdateWithoutUploadSessionsInput>
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

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedEnumPlanTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeFilter<$PrismaModel> | $Enums.PlanType
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
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

  export type NestedEnumPlanTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanType | EnumPlanTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanType[] | ListEnumPlanTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTypeWithAggregatesFilter<$PrismaModel> | $Enums.PlanType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanTypeFilter<$PrismaModel>
    _max?: NestedEnumPlanTypeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumPermissionLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.PermissionLevel | EnumPermissionLevelFieldRefInput<$PrismaModel>
    in?: $Enums.PermissionLevel[] | ListEnumPermissionLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.PermissionLevel[] | ListEnumPermissionLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumPermissionLevelFilter<$PrismaModel> | $Enums.PermissionLevel
  }

  export type NestedEnumPermissionLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PermissionLevel | EnumPermissionLevelFieldRefInput<$PrismaModel>
    in?: $Enums.PermissionLevel[] | ListEnumPermissionLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.PermissionLevel[] | ListEnumPermissionLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumPermissionLevelWithAggregatesFilter<$PrismaModel> | $Enums.PermissionLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPermissionLevelFilter<$PrismaModel>
    _max?: NestedEnumPermissionLevelFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedEnumUploadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadStatus | EnumUploadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadStatus[] | ListEnumUploadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadStatus[] | ListEnumUploadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadStatusFilter<$PrismaModel> | $Enums.UploadStatus
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUploadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadStatus | EnumUploadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadStatus[] | ListEnumUploadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.UploadStatus[] | ListEnumUploadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumUploadStatusWithAggregatesFilter<$PrismaModel> | $Enums.UploadStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUploadStatusFilter<$PrismaModel>
    _max?: NestedEnumUploadStatusFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FolderCreateWithoutUserInput = {
    id?: string
    name: string
    color?: string | null
    description?: string | null
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    parent?: FolderCreateNestedOneWithoutChildrenInput
    children?: FolderCreateNestedManyWithoutParentInput
    files?: FileCreateNestedManyWithoutFolderInput
    shares?: ShareCreateNestedManyWithoutFolderInput
  }

  export type FolderUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    parentId?: string | null
    color?: string | null
    description?: string | null
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    children?: FolderUncheckedCreateNestedManyWithoutParentInput
    files?: FileUncheckedCreateNestedManyWithoutFolderInput
    shares?: ShareUncheckedCreateNestedManyWithoutFolderInput
  }

  export type FolderCreateOrConnectWithoutUserInput = {
    where: FolderWhereUniqueInput
    create: XOR<FolderCreateWithoutUserInput, FolderUncheckedCreateWithoutUserInput>
  }

  export type FolderCreateManyUserInputEnvelope = {
    data: FolderCreateManyUserInput | FolderCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FileCreateWithoutUserInput = {
    id?: string
    name: string
    originalName: string
    mimeType: string
    size: bigint | number
    filePath?: string | null
    s3Key?: string | null
    cloudFrontUrl?: string | null
    checksum?: string | null
    thumbnail?: string | null
    versionCount?: number
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    lastAccessedAt?: Date | string | null
    folder?: FolderCreateNestedOneWithoutFilesInput
    shares?: ShareCreateNestedManyWithoutFileInput
    versions?: FileVersionCreateNestedManyWithoutFileInput
  }

  export type FileUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    originalName: string
    mimeType: string
    size: bigint | number
    filePath?: string | null
    s3Key?: string | null
    cloudFrontUrl?: string | null
    folderId?: string | null
    checksum?: string | null
    thumbnail?: string | null
    versionCount?: number
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    lastAccessedAt?: Date | string | null
    shares?: ShareUncheckedCreateNestedManyWithoutFileInput
    versions?: FileVersionUncheckedCreateNestedManyWithoutFileInput
  }

  export type FileCreateOrConnectWithoutUserInput = {
    where: FileWhereUniqueInput
    create: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput>
  }

  export type FileCreateManyUserInputEnvelope = {
    data: FileCreateManyUserInput | FileCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UploadSessionCreateWithoutUserInput = {
    id?: string
    fileName: string
    fileSize?: bigint | number | null
    mimeType?: string | null
    folderId?: string | null
    s3Key?: string | null
    filePath?: string | null
    status?: $Enums.UploadStatus
    progress?: number
    errorMessage?: string | null
    uploadId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type UploadSessionUncheckedCreateWithoutUserInput = {
    id?: string
    fileName: string
    fileSize?: bigint | number | null
    mimeType?: string | null
    folderId?: string | null
    s3Key?: string | null
    filePath?: string | null
    status?: $Enums.UploadStatus
    progress?: number
    errorMessage?: string | null
    uploadId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type UploadSessionCreateOrConnectWithoutUserInput = {
    where: UploadSessionWhereUniqueInput
    create: XOR<UploadSessionCreateWithoutUserInput, UploadSessionUncheckedCreateWithoutUserInput>
  }

  export type UploadSessionCreateManyUserInputEnvelope = {
    data: UploadSessionCreateManyUserInput | UploadSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ShareCreateWithoutSharedByInput = {
    id?: string
    sharedWithEmail?: string | null
    permissionLevel?: $Enums.PermissionLevel
    shareToken?: string
    isPublic?: boolean
    expiresAt?: Date | string | null
    isRevoked?: boolean
    accessCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    file?: FileCreateNestedOneWithoutSharesInput
    folder?: FolderCreateNestedOneWithoutSharesInput
    sharedWith?: UserCreateNestedOneWithoutSharesReceivedInput
  }

  export type ShareUncheckedCreateWithoutSharedByInput = {
    id?: string
    fileId?: string | null
    folderId?: string | null
    sharedWithUserId?: string | null
    sharedWithEmail?: string | null
    permissionLevel?: $Enums.PermissionLevel
    shareToken?: string
    isPublic?: boolean
    expiresAt?: Date | string | null
    isRevoked?: boolean
    accessCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShareCreateOrConnectWithoutSharedByInput = {
    where: ShareWhereUniqueInput
    create: XOR<ShareCreateWithoutSharedByInput, ShareUncheckedCreateWithoutSharedByInput>
  }

  export type ShareCreateManySharedByInputEnvelope = {
    data: ShareCreateManySharedByInput | ShareCreateManySharedByInput[]
    skipDuplicates?: boolean
  }

  export type ShareCreateWithoutSharedWithInput = {
    id?: string
    sharedWithEmail?: string | null
    permissionLevel?: $Enums.PermissionLevel
    shareToken?: string
    isPublic?: boolean
    expiresAt?: Date | string | null
    isRevoked?: boolean
    accessCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    file?: FileCreateNestedOneWithoutSharesInput
    folder?: FolderCreateNestedOneWithoutSharesInput
    sharedBy: UserCreateNestedOneWithoutSharesCreatedInput
  }

  export type ShareUncheckedCreateWithoutSharedWithInput = {
    id?: string
    fileId?: string | null
    folderId?: string | null
    sharedByUserId: string
    sharedWithEmail?: string | null
    permissionLevel?: $Enums.PermissionLevel
    shareToken?: string
    isPublic?: boolean
    expiresAt?: Date | string | null
    isRevoked?: boolean
    accessCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShareCreateOrConnectWithoutSharedWithInput = {
    where: ShareWhereUniqueInput
    create: XOR<ShareCreateWithoutSharedWithInput, ShareUncheckedCreateWithoutSharedWithInput>
  }

  export type ShareCreateManySharedWithInputEnvelope = {
    data: ShareCreateManySharedWithInput | ShareCreateManySharedWithInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    resourceType: string
    resourceId?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    resourceType: string
    resourceId?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FileVersionCreateWithoutCreatedByInput = {
    id?: string
    versionNumber: number
    s3Key: string
    size: bigint | number
    isCurrent?: boolean
    label?: string | null
    createdAt?: Date | string
    file: FileCreateNestedOneWithoutVersionsInput
  }

  export type FileVersionUncheckedCreateWithoutCreatedByInput = {
    id?: string
    fileId: string
    versionNumber: number
    s3Key: string
    size: bigint | number
    isCurrent?: boolean
    label?: string | null
    createdAt?: Date | string
  }

  export type FileVersionCreateOrConnectWithoutCreatedByInput = {
    where: FileVersionWhereUniqueInput
    create: XOR<FileVersionCreateWithoutCreatedByInput, FileVersionUncheckedCreateWithoutCreatedByInput>
  }

  export type FileVersionCreateManyCreatedByInputEnvelope = {
    data: FileVersionCreateManyCreatedByInput | FileVersionCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type FolderUpsertWithWhereUniqueWithoutUserInput = {
    where: FolderWhereUniqueInput
    update: XOR<FolderUpdateWithoutUserInput, FolderUncheckedUpdateWithoutUserInput>
    create: XOR<FolderCreateWithoutUserInput, FolderUncheckedCreateWithoutUserInput>
  }

  export type FolderUpdateWithWhereUniqueWithoutUserInput = {
    where: FolderWhereUniqueInput
    data: XOR<FolderUpdateWithoutUserInput, FolderUncheckedUpdateWithoutUserInput>
  }

  export type FolderUpdateManyWithWhereWithoutUserInput = {
    where: FolderScalarWhereInput
    data: XOR<FolderUpdateManyMutationInput, FolderUncheckedUpdateManyWithoutUserInput>
  }

  export type FolderScalarWhereInput = {
    AND?: FolderScalarWhereInput | FolderScalarWhereInput[]
    OR?: FolderScalarWhereInput[]
    NOT?: FolderScalarWhereInput | FolderScalarWhereInput[]
    id?: StringFilter<"Folder"> | string
    name?: StringFilter<"Folder"> | string
    parentId?: StringNullableFilter<"Folder"> | string | null
    userId?: StringFilter<"Folder"> | string
    color?: StringNullableFilter<"Folder"> | string | null
    description?: StringNullableFilter<"Folder"> | string | null
    isStarred?: BoolFilter<"Folder"> | boolean
    isInTrash?: BoolFilter<"Folder"> | boolean
    createdAt?: DateTimeFilter<"Folder"> | Date | string
    updatedAt?: DateTimeFilter<"Folder"> | Date | string
    trashedAt?: DateTimeNullableFilter<"Folder"> | Date | string | null
  }

  export type FileUpsertWithWhereUniqueWithoutUserInput = {
    where: FileWhereUniqueInput
    update: XOR<FileUpdateWithoutUserInput, FileUncheckedUpdateWithoutUserInput>
    create: XOR<FileCreateWithoutUserInput, FileUncheckedCreateWithoutUserInput>
  }

  export type FileUpdateWithWhereUniqueWithoutUserInput = {
    where: FileWhereUniqueInput
    data: XOR<FileUpdateWithoutUserInput, FileUncheckedUpdateWithoutUserInput>
  }

  export type FileUpdateManyWithWhereWithoutUserInput = {
    where: FileScalarWhereInput
    data: XOR<FileUpdateManyMutationInput, FileUncheckedUpdateManyWithoutUserInput>
  }

  export type FileScalarWhereInput = {
    AND?: FileScalarWhereInput | FileScalarWhereInput[]
    OR?: FileScalarWhereInput[]
    NOT?: FileScalarWhereInput | FileScalarWhereInput[]
    id?: StringFilter<"File"> | string
    name?: StringFilter<"File"> | string
    originalName?: StringFilter<"File"> | string
    mimeType?: StringFilter<"File"> | string
    size?: BigIntFilter<"File"> | bigint | number
    filePath?: StringNullableFilter<"File"> | string | null
    s3Key?: StringNullableFilter<"File"> | string | null
    cloudFrontUrl?: StringNullableFilter<"File"> | string | null
    folderId?: StringNullableFilter<"File"> | string | null
    userId?: StringFilter<"File"> | string
    checksum?: StringNullableFilter<"File"> | string | null
    thumbnail?: StringNullableFilter<"File"> | string | null
    versionCount?: IntFilter<"File"> | number
    isStarred?: BoolFilter<"File"> | boolean
    isInTrash?: BoolFilter<"File"> | boolean
    createdAt?: DateTimeFilter<"File"> | Date | string
    updatedAt?: DateTimeFilter<"File"> | Date | string
    trashedAt?: DateTimeNullableFilter<"File"> | Date | string | null
    lastAccessedAt?: DateTimeNullableFilter<"File"> | Date | string | null
  }

  export type UploadSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: UploadSessionWhereUniqueInput
    update: XOR<UploadSessionUpdateWithoutUserInput, UploadSessionUncheckedUpdateWithoutUserInput>
    create: XOR<UploadSessionCreateWithoutUserInput, UploadSessionUncheckedCreateWithoutUserInput>
  }

  export type UploadSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: UploadSessionWhereUniqueInput
    data: XOR<UploadSessionUpdateWithoutUserInput, UploadSessionUncheckedUpdateWithoutUserInput>
  }

  export type UploadSessionUpdateManyWithWhereWithoutUserInput = {
    where: UploadSessionScalarWhereInput
    data: XOR<UploadSessionUpdateManyMutationInput, UploadSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type UploadSessionScalarWhereInput = {
    AND?: UploadSessionScalarWhereInput | UploadSessionScalarWhereInput[]
    OR?: UploadSessionScalarWhereInput[]
    NOT?: UploadSessionScalarWhereInput | UploadSessionScalarWhereInput[]
    id?: StringFilter<"UploadSession"> | string
    userId?: StringFilter<"UploadSession"> | string
    fileName?: StringFilter<"UploadSession"> | string
    fileSize?: BigIntNullableFilter<"UploadSession"> | bigint | number | null
    mimeType?: StringNullableFilter<"UploadSession"> | string | null
    folderId?: StringNullableFilter<"UploadSession"> | string | null
    s3Key?: StringNullableFilter<"UploadSession"> | string | null
    filePath?: StringNullableFilter<"UploadSession"> | string | null
    status?: EnumUploadStatusFilter<"UploadSession"> | $Enums.UploadStatus
    progress?: FloatFilter<"UploadSession"> | number
    errorMessage?: StringNullableFilter<"UploadSession"> | string | null
    uploadId?: StringNullableFilter<"UploadSession"> | string | null
    createdAt?: DateTimeFilter<"UploadSession"> | Date | string
    updatedAt?: DateTimeFilter<"UploadSession"> | Date | string
    completedAt?: DateTimeNullableFilter<"UploadSession"> | Date | string | null
  }

  export type ShareUpsertWithWhereUniqueWithoutSharedByInput = {
    where: ShareWhereUniqueInput
    update: XOR<ShareUpdateWithoutSharedByInput, ShareUncheckedUpdateWithoutSharedByInput>
    create: XOR<ShareCreateWithoutSharedByInput, ShareUncheckedCreateWithoutSharedByInput>
  }

  export type ShareUpdateWithWhereUniqueWithoutSharedByInput = {
    where: ShareWhereUniqueInput
    data: XOR<ShareUpdateWithoutSharedByInput, ShareUncheckedUpdateWithoutSharedByInput>
  }

  export type ShareUpdateManyWithWhereWithoutSharedByInput = {
    where: ShareScalarWhereInput
    data: XOR<ShareUpdateManyMutationInput, ShareUncheckedUpdateManyWithoutSharedByInput>
  }

  export type ShareScalarWhereInput = {
    AND?: ShareScalarWhereInput | ShareScalarWhereInput[]
    OR?: ShareScalarWhereInput[]
    NOT?: ShareScalarWhereInput | ShareScalarWhereInput[]
    id?: StringFilter<"Share"> | string
    fileId?: StringNullableFilter<"Share"> | string | null
    folderId?: StringNullableFilter<"Share"> | string | null
    sharedByUserId?: StringFilter<"Share"> | string
    sharedWithUserId?: StringNullableFilter<"Share"> | string | null
    sharedWithEmail?: StringNullableFilter<"Share"> | string | null
    permissionLevel?: EnumPermissionLevelFilter<"Share"> | $Enums.PermissionLevel
    shareToken?: StringFilter<"Share"> | string
    isPublic?: BoolFilter<"Share"> | boolean
    expiresAt?: DateTimeNullableFilter<"Share"> | Date | string | null
    isRevoked?: BoolFilter<"Share"> | boolean
    accessCount?: IntFilter<"Share"> | number
    createdAt?: DateTimeFilter<"Share"> | Date | string
    updatedAt?: DateTimeFilter<"Share"> | Date | string
  }

  export type ShareUpsertWithWhereUniqueWithoutSharedWithInput = {
    where: ShareWhereUniqueInput
    update: XOR<ShareUpdateWithoutSharedWithInput, ShareUncheckedUpdateWithoutSharedWithInput>
    create: XOR<ShareCreateWithoutSharedWithInput, ShareUncheckedCreateWithoutSharedWithInput>
  }

  export type ShareUpdateWithWhereUniqueWithoutSharedWithInput = {
    where: ShareWhereUniqueInput
    data: XOR<ShareUpdateWithoutSharedWithInput, ShareUncheckedUpdateWithoutSharedWithInput>
  }

  export type ShareUpdateManyWithWhereWithoutSharedWithInput = {
    where: ShareScalarWhereInput
    data: XOR<ShareUpdateManyMutationInput, ShareUncheckedUpdateManyWithoutSharedWithInput>
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringFilter<"AuditLog"> | string
    action?: StringFilter<"AuditLog"> | string
    resourceType?: StringFilter<"AuditLog"> | string
    resourceId?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: JsonFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type FileVersionUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: FileVersionWhereUniqueInput
    update: XOR<FileVersionUpdateWithoutCreatedByInput, FileVersionUncheckedUpdateWithoutCreatedByInput>
    create: XOR<FileVersionCreateWithoutCreatedByInput, FileVersionUncheckedCreateWithoutCreatedByInput>
  }

  export type FileVersionUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: FileVersionWhereUniqueInput
    data: XOR<FileVersionUpdateWithoutCreatedByInput, FileVersionUncheckedUpdateWithoutCreatedByInput>
  }

  export type FileVersionUpdateManyWithWhereWithoutCreatedByInput = {
    where: FileVersionScalarWhereInput
    data: XOR<FileVersionUpdateManyMutationInput, FileVersionUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type FileVersionScalarWhereInput = {
    AND?: FileVersionScalarWhereInput | FileVersionScalarWhereInput[]
    OR?: FileVersionScalarWhereInput[]
    NOT?: FileVersionScalarWhereInput | FileVersionScalarWhereInput[]
    id?: StringFilter<"FileVersion"> | string
    fileId?: StringFilter<"FileVersion"> | string
    versionNumber?: IntFilter<"FileVersion"> | number
    s3Key?: StringFilter<"FileVersion"> | string
    size?: BigIntFilter<"FileVersion"> | bigint | number
    createdById?: StringFilter<"FileVersion"> | string
    isCurrent?: BoolFilter<"FileVersion"> | boolean
    label?: StringNullableFilter<"FileVersion"> | string | null
    createdAt?: DateTimeFilter<"FileVersion"> | Date | string
  }

  export type UserCreateWithoutFoldersInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    hexId?: string | null
    role?: $Enums.UserRole
    profilePicture?: string | null
    profilePictureS3Key?: string | null
    storageQuota?: bigint | number
    storageUsed?: bigint | number
    planType?: $Enums.PlanType
    refreshToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    files?: FileCreateNestedManyWithoutUserInput
    uploadSessions?: UploadSessionCreateNestedManyWithoutUserInput
    sharesCreated?: ShareCreateNestedManyWithoutSharedByInput
    sharesReceived?: ShareCreateNestedManyWithoutSharedWithInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    fileVersions?: FileVersionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutFoldersInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    hexId?: string | null
    role?: $Enums.UserRole
    profilePicture?: string | null
    profilePictureS3Key?: string | null
    storageQuota?: bigint | number
    storageUsed?: bigint | number
    planType?: $Enums.PlanType
    refreshToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    files?: FileUncheckedCreateNestedManyWithoutUserInput
    uploadSessions?: UploadSessionUncheckedCreateNestedManyWithoutUserInput
    sharesCreated?: ShareUncheckedCreateNestedManyWithoutSharedByInput
    sharesReceived?: ShareUncheckedCreateNestedManyWithoutSharedWithInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    fileVersions?: FileVersionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutFoldersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFoldersInput, UserUncheckedCreateWithoutFoldersInput>
  }

  export type FolderCreateWithoutChildrenInput = {
    id?: string
    name: string
    color?: string | null
    description?: string | null
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    user: UserCreateNestedOneWithoutFoldersInput
    parent?: FolderCreateNestedOneWithoutChildrenInput
    files?: FileCreateNestedManyWithoutFolderInput
    shares?: ShareCreateNestedManyWithoutFolderInput
  }

  export type FolderUncheckedCreateWithoutChildrenInput = {
    id?: string
    name: string
    parentId?: string | null
    userId: string
    color?: string | null
    description?: string | null
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    files?: FileUncheckedCreateNestedManyWithoutFolderInput
    shares?: ShareUncheckedCreateNestedManyWithoutFolderInput
  }

  export type FolderCreateOrConnectWithoutChildrenInput = {
    where: FolderWhereUniqueInput
    create: XOR<FolderCreateWithoutChildrenInput, FolderUncheckedCreateWithoutChildrenInput>
  }

  export type FolderCreateWithoutParentInput = {
    id?: string
    name: string
    color?: string | null
    description?: string | null
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    user: UserCreateNestedOneWithoutFoldersInput
    children?: FolderCreateNestedManyWithoutParentInput
    files?: FileCreateNestedManyWithoutFolderInput
    shares?: ShareCreateNestedManyWithoutFolderInput
  }

  export type FolderUncheckedCreateWithoutParentInput = {
    id?: string
    name: string
    userId: string
    color?: string | null
    description?: string | null
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    children?: FolderUncheckedCreateNestedManyWithoutParentInput
    files?: FileUncheckedCreateNestedManyWithoutFolderInput
    shares?: ShareUncheckedCreateNestedManyWithoutFolderInput
  }

  export type FolderCreateOrConnectWithoutParentInput = {
    where: FolderWhereUniqueInput
    create: XOR<FolderCreateWithoutParentInput, FolderUncheckedCreateWithoutParentInput>
  }

  export type FolderCreateManyParentInputEnvelope = {
    data: FolderCreateManyParentInput | FolderCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type FileCreateWithoutFolderInput = {
    id?: string
    name: string
    originalName: string
    mimeType: string
    size: bigint | number
    filePath?: string | null
    s3Key?: string | null
    cloudFrontUrl?: string | null
    checksum?: string | null
    thumbnail?: string | null
    versionCount?: number
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    lastAccessedAt?: Date | string | null
    user: UserCreateNestedOneWithoutFilesInput
    shares?: ShareCreateNestedManyWithoutFileInput
    versions?: FileVersionCreateNestedManyWithoutFileInput
  }

  export type FileUncheckedCreateWithoutFolderInput = {
    id?: string
    name: string
    originalName: string
    mimeType: string
    size: bigint | number
    filePath?: string | null
    s3Key?: string | null
    cloudFrontUrl?: string | null
    userId: string
    checksum?: string | null
    thumbnail?: string | null
    versionCount?: number
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    lastAccessedAt?: Date | string | null
    shares?: ShareUncheckedCreateNestedManyWithoutFileInput
    versions?: FileVersionUncheckedCreateNestedManyWithoutFileInput
  }

  export type FileCreateOrConnectWithoutFolderInput = {
    where: FileWhereUniqueInput
    create: XOR<FileCreateWithoutFolderInput, FileUncheckedCreateWithoutFolderInput>
  }

  export type FileCreateManyFolderInputEnvelope = {
    data: FileCreateManyFolderInput | FileCreateManyFolderInput[]
    skipDuplicates?: boolean
  }

  export type ShareCreateWithoutFolderInput = {
    id?: string
    sharedWithEmail?: string | null
    permissionLevel?: $Enums.PermissionLevel
    shareToken?: string
    isPublic?: boolean
    expiresAt?: Date | string | null
    isRevoked?: boolean
    accessCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    file?: FileCreateNestedOneWithoutSharesInput
    sharedBy: UserCreateNestedOneWithoutSharesCreatedInput
    sharedWith?: UserCreateNestedOneWithoutSharesReceivedInput
  }

  export type ShareUncheckedCreateWithoutFolderInput = {
    id?: string
    fileId?: string | null
    sharedByUserId: string
    sharedWithUserId?: string | null
    sharedWithEmail?: string | null
    permissionLevel?: $Enums.PermissionLevel
    shareToken?: string
    isPublic?: boolean
    expiresAt?: Date | string | null
    isRevoked?: boolean
    accessCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShareCreateOrConnectWithoutFolderInput = {
    where: ShareWhereUniqueInput
    create: XOR<ShareCreateWithoutFolderInput, ShareUncheckedCreateWithoutFolderInput>
  }

  export type ShareCreateManyFolderInputEnvelope = {
    data: ShareCreateManyFolderInput | ShareCreateManyFolderInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutFoldersInput = {
    update: XOR<UserUpdateWithoutFoldersInput, UserUncheckedUpdateWithoutFoldersInput>
    create: XOR<UserCreateWithoutFoldersInput, UserUncheckedCreateWithoutFoldersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFoldersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFoldersInput, UserUncheckedUpdateWithoutFoldersInput>
  }

  export type UserUpdateWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hexId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    storageQuota?: BigIntFieldUpdateOperationsInput | bigint | number
    storageUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    files?: FileUpdateManyWithoutUserNestedInput
    uploadSessions?: UploadSessionUpdateManyWithoutUserNestedInput
    sharesCreated?: ShareUpdateManyWithoutSharedByNestedInput
    sharesReceived?: ShareUpdateManyWithoutSharedWithNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    fileVersions?: FileVersionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hexId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    storageQuota?: BigIntFieldUpdateOperationsInput | bigint | number
    storageUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    files?: FileUncheckedUpdateManyWithoutUserNestedInput
    uploadSessions?: UploadSessionUncheckedUpdateManyWithoutUserNestedInput
    sharesCreated?: ShareUncheckedUpdateManyWithoutSharedByNestedInput
    sharesReceived?: ShareUncheckedUpdateManyWithoutSharedWithNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    fileVersions?: FileVersionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type FolderUpsertWithoutChildrenInput = {
    update: XOR<FolderUpdateWithoutChildrenInput, FolderUncheckedUpdateWithoutChildrenInput>
    create: XOR<FolderCreateWithoutChildrenInput, FolderUncheckedCreateWithoutChildrenInput>
    where?: FolderWhereInput
  }

  export type FolderUpdateToOneWithWhereWithoutChildrenInput = {
    where?: FolderWhereInput
    data: XOR<FolderUpdateWithoutChildrenInput, FolderUncheckedUpdateWithoutChildrenInput>
  }

  export type FolderUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutFoldersNestedInput
    parent?: FolderUpdateOneWithoutChildrenNestedInput
    files?: FileUpdateManyWithoutFolderNestedInput
    shares?: ShareUpdateManyWithoutFolderNestedInput
  }

  export type FolderUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    files?: FileUncheckedUpdateManyWithoutFolderNestedInput
    shares?: ShareUncheckedUpdateManyWithoutFolderNestedInput
  }

  export type FolderUpsertWithWhereUniqueWithoutParentInput = {
    where: FolderWhereUniqueInput
    update: XOR<FolderUpdateWithoutParentInput, FolderUncheckedUpdateWithoutParentInput>
    create: XOR<FolderCreateWithoutParentInput, FolderUncheckedCreateWithoutParentInput>
  }

  export type FolderUpdateWithWhereUniqueWithoutParentInput = {
    where: FolderWhereUniqueInput
    data: XOR<FolderUpdateWithoutParentInput, FolderUncheckedUpdateWithoutParentInput>
  }

  export type FolderUpdateManyWithWhereWithoutParentInput = {
    where: FolderScalarWhereInput
    data: XOR<FolderUpdateManyMutationInput, FolderUncheckedUpdateManyWithoutParentInput>
  }

  export type FileUpsertWithWhereUniqueWithoutFolderInput = {
    where: FileWhereUniqueInput
    update: XOR<FileUpdateWithoutFolderInput, FileUncheckedUpdateWithoutFolderInput>
    create: XOR<FileCreateWithoutFolderInput, FileUncheckedCreateWithoutFolderInput>
  }

  export type FileUpdateWithWhereUniqueWithoutFolderInput = {
    where: FileWhereUniqueInput
    data: XOR<FileUpdateWithoutFolderInput, FileUncheckedUpdateWithoutFolderInput>
  }

  export type FileUpdateManyWithWhereWithoutFolderInput = {
    where: FileScalarWhereInput
    data: XOR<FileUpdateManyMutationInput, FileUncheckedUpdateManyWithoutFolderInput>
  }

  export type ShareUpsertWithWhereUniqueWithoutFolderInput = {
    where: ShareWhereUniqueInput
    update: XOR<ShareUpdateWithoutFolderInput, ShareUncheckedUpdateWithoutFolderInput>
    create: XOR<ShareCreateWithoutFolderInput, ShareUncheckedCreateWithoutFolderInput>
  }

  export type ShareUpdateWithWhereUniqueWithoutFolderInput = {
    where: ShareWhereUniqueInput
    data: XOR<ShareUpdateWithoutFolderInput, ShareUncheckedUpdateWithoutFolderInput>
  }

  export type ShareUpdateManyWithWhereWithoutFolderInput = {
    where: ShareScalarWhereInput
    data: XOR<ShareUpdateManyMutationInput, ShareUncheckedUpdateManyWithoutFolderInput>
  }

  export type UserCreateWithoutFilesInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    hexId?: string | null
    role?: $Enums.UserRole
    profilePicture?: string | null
    profilePictureS3Key?: string | null
    storageQuota?: bigint | number
    storageUsed?: bigint | number
    planType?: $Enums.PlanType
    refreshToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    folders?: FolderCreateNestedManyWithoutUserInput
    uploadSessions?: UploadSessionCreateNestedManyWithoutUserInput
    sharesCreated?: ShareCreateNestedManyWithoutSharedByInput
    sharesReceived?: ShareCreateNestedManyWithoutSharedWithInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    fileVersions?: FileVersionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutFilesInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    hexId?: string | null
    role?: $Enums.UserRole
    profilePicture?: string | null
    profilePictureS3Key?: string | null
    storageQuota?: bigint | number
    storageUsed?: bigint | number
    planType?: $Enums.PlanType
    refreshToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    folders?: FolderUncheckedCreateNestedManyWithoutUserInput
    uploadSessions?: UploadSessionUncheckedCreateNestedManyWithoutUserInput
    sharesCreated?: ShareUncheckedCreateNestedManyWithoutSharedByInput
    sharesReceived?: ShareUncheckedCreateNestedManyWithoutSharedWithInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    fileVersions?: FileVersionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutFilesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFilesInput, UserUncheckedCreateWithoutFilesInput>
  }

  export type FolderCreateWithoutFilesInput = {
    id?: string
    name: string
    color?: string | null
    description?: string | null
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    user: UserCreateNestedOneWithoutFoldersInput
    parent?: FolderCreateNestedOneWithoutChildrenInput
    children?: FolderCreateNestedManyWithoutParentInput
    shares?: ShareCreateNestedManyWithoutFolderInput
  }

  export type FolderUncheckedCreateWithoutFilesInput = {
    id?: string
    name: string
    parentId?: string | null
    userId: string
    color?: string | null
    description?: string | null
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    children?: FolderUncheckedCreateNestedManyWithoutParentInput
    shares?: ShareUncheckedCreateNestedManyWithoutFolderInput
  }

  export type FolderCreateOrConnectWithoutFilesInput = {
    where: FolderWhereUniqueInput
    create: XOR<FolderCreateWithoutFilesInput, FolderUncheckedCreateWithoutFilesInput>
  }

  export type ShareCreateWithoutFileInput = {
    id?: string
    sharedWithEmail?: string | null
    permissionLevel?: $Enums.PermissionLevel
    shareToken?: string
    isPublic?: boolean
    expiresAt?: Date | string | null
    isRevoked?: boolean
    accessCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    folder?: FolderCreateNestedOneWithoutSharesInput
    sharedBy: UserCreateNestedOneWithoutSharesCreatedInput
    sharedWith?: UserCreateNestedOneWithoutSharesReceivedInput
  }

  export type ShareUncheckedCreateWithoutFileInput = {
    id?: string
    folderId?: string | null
    sharedByUserId: string
    sharedWithUserId?: string | null
    sharedWithEmail?: string | null
    permissionLevel?: $Enums.PermissionLevel
    shareToken?: string
    isPublic?: boolean
    expiresAt?: Date | string | null
    isRevoked?: boolean
    accessCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShareCreateOrConnectWithoutFileInput = {
    where: ShareWhereUniqueInput
    create: XOR<ShareCreateWithoutFileInput, ShareUncheckedCreateWithoutFileInput>
  }

  export type ShareCreateManyFileInputEnvelope = {
    data: ShareCreateManyFileInput | ShareCreateManyFileInput[]
    skipDuplicates?: boolean
  }

  export type FileVersionCreateWithoutFileInput = {
    id?: string
    versionNumber: number
    s3Key: string
    size: bigint | number
    isCurrent?: boolean
    label?: string | null
    createdAt?: Date | string
    createdBy: UserCreateNestedOneWithoutFileVersionsInput
  }

  export type FileVersionUncheckedCreateWithoutFileInput = {
    id?: string
    versionNumber: number
    s3Key: string
    size: bigint | number
    createdById: string
    isCurrent?: boolean
    label?: string | null
    createdAt?: Date | string
  }

  export type FileVersionCreateOrConnectWithoutFileInput = {
    where: FileVersionWhereUniqueInput
    create: XOR<FileVersionCreateWithoutFileInput, FileVersionUncheckedCreateWithoutFileInput>
  }

  export type FileVersionCreateManyFileInputEnvelope = {
    data: FileVersionCreateManyFileInput | FileVersionCreateManyFileInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutFilesInput = {
    update: XOR<UserUpdateWithoutFilesInput, UserUncheckedUpdateWithoutFilesInput>
    create: XOR<UserCreateWithoutFilesInput, UserUncheckedCreateWithoutFilesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFilesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFilesInput, UserUncheckedUpdateWithoutFilesInput>
  }

  export type UserUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hexId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    storageQuota?: BigIntFieldUpdateOperationsInput | bigint | number
    storageUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folders?: FolderUpdateManyWithoutUserNestedInput
    uploadSessions?: UploadSessionUpdateManyWithoutUserNestedInput
    sharesCreated?: ShareUpdateManyWithoutSharedByNestedInput
    sharesReceived?: ShareUpdateManyWithoutSharedWithNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    fileVersions?: FileVersionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hexId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    storageQuota?: BigIntFieldUpdateOperationsInput | bigint | number
    storageUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folders?: FolderUncheckedUpdateManyWithoutUserNestedInput
    uploadSessions?: UploadSessionUncheckedUpdateManyWithoutUserNestedInput
    sharesCreated?: ShareUncheckedUpdateManyWithoutSharedByNestedInput
    sharesReceived?: ShareUncheckedUpdateManyWithoutSharedWithNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    fileVersions?: FileVersionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type FolderUpsertWithoutFilesInput = {
    update: XOR<FolderUpdateWithoutFilesInput, FolderUncheckedUpdateWithoutFilesInput>
    create: XOR<FolderCreateWithoutFilesInput, FolderUncheckedCreateWithoutFilesInput>
    where?: FolderWhereInput
  }

  export type FolderUpdateToOneWithWhereWithoutFilesInput = {
    where?: FolderWhereInput
    data: XOR<FolderUpdateWithoutFilesInput, FolderUncheckedUpdateWithoutFilesInput>
  }

  export type FolderUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutFoldersNestedInput
    parent?: FolderUpdateOneWithoutChildrenNestedInput
    children?: FolderUpdateManyWithoutParentNestedInput
    shares?: ShareUpdateManyWithoutFolderNestedInput
  }

  export type FolderUncheckedUpdateWithoutFilesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    children?: FolderUncheckedUpdateManyWithoutParentNestedInput
    shares?: ShareUncheckedUpdateManyWithoutFolderNestedInput
  }

  export type ShareUpsertWithWhereUniqueWithoutFileInput = {
    where: ShareWhereUniqueInput
    update: XOR<ShareUpdateWithoutFileInput, ShareUncheckedUpdateWithoutFileInput>
    create: XOR<ShareCreateWithoutFileInput, ShareUncheckedCreateWithoutFileInput>
  }

  export type ShareUpdateWithWhereUniqueWithoutFileInput = {
    where: ShareWhereUniqueInput
    data: XOR<ShareUpdateWithoutFileInput, ShareUncheckedUpdateWithoutFileInput>
  }

  export type ShareUpdateManyWithWhereWithoutFileInput = {
    where: ShareScalarWhereInput
    data: XOR<ShareUpdateManyMutationInput, ShareUncheckedUpdateManyWithoutFileInput>
  }

  export type FileVersionUpsertWithWhereUniqueWithoutFileInput = {
    where: FileVersionWhereUniqueInput
    update: XOR<FileVersionUpdateWithoutFileInput, FileVersionUncheckedUpdateWithoutFileInput>
    create: XOR<FileVersionCreateWithoutFileInput, FileVersionUncheckedCreateWithoutFileInput>
  }

  export type FileVersionUpdateWithWhereUniqueWithoutFileInput = {
    where: FileVersionWhereUniqueInput
    data: XOR<FileVersionUpdateWithoutFileInput, FileVersionUncheckedUpdateWithoutFileInput>
  }

  export type FileVersionUpdateManyWithWhereWithoutFileInput = {
    where: FileVersionScalarWhereInput
    data: XOR<FileVersionUpdateManyMutationInput, FileVersionUncheckedUpdateManyWithoutFileInput>
  }

  export type FileCreateWithoutVersionsInput = {
    id?: string
    name: string
    originalName: string
    mimeType: string
    size: bigint | number
    filePath?: string | null
    s3Key?: string | null
    cloudFrontUrl?: string | null
    checksum?: string | null
    thumbnail?: string | null
    versionCount?: number
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    lastAccessedAt?: Date | string | null
    user: UserCreateNestedOneWithoutFilesInput
    folder?: FolderCreateNestedOneWithoutFilesInput
    shares?: ShareCreateNestedManyWithoutFileInput
  }

  export type FileUncheckedCreateWithoutVersionsInput = {
    id?: string
    name: string
    originalName: string
    mimeType: string
    size: bigint | number
    filePath?: string | null
    s3Key?: string | null
    cloudFrontUrl?: string | null
    folderId?: string | null
    userId: string
    checksum?: string | null
    thumbnail?: string | null
    versionCount?: number
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    lastAccessedAt?: Date | string | null
    shares?: ShareUncheckedCreateNestedManyWithoutFileInput
  }

  export type FileCreateOrConnectWithoutVersionsInput = {
    where: FileWhereUniqueInput
    create: XOR<FileCreateWithoutVersionsInput, FileUncheckedCreateWithoutVersionsInput>
  }

  export type UserCreateWithoutFileVersionsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    hexId?: string | null
    role?: $Enums.UserRole
    profilePicture?: string | null
    profilePictureS3Key?: string | null
    storageQuota?: bigint | number
    storageUsed?: bigint | number
    planType?: $Enums.PlanType
    refreshToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    folders?: FolderCreateNestedManyWithoutUserInput
    files?: FileCreateNestedManyWithoutUserInput
    uploadSessions?: UploadSessionCreateNestedManyWithoutUserInput
    sharesCreated?: ShareCreateNestedManyWithoutSharedByInput
    sharesReceived?: ShareCreateNestedManyWithoutSharedWithInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFileVersionsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    hexId?: string | null
    role?: $Enums.UserRole
    profilePicture?: string | null
    profilePictureS3Key?: string | null
    storageQuota?: bigint | number
    storageUsed?: bigint | number
    planType?: $Enums.PlanType
    refreshToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    folders?: FolderUncheckedCreateNestedManyWithoutUserInput
    files?: FileUncheckedCreateNestedManyWithoutUserInput
    uploadSessions?: UploadSessionUncheckedCreateNestedManyWithoutUserInput
    sharesCreated?: ShareUncheckedCreateNestedManyWithoutSharedByInput
    sharesReceived?: ShareUncheckedCreateNestedManyWithoutSharedWithInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFileVersionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFileVersionsInput, UserUncheckedCreateWithoutFileVersionsInput>
  }

  export type FileUpsertWithoutVersionsInput = {
    update: XOR<FileUpdateWithoutVersionsInput, FileUncheckedUpdateWithoutVersionsInput>
    create: XOR<FileCreateWithoutVersionsInput, FileUncheckedCreateWithoutVersionsInput>
    where?: FileWhereInput
  }

  export type FileUpdateToOneWithWhereWithoutVersionsInput = {
    where?: FileWhereInput
    data: XOR<FileUpdateWithoutVersionsInput, FileUncheckedUpdateWithoutVersionsInput>
  }

  export type FileUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    cloudFrontUrl?: NullableStringFieldUpdateOperationsInput | string | null
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    versionCount?: IntFieldUpdateOperationsInput | number
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutFilesNestedInput
    folder?: FolderUpdateOneWithoutFilesNestedInput
    shares?: ShareUpdateManyWithoutFileNestedInput
  }

  export type FileUncheckedUpdateWithoutVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    cloudFrontUrl?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    versionCount?: IntFieldUpdateOperationsInput | number
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shares?: ShareUncheckedUpdateManyWithoutFileNestedInput
  }

  export type UserUpsertWithoutFileVersionsInput = {
    update: XOR<UserUpdateWithoutFileVersionsInput, UserUncheckedUpdateWithoutFileVersionsInput>
    create: XOR<UserCreateWithoutFileVersionsInput, UserUncheckedCreateWithoutFileVersionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFileVersionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFileVersionsInput, UserUncheckedUpdateWithoutFileVersionsInput>
  }

  export type UserUpdateWithoutFileVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hexId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    storageQuota?: BigIntFieldUpdateOperationsInput | bigint | number
    storageUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folders?: FolderUpdateManyWithoutUserNestedInput
    files?: FileUpdateManyWithoutUserNestedInput
    uploadSessions?: UploadSessionUpdateManyWithoutUserNestedInput
    sharesCreated?: ShareUpdateManyWithoutSharedByNestedInput
    sharesReceived?: ShareUpdateManyWithoutSharedWithNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFileVersionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hexId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    storageQuota?: BigIntFieldUpdateOperationsInput | bigint | number
    storageUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folders?: FolderUncheckedUpdateManyWithoutUserNestedInput
    files?: FileUncheckedUpdateManyWithoutUserNestedInput
    uploadSessions?: UploadSessionUncheckedUpdateManyWithoutUserNestedInput
    sharesCreated?: ShareUncheckedUpdateManyWithoutSharedByNestedInput
    sharesReceived?: ShareUncheckedUpdateManyWithoutSharedWithNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FileCreateWithoutSharesInput = {
    id?: string
    name: string
    originalName: string
    mimeType: string
    size: bigint | number
    filePath?: string | null
    s3Key?: string | null
    cloudFrontUrl?: string | null
    checksum?: string | null
    thumbnail?: string | null
    versionCount?: number
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    lastAccessedAt?: Date | string | null
    user: UserCreateNestedOneWithoutFilesInput
    folder?: FolderCreateNestedOneWithoutFilesInput
    versions?: FileVersionCreateNestedManyWithoutFileInput
  }

  export type FileUncheckedCreateWithoutSharesInput = {
    id?: string
    name: string
    originalName: string
    mimeType: string
    size: bigint | number
    filePath?: string | null
    s3Key?: string | null
    cloudFrontUrl?: string | null
    folderId?: string | null
    userId: string
    checksum?: string | null
    thumbnail?: string | null
    versionCount?: number
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    lastAccessedAt?: Date | string | null
    versions?: FileVersionUncheckedCreateNestedManyWithoutFileInput
  }

  export type FileCreateOrConnectWithoutSharesInput = {
    where: FileWhereUniqueInput
    create: XOR<FileCreateWithoutSharesInput, FileUncheckedCreateWithoutSharesInput>
  }

  export type FolderCreateWithoutSharesInput = {
    id?: string
    name: string
    color?: string | null
    description?: string | null
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    user: UserCreateNestedOneWithoutFoldersInput
    parent?: FolderCreateNestedOneWithoutChildrenInput
    children?: FolderCreateNestedManyWithoutParentInput
    files?: FileCreateNestedManyWithoutFolderInput
  }

  export type FolderUncheckedCreateWithoutSharesInput = {
    id?: string
    name: string
    parentId?: string | null
    userId: string
    color?: string | null
    description?: string | null
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    children?: FolderUncheckedCreateNestedManyWithoutParentInput
    files?: FileUncheckedCreateNestedManyWithoutFolderInput
  }

  export type FolderCreateOrConnectWithoutSharesInput = {
    where: FolderWhereUniqueInput
    create: XOR<FolderCreateWithoutSharesInput, FolderUncheckedCreateWithoutSharesInput>
  }

  export type UserCreateWithoutSharesCreatedInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    hexId?: string | null
    role?: $Enums.UserRole
    profilePicture?: string | null
    profilePictureS3Key?: string | null
    storageQuota?: bigint | number
    storageUsed?: bigint | number
    planType?: $Enums.PlanType
    refreshToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    folders?: FolderCreateNestedManyWithoutUserInput
    files?: FileCreateNestedManyWithoutUserInput
    uploadSessions?: UploadSessionCreateNestedManyWithoutUserInput
    sharesReceived?: ShareCreateNestedManyWithoutSharedWithInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    fileVersions?: FileVersionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutSharesCreatedInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    hexId?: string | null
    role?: $Enums.UserRole
    profilePicture?: string | null
    profilePictureS3Key?: string | null
    storageQuota?: bigint | number
    storageUsed?: bigint | number
    planType?: $Enums.PlanType
    refreshToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    folders?: FolderUncheckedCreateNestedManyWithoutUserInput
    files?: FileUncheckedCreateNestedManyWithoutUserInput
    uploadSessions?: UploadSessionUncheckedCreateNestedManyWithoutUserInput
    sharesReceived?: ShareUncheckedCreateNestedManyWithoutSharedWithInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    fileVersions?: FileVersionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutSharesCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSharesCreatedInput, UserUncheckedCreateWithoutSharesCreatedInput>
  }

  export type UserCreateWithoutSharesReceivedInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    hexId?: string | null
    role?: $Enums.UserRole
    profilePicture?: string | null
    profilePictureS3Key?: string | null
    storageQuota?: bigint | number
    storageUsed?: bigint | number
    planType?: $Enums.PlanType
    refreshToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    folders?: FolderCreateNestedManyWithoutUserInput
    files?: FileCreateNestedManyWithoutUserInput
    uploadSessions?: UploadSessionCreateNestedManyWithoutUserInput
    sharesCreated?: ShareCreateNestedManyWithoutSharedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    fileVersions?: FileVersionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutSharesReceivedInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    hexId?: string | null
    role?: $Enums.UserRole
    profilePicture?: string | null
    profilePictureS3Key?: string | null
    storageQuota?: bigint | number
    storageUsed?: bigint | number
    planType?: $Enums.PlanType
    refreshToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    folders?: FolderUncheckedCreateNestedManyWithoutUserInput
    files?: FileUncheckedCreateNestedManyWithoutUserInput
    uploadSessions?: UploadSessionUncheckedCreateNestedManyWithoutUserInput
    sharesCreated?: ShareUncheckedCreateNestedManyWithoutSharedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    fileVersions?: FileVersionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutSharesReceivedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSharesReceivedInput, UserUncheckedCreateWithoutSharesReceivedInput>
  }

  export type FileUpsertWithoutSharesInput = {
    update: XOR<FileUpdateWithoutSharesInput, FileUncheckedUpdateWithoutSharesInput>
    create: XOR<FileCreateWithoutSharesInput, FileUncheckedCreateWithoutSharesInput>
    where?: FileWhereInput
  }

  export type FileUpdateToOneWithWhereWithoutSharesInput = {
    where?: FileWhereInput
    data: XOR<FileUpdateWithoutSharesInput, FileUncheckedUpdateWithoutSharesInput>
  }

  export type FileUpdateWithoutSharesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    cloudFrontUrl?: NullableStringFieldUpdateOperationsInput | string | null
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    versionCount?: IntFieldUpdateOperationsInput | number
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutFilesNestedInput
    folder?: FolderUpdateOneWithoutFilesNestedInput
    versions?: FileVersionUpdateManyWithoutFileNestedInput
  }

  export type FileUncheckedUpdateWithoutSharesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    cloudFrontUrl?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    versionCount?: IntFieldUpdateOperationsInput | number
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    versions?: FileVersionUncheckedUpdateManyWithoutFileNestedInput
  }

  export type FolderUpsertWithoutSharesInput = {
    update: XOR<FolderUpdateWithoutSharesInput, FolderUncheckedUpdateWithoutSharesInput>
    create: XOR<FolderCreateWithoutSharesInput, FolderUncheckedCreateWithoutSharesInput>
    where?: FolderWhereInput
  }

  export type FolderUpdateToOneWithWhereWithoutSharesInput = {
    where?: FolderWhereInput
    data: XOR<FolderUpdateWithoutSharesInput, FolderUncheckedUpdateWithoutSharesInput>
  }

  export type FolderUpdateWithoutSharesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutFoldersNestedInput
    parent?: FolderUpdateOneWithoutChildrenNestedInput
    children?: FolderUpdateManyWithoutParentNestedInput
    files?: FileUpdateManyWithoutFolderNestedInput
  }

  export type FolderUncheckedUpdateWithoutSharesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    children?: FolderUncheckedUpdateManyWithoutParentNestedInput
    files?: FileUncheckedUpdateManyWithoutFolderNestedInput
  }

  export type UserUpsertWithoutSharesCreatedInput = {
    update: XOR<UserUpdateWithoutSharesCreatedInput, UserUncheckedUpdateWithoutSharesCreatedInput>
    create: XOR<UserCreateWithoutSharesCreatedInput, UserUncheckedCreateWithoutSharesCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSharesCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSharesCreatedInput, UserUncheckedUpdateWithoutSharesCreatedInput>
  }

  export type UserUpdateWithoutSharesCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hexId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    storageQuota?: BigIntFieldUpdateOperationsInput | bigint | number
    storageUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folders?: FolderUpdateManyWithoutUserNestedInput
    files?: FileUpdateManyWithoutUserNestedInput
    uploadSessions?: UploadSessionUpdateManyWithoutUserNestedInput
    sharesReceived?: ShareUpdateManyWithoutSharedWithNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    fileVersions?: FileVersionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutSharesCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hexId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    storageQuota?: BigIntFieldUpdateOperationsInput | bigint | number
    storageUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folders?: FolderUncheckedUpdateManyWithoutUserNestedInput
    files?: FileUncheckedUpdateManyWithoutUserNestedInput
    uploadSessions?: UploadSessionUncheckedUpdateManyWithoutUserNestedInput
    sharesReceived?: ShareUncheckedUpdateManyWithoutSharedWithNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    fileVersions?: FileVersionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUpsertWithoutSharesReceivedInput = {
    update: XOR<UserUpdateWithoutSharesReceivedInput, UserUncheckedUpdateWithoutSharesReceivedInput>
    create: XOR<UserCreateWithoutSharesReceivedInput, UserUncheckedCreateWithoutSharesReceivedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSharesReceivedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSharesReceivedInput, UserUncheckedUpdateWithoutSharesReceivedInput>
  }

  export type UserUpdateWithoutSharesReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hexId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    storageQuota?: BigIntFieldUpdateOperationsInput | bigint | number
    storageUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folders?: FolderUpdateManyWithoutUserNestedInput
    files?: FileUpdateManyWithoutUserNestedInput
    uploadSessions?: UploadSessionUpdateManyWithoutUserNestedInput
    sharesCreated?: ShareUpdateManyWithoutSharedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    fileVersions?: FileVersionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutSharesReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hexId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    storageQuota?: BigIntFieldUpdateOperationsInput | bigint | number
    storageUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folders?: FolderUncheckedUpdateManyWithoutUserNestedInput
    files?: FileUncheckedUpdateManyWithoutUserNestedInput
    uploadSessions?: UploadSessionUncheckedUpdateManyWithoutUserNestedInput
    sharesCreated?: ShareUncheckedUpdateManyWithoutSharedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    fileVersions?: FileVersionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    hexId?: string | null
    role?: $Enums.UserRole
    profilePicture?: string | null
    profilePictureS3Key?: string | null
    storageQuota?: bigint | number
    storageUsed?: bigint | number
    planType?: $Enums.PlanType
    refreshToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    folders?: FolderCreateNestedManyWithoutUserInput
    files?: FileCreateNestedManyWithoutUserInput
    uploadSessions?: UploadSessionCreateNestedManyWithoutUserInput
    sharesCreated?: ShareCreateNestedManyWithoutSharedByInput
    sharesReceived?: ShareCreateNestedManyWithoutSharedWithInput
    fileVersions?: FileVersionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    hexId?: string | null
    role?: $Enums.UserRole
    profilePicture?: string | null
    profilePictureS3Key?: string | null
    storageQuota?: bigint | number
    storageUsed?: bigint | number
    planType?: $Enums.PlanType
    refreshToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    folders?: FolderUncheckedCreateNestedManyWithoutUserInput
    files?: FileUncheckedCreateNestedManyWithoutUserInput
    uploadSessions?: UploadSessionUncheckedCreateNestedManyWithoutUserInput
    sharesCreated?: ShareUncheckedCreateNestedManyWithoutSharedByInput
    sharesReceived?: ShareUncheckedCreateNestedManyWithoutSharedWithInput
    fileVersions?: FileVersionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hexId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    storageQuota?: BigIntFieldUpdateOperationsInput | bigint | number
    storageUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folders?: FolderUpdateManyWithoutUserNestedInput
    files?: FileUpdateManyWithoutUserNestedInput
    uploadSessions?: UploadSessionUpdateManyWithoutUserNestedInput
    sharesCreated?: ShareUpdateManyWithoutSharedByNestedInput
    sharesReceived?: ShareUpdateManyWithoutSharedWithNestedInput
    fileVersions?: FileVersionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hexId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    storageQuota?: BigIntFieldUpdateOperationsInput | bigint | number
    storageUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folders?: FolderUncheckedUpdateManyWithoutUserNestedInput
    files?: FileUncheckedUpdateManyWithoutUserNestedInput
    uploadSessions?: UploadSessionUncheckedUpdateManyWithoutUserNestedInput
    sharesCreated?: ShareUncheckedUpdateManyWithoutSharedByNestedInput
    sharesReceived?: ShareUncheckedUpdateManyWithoutSharedWithNestedInput
    fileVersions?: FileVersionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateWithoutUploadSessionsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    hexId?: string | null
    role?: $Enums.UserRole
    profilePicture?: string | null
    profilePictureS3Key?: string | null
    storageQuota?: bigint | number
    storageUsed?: bigint | number
    planType?: $Enums.PlanType
    refreshToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    folders?: FolderCreateNestedManyWithoutUserInput
    files?: FileCreateNestedManyWithoutUserInput
    sharesCreated?: ShareCreateNestedManyWithoutSharedByInput
    sharesReceived?: ShareCreateNestedManyWithoutSharedWithInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
    fileVersions?: FileVersionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutUploadSessionsInput = {
    id?: string
    email: string
    name?: string | null
    password?: string | null
    hexId?: string | null
    role?: $Enums.UserRole
    profilePicture?: string | null
    profilePictureS3Key?: string | null
    storageQuota?: bigint | number
    storageUsed?: bigint | number
    planType?: $Enums.PlanType
    refreshToken?: string | null
    passwordResetToken?: string | null
    passwordResetExpiry?: Date | string | null
    isEmailVerified?: boolean
    mfaEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    folders?: FolderUncheckedCreateNestedManyWithoutUserInput
    files?: FileUncheckedCreateNestedManyWithoutUserInput
    sharesCreated?: ShareUncheckedCreateNestedManyWithoutSharedByInput
    sharesReceived?: ShareUncheckedCreateNestedManyWithoutSharedWithInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
    fileVersions?: FileVersionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutUploadSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUploadSessionsInput, UserUncheckedCreateWithoutUploadSessionsInput>
  }

  export type UserUpsertWithoutUploadSessionsInput = {
    update: XOR<UserUpdateWithoutUploadSessionsInput, UserUncheckedUpdateWithoutUploadSessionsInput>
    create: XOR<UserCreateWithoutUploadSessionsInput, UserUncheckedCreateWithoutUploadSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUploadSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUploadSessionsInput, UserUncheckedUpdateWithoutUploadSessionsInput>
  }

  export type UserUpdateWithoutUploadSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hexId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    storageQuota?: BigIntFieldUpdateOperationsInput | bigint | number
    storageUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folders?: FolderUpdateManyWithoutUserNestedInput
    files?: FileUpdateManyWithoutUserNestedInput
    sharesCreated?: ShareUpdateManyWithoutSharedByNestedInput
    sharesReceived?: ShareUpdateManyWithoutSharedWithNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
    fileVersions?: FileVersionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutUploadSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hexId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    profilePictureS3Key?: NullableStringFieldUpdateOperationsInput | string | null
    storageQuota?: BigIntFieldUpdateOperationsInput | bigint | number
    storageUsed?: BigIntFieldUpdateOperationsInput | bigint | number
    planType?: EnumPlanTypeFieldUpdateOperationsInput | $Enums.PlanType
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetToken?: NullableStringFieldUpdateOperationsInput | string | null
    passwordResetExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    mfaEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folders?: FolderUncheckedUpdateManyWithoutUserNestedInput
    files?: FileUncheckedUpdateManyWithoutUserNestedInput
    sharesCreated?: ShareUncheckedUpdateManyWithoutSharedByNestedInput
    sharesReceived?: ShareUncheckedUpdateManyWithoutSharedWithNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
    fileVersions?: FileVersionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type FolderCreateManyUserInput = {
    id?: string
    name: string
    parentId?: string | null
    color?: string | null
    description?: string | null
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
  }

  export type FileCreateManyUserInput = {
    id?: string
    name: string
    originalName: string
    mimeType: string
    size: bigint | number
    filePath?: string | null
    s3Key?: string | null
    cloudFrontUrl?: string | null
    folderId?: string | null
    checksum?: string | null
    thumbnail?: string | null
    versionCount?: number
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    lastAccessedAt?: Date | string | null
  }

  export type UploadSessionCreateManyUserInput = {
    id?: string
    fileName: string
    fileSize?: bigint | number | null
    mimeType?: string | null
    folderId?: string | null
    s3Key?: string | null
    filePath?: string | null
    status?: $Enums.UploadStatus
    progress?: number
    errorMessage?: string | null
    uploadId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ShareCreateManySharedByInput = {
    id?: string
    fileId?: string | null
    folderId?: string | null
    sharedWithUserId?: string | null
    sharedWithEmail?: string | null
    permissionLevel?: $Enums.PermissionLevel
    shareToken?: string
    isPublic?: boolean
    expiresAt?: Date | string | null
    isRevoked?: boolean
    accessCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ShareCreateManySharedWithInput = {
    id?: string
    fileId?: string | null
    folderId?: string | null
    sharedByUserId: string
    sharedWithEmail?: string | null
    permissionLevel?: $Enums.PermissionLevel
    shareToken?: string
    isPublic?: boolean
    expiresAt?: Date | string | null
    isRevoked?: boolean
    accessCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    action: string
    resourceType: string
    resourceId?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type FileVersionCreateManyCreatedByInput = {
    id?: string
    fileId: string
    versionNumber: number
    s3Key: string
    size: bigint | number
    isCurrent?: boolean
    label?: string | null
    createdAt?: Date | string
  }

  export type FolderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parent?: FolderUpdateOneWithoutChildrenNestedInput
    children?: FolderUpdateManyWithoutParentNestedInput
    files?: FileUpdateManyWithoutFolderNestedInput
    shares?: ShareUpdateManyWithoutFolderNestedInput
  }

  export type FolderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    children?: FolderUncheckedUpdateManyWithoutParentNestedInput
    files?: FileUncheckedUpdateManyWithoutFolderNestedInput
    shares?: ShareUncheckedUpdateManyWithoutFolderNestedInput
  }

  export type FolderUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    cloudFrontUrl?: NullableStringFieldUpdateOperationsInput | string | null
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    versionCount?: IntFieldUpdateOperationsInput | number
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folder?: FolderUpdateOneWithoutFilesNestedInput
    shares?: ShareUpdateManyWithoutFileNestedInput
    versions?: FileVersionUpdateManyWithoutFileNestedInput
  }

  export type FileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    cloudFrontUrl?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    versionCount?: IntFieldUpdateOperationsInput | number
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shares?: ShareUncheckedUpdateManyWithoutFileNestedInput
    versions?: FileVersionUncheckedUpdateManyWithoutFileNestedInput
  }

  export type FileUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    cloudFrontUrl?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    versionCount?: IntFieldUpdateOperationsInput | number
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UploadSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    progress?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    uploadId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UploadSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    progress?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    uploadId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UploadSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUploadStatusFieldUpdateOperationsInput | $Enums.UploadStatus
    progress?: FloatFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    uploadId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ShareUpdateWithoutSharedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedWithEmail?: NullableStringFieldUpdateOperationsInput | string | null
    permissionLevel?: EnumPermissionLevelFieldUpdateOperationsInput | $Enums.PermissionLevel
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    accessCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    file?: FileUpdateOneWithoutSharesNestedInput
    folder?: FolderUpdateOneWithoutSharesNestedInput
    sharedWith?: UserUpdateOneWithoutSharesReceivedNestedInput
  }

  export type ShareUncheckedUpdateWithoutSharedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    sharedWithUserId?: NullableStringFieldUpdateOperationsInput | string | null
    sharedWithEmail?: NullableStringFieldUpdateOperationsInput | string | null
    permissionLevel?: EnumPermissionLevelFieldUpdateOperationsInput | $Enums.PermissionLevel
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    accessCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShareUncheckedUpdateManyWithoutSharedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    sharedWithUserId?: NullableStringFieldUpdateOperationsInput | string | null
    sharedWithEmail?: NullableStringFieldUpdateOperationsInput | string | null
    permissionLevel?: EnumPermissionLevelFieldUpdateOperationsInput | $Enums.PermissionLevel
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    accessCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShareUpdateWithoutSharedWithInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedWithEmail?: NullableStringFieldUpdateOperationsInput | string | null
    permissionLevel?: EnumPermissionLevelFieldUpdateOperationsInput | $Enums.PermissionLevel
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    accessCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    file?: FileUpdateOneWithoutSharesNestedInput
    folder?: FolderUpdateOneWithoutSharesNestedInput
    sharedBy?: UserUpdateOneRequiredWithoutSharesCreatedNestedInput
  }

  export type ShareUncheckedUpdateWithoutSharedWithInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    sharedByUserId?: StringFieldUpdateOperationsInput | string
    sharedWithEmail?: NullableStringFieldUpdateOperationsInput | string | null
    permissionLevel?: EnumPermissionLevelFieldUpdateOperationsInput | $Enums.PermissionLevel
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    accessCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShareUncheckedUpdateManyWithoutSharedWithInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: NullableStringFieldUpdateOperationsInput | string | null
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    sharedByUserId?: StringFieldUpdateOperationsInput | string
    sharedWithEmail?: NullableStringFieldUpdateOperationsInput | string | null
    permissionLevel?: EnumPermissionLevelFieldUpdateOperationsInput | $Enums.PermissionLevel
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    accessCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileVersionUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    file?: FileUpdateOneRequiredWithoutVersionsNestedInput
  }

  export type FileVersionUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileVersionUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FolderCreateManyParentInput = {
    id?: string
    name: string
    userId: string
    color?: string | null
    description?: string | null
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
  }

  export type FileCreateManyFolderInput = {
    id?: string
    name: string
    originalName: string
    mimeType: string
    size: bigint | number
    filePath?: string | null
    s3Key?: string | null
    cloudFrontUrl?: string | null
    userId: string
    checksum?: string | null
    thumbnail?: string | null
    versionCount?: number
    isStarred?: boolean
    isInTrash?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    trashedAt?: Date | string | null
    lastAccessedAt?: Date | string | null
  }

  export type ShareCreateManyFolderInput = {
    id?: string
    fileId?: string | null
    sharedByUserId: string
    sharedWithUserId?: string | null
    sharedWithEmail?: string | null
    permissionLevel?: $Enums.PermissionLevel
    shareToken?: string
    isPublic?: boolean
    expiresAt?: Date | string | null
    isRevoked?: boolean
    accessCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FolderUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutFoldersNestedInput
    children?: FolderUpdateManyWithoutParentNestedInput
    files?: FileUpdateManyWithoutFolderNestedInput
    shares?: ShareUpdateManyWithoutFolderNestedInput
  }

  export type FolderUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    children?: FolderUncheckedUpdateManyWithoutParentNestedInput
    files?: FileUncheckedUpdateManyWithoutFolderNestedInput
    shares?: ShareUncheckedUpdateManyWithoutFolderNestedInput
  }

  export type FolderUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    color?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FileUpdateWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    cloudFrontUrl?: NullableStringFieldUpdateOperationsInput | string | null
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    versionCount?: IntFieldUpdateOperationsInput | number
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutFilesNestedInput
    shares?: ShareUpdateManyWithoutFileNestedInput
    versions?: FileVersionUpdateManyWithoutFileNestedInput
  }

  export type FileUncheckedUpdateWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    cloudFrontUrl?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    versionCount?: IntFieldUpdateOperationsInput | number
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shares?: ShareUncheckedUpdateManyWithoutFileNestedInput
    versions?: FileVersionUncheckedUpdateManyWithoutFileNestedInput
  }

  export type FileUncheckedUpdateManyWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    originalName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    s3Key?: NullableStringFieldUpdateOperationsInput | string | null
    cloudFrontUrl?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    checksum?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    versionCount?: IntFieldUpdateOperationsInput | number
    isStarred?: BoolFieldUpdateOperationsInput | boolean
    isInTrash?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trashedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastAccessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ShareUpdateWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedWithEmail?: NullableStringFieldUpdateOperationsInput | string | null
    permissionLevel?: EnumPermissionLevelFieldUpdateOperationsInput | $Enums.PermissionLevel
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    accessCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    file?: FileUpdateOneWithoutSharesNestedInput
    sharedBy?: UserUpdateOneRequiredWithoutSharesCreatedNestedInput
    sharedWith?: UserUpdateOneWithoutSharesReceivedNestedInput
  }

  export type ShareUncheckedUpdateWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: NullableStringFieldUpdateOperationsInput | string | null
    sharedByUserId?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: NullableStringFieldUpdateOperationsInput | string | null
    sharedWithEmail?: NullableStringFieldUpdateOperationsInput | string | null
    permissionLevel?: EnumPermissionLevelFieldUpdateOperationsInput | $Enums.PermissionLevel
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    accessCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShareUncheckedUpdateManyWithoutFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: NullableStringFieldUpdateOperationsInput | string | null
    sharedByUserId?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: NullableStringFieldUpdateOperationsInput | string | null
    sharedWithEmail?: NullableStringFieldUpdateOperationsInput | string | null
    permissionLevel?: EnumPermissionLevelFieldUpdateOperationsInput | $Enums.PermissionLevel
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    accessCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShareCreateManyFileInput = {
    id?: string
    folderId?: string | null
    sharedByUserId: string
    sharedWithUserId?: string | null
    sharedWithEmail?: string | null
    permissionLevel?: $Enums.PermissionLevel
    shareToken?: string
    isPublic?: boolean
    expiresAt?: Date | string | null
    isRevoked?: boolean
    accessCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FileVersionCreateManyFileInput = {
    id?: string
    versionNumber: number
    s3Key: string
    size: bigint | number
    createdById: string
    isCurrent?: boolean
    label?: string | null
    createdAt?: Date | string
  }

  export type ShareUpdateWithoutFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    sharedWithEmail?: NullableStringFieldUpdateOperationsInput | string | null
    permissionLevel?: EnumPermissionLevelFieldUpdateOperationsInput | $Enums.PermissionLevel
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    accessCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    folder?: FolderUpdateOneWithoutSharesNestedInput
    sharedBy?: UserUpdateOneRequiredWithoutSharesCreatedNestedInput
    sharedWith?: UserUpdateOneWithoutSharesReceivedNestedInput
  }

  export type ShareUncheckedUpdateWithoutFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    sharedByUserId?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: NullableStringFieldUpdateOperationsInput | string | null
    sharedWithEmail?: NullableStringFieldUpdateOperationsInput | string | null
    permissionLevel?: EnumPermissionLevelFieldUpdateOperationsInput | $Enums.PermissionLevel
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    accessCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ShareUncheckedUpdateManyWithoutFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    folderId?: NullableStringFieldUpdateOperationsInput | string | null
    sharedByUserId?: StringFieldUpdateOperationsInput | string
    sharedWithUserId?: NullableStringFieldUpdateOperationsInput | string | null
    sharedWithEmail?: NullableStringFieldUpdateOperationsInput | string | null
    permissionLevel?: EnumPermissionLevelFieldUpdateOperationsInput | $Enums.PermissionLevel
    shareToken?: StringFieldUpdateOperationsInput | string
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isRevoked?: BoolFieldUpdateOperationsInput | boolean
    accessCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileVersionUpdateWithoutFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutFileVersionsNestedInput
  }

  export type FileVersionUncheckedUpdateWithoutFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    createdById?: StringFieldUpdateOperationsInput | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FileVersionUncheckedUpdateManyWithoutFileInput = {
    id?: StringFieldUpdateOperationsInput | string
    versionNumber?: IntFieldUpdateOperationsInput | number
    s3Key?: StringFieldUpdateOperationsInput | string
    size?: BigIntFieldUpdateOperationsInput | bigint | number
    createdById?: StringFieldUpdateOperationsInput | string
    isCurrent?: BoolFieldUpdateOperationsInput | boolean
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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