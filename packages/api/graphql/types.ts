export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
	[K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
	[SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
	T extends { [key: string]: unknown },
	K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
	| T
	| {
			[P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
	  };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string | number; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
	numeric: { input: any; output: any };
	timestamptz: { input: any; output: any };
	uuid: { input: any; output: any };
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
	_eq?: InputMaybe<Scalars['Boolean']['input']>;
	_gt?: InputMaybe<Scalars['Boolean']['input']>;
	_gte?: InputMaybe<Scalars['Boolean']['input']>;
	_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
	_is_null?: InputMaybe<Scalars['Boolean']['input']>;
	_lt?: InputMaybe<Scalars['Boolean']['input']>;
	_lte?: InputMaybe<Scalars['Boolean']['input']>;
	_neq?: InputMaybe<Scalars['Boolean']['input']>;
	_nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
	_eq?: InputMaybe<Scalars['Int']['input']>;
	_gt?: InputMaybe<Scalars['Int']['input']>;
	_gte?: InputMaybe<Scalars['Int']['input']>;
	_in?: InputMaybe<Array<Scalars['Int']['input']>>;
	_is_null?: InputMaybe<Scalars['Boolean']['input']>;
	_lt?: InputMaybe<Scalars['Int']['input']>;
	_lte?: InputMaybe<Scalars['Int']['input']>;
	_neq?: InputMaybe<Scalars['Int']['input']>;
	_nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
	_eq?: InputMaybe<Scalars['String']['input']>;
	_gt?: InputMaybe<Scalars['String']['input']>;
	_gte?: InputMaybe<Scalars['String']['input']>;
	/** does the column match the given case-insensitive pattern */
	_ilike?: InputMaybe<Scalars['String']['input']>;
	_in?: InputMaybe<Array<Scalars['String']['input']>>;
	/** does the column match the given POSIX regular expression, case insensitive */
	_iregex?: InputMaybe<Scalars['String']['input']>;
	_is_null?: InputMaybe<Scalars['Boolean']['input']>;
	/** does the column match the given pattern */
	_like?: InputMaybe<Scalars['String']['input']>;
	_lt?: InputMaybe<Scalars['String']['input']>;
	_lte?: InputMaybe<Scalars['String']['input']>;
	_neq?: InputMaybe<Scalars['String']['input']>;
	/** does the column NOT match the given case-insensitive pattern */
	_nilike?: InputMaybe<Scalars['String']['input']>;
	_nin?: InputMaybe<Array<Scalars['String']['input']>>;
	/** does the column NOT match the given POSIX regular expression, case insensitive */
	_niregex?: InputMaybe<Scalars['String']['input']>;
	/** does the column NOT match the given pattern */
	_nlike?: InputMaybe<Scalars['String']['input']>;
	/** does the column NOT match the given POSIX regular expression, case sensitive */
	_nregex?: InputMaybe<Scalars['String']['input']>;
	/** does the column NOT match the given SQL regular expression */
	_nsimilar?: InputMaybe<Scalars['String']['input']>;
	/** does the column match the given POSIX regular expression, case sensitive */
	_regex?: InputMaybe<Scalars['String']['input']>;
	/** does the column match the given SQL regular expression */
	_similar?: InputMaybe<Scalars['String']['input']>;
};

/** API Keys Allowed */
export type Apikeys = {
	__typename?: 'apikeys';
	created_at: Scalars['timestamptz']['output'];
	/** An array relationship */
	gists: Array<Gists>;
	/** An aggregate relationship */
	gists_aggregate: Gists_Aggregate;
	key: Scalars['String']['output'];
	keyID: Scalars['uuid']['output'];
	last_used?: Maybe<Scalars['timestamptz']['output']>;
	/** An array relationship */
	shorturls: Array<Shorturls>;
	/** An aggregate relationship */
	shorturls_aggregate: Shorturls_Aggregate;
	updated_at: Scalars['timestamptz']['output'];
	/** An array relationship */
	uploads: Array<Uploads>;
	/** An aggregate relationship */
	uploads_aggregate: Uploads_Aggregate;
};

/** API Keys Allowed */
export type ApikeysGistsArgs = {
	distinct_on?: InputMaybe<Array<Gists_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Gists_Order_By>>;
	where?: InputMaybe<Gists_Bool_Exp>;
};

/** API Keys Allowed */
export type ApikeysGists_AggregateArgs = {
	distinct_on?: InputMaybe<Array<Gists_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Gists_Order_By>>;
	where?: InputMaybe<Gists_Bool_Exp>;
};

/** API Keys Allowed */
export type ApikeysShorturlsArgs = {
	distinct_on?: InputMaybe<Array<Shorturls_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Shorturls_Order_By>>;
	where?: InputMaybe<Shorturls_Bool_Exp>;
};

/** API Keys Allowed */
export type ApikeysShorturls_AggregateArgs = {
	distinct_on?: InputMaybe<Array<Shorturls_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Shorturls_Order_By>>;
	where?: InputMaybe<Shorturls_Bool_Exp>;
};

/** API Keys Allowed */
export type ApikeysUploadsArgs = {
	distinct_on?: InputMaybe<Array<Uploads_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Uploads_Order_By>>;
	where?: InputMaybe<Uploads_Bool_Exp>;
};

/** API Keys Allowed */
export type ApikeysUploads_AggregateArgs = {
	distinct_on?: InputMaybe<Array<Uploads_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Uploads_Order_By>>;
	where?: InputMaybe<Uploads_Bool_Exp>;
};

/** aggregated selection of "apikeys" */
export type Apikeys_Aggregate = {
	__typename?: 'apikeys_aggregate';
	aggregate?: Maybe<Apikeys_Aggregate_Fields>;
	nodes: Array<Apikeys>;
};

/** aggregate fields of "apikeys" */
export type Apikeys_Aggregate_Fields = {
	__typename?: 'apikeys_aggregate_fields';
	count: Scalars['Int']['output'];
	max?: Maybe<Apikeys_Max_Fields>;
	min?: Maybe<Apikeys_Min_Fields>;
};

/** aggregate fields of "apikeys" */
export type Apikeys_Aggregate_FieldsCountArgs = {
	columns?: InputMaybe<Array<Apikeys_Select_Column>>;
	distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "apikeys". All fields are combined with a logical 'AND'. */
export type Apikeys_Bool_Exp = {
	_and?: InputMaybe<Array<Apikeys_Bool_Exp>>;
	_not?: InputMaybe<Apikeys_Bool_Exp>;
	_or?: InputMaybe<Array<Apikeys_Bool_Exp>>;
	created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
	gists?: InputMaybe<Gists_Bool_Exp>;
	gists_aggregate?: InputMaybe<Gists_Aggregate_Bool_Exp>;
	key?: InputMaybe<String_Comparison_Exp>;
	keyID?: InputMaybe<Uuid_Comparison_Exp>;
	last_used?: InputMaybe<Timestamptz_Comparison_Exp>;
	shorturls?: InputMaybe<Shorturls_Bool_Exp>;
	shorturls_aggregate?: InputMaybe<Shorturls_Aggregate_Bool_Exp>;
	updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
	uploads?: InputMaybe<Uploads_Bool_Exp>;
	uploads_aggregate?: InputMaybe<Uploads_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "apikeys" */
export enum Apikeys_Constraint {
	/** unique or primary key constraint on columns "key" */
	ApikeysKeyKey = 'apikeys_key_key',
	/** unique or primary key constraint on columns "keyID" */
	ApikeysPkey = 'apikeys_pkey',
}

/** input type for inserting data into table "apikeys" */
export type Apikeys_Insert_Input = {
	created_at?: InputMaybe<Scalars['timestamptz']['input']>;
	gists?: InputMaybe<Gists_Arr_Rel_Insert_Input>;
	key?: InputMaybe<Scalars['String']['input']>;
	keyID?: InputMaybe<Scalars['uuid']['input']>;
	last_used?: InputMaybe<Scalars['timestamptz']['input']>;
	shorturls?: InputMaybe<Shorturls_Arr_Rel_Insert_Input>;
	updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
	uploads?: InputMaybe<Uploads_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Apikeys_Max_Fields = {
	__typename?: 'apikeys_max_fields';
	created_at?: Maybe<Scalars['timestamptz']['output']>;
	key?: Maybe<Scalars['String']['output']>;
	keyID?: Maybe<Scalars['uuid']['output']>;
	last_used?: Maybe<Scalars['timestamptz']['output']>;
	updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Apikeys_Min_Fields = {
	__typename?: 'apikeys_min_fields';
	created_at?: Maybe<Scalars['timestamptz']['output']>;
	key?: Maybe<Scalars['String']['output']>;
	keyID?: Maybe<Scalars['uuid']['output']>;
	last_used?: Maybe<Scalars['timestamptz']['output']>;
	updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "apikeys" */
export type Apikeys_Mutation_Response = {
	__typename?: 'apikeys_mutation_response';
	/** number of rows affected by the mutation */
	affected_rows: Scalars['Int']['output'];
	/** data from the rows affected by the mutation */
	returning: Array<Apikeys>;
};

/** input type for inserting object relation for remote table "apikeys" */
export type Apikeys_Obj_Rel_Insert_Input = {
	data: Apikeys_Insert_Input;
	/** upsert condition */
	on_conflict?: InputMaybe<Apikeys_On_Conflict>;
};

/** on_conflict condition type for table "apikeys" */
export type Apikeys_On_Conflict = {
	constraint: Apikeys_Constraint;
	update_columns?: Array<Apikeys_Update_Column>;
	where?: InputMaybe<Apikeys_Bool_Exp>;
};

/** Ordering options when selecting data from "apikeys". */
export type Apikeys_Order_By = {
	created_at?: InputMaybe<Order_By>;
	gists_aggregate?: InputMaybe<Gists_Aggregate_Order_By>;
	key?: InputMaybe<Order_By>;
	keyID?: InputMaybe<Order_By>;
	last_used?: InputMaybe<Order_By>;
	shorturls_aggregate?: InputMaybe<Shorturls_Aggregate_Order_By>;
	updated_at?: InputMaybe<Order_By>;
	uploads_aggregate?: InputMaybe<Uploads_Aggregate_Order_By>;
};

/** primary key columns input for table: apikeys */
export type Apikeys_Pk_Columns_Input = {
	keyID: Scalars['uuid']['input'];
};

/** select columns of table "apikeys" */
export enum Apikeys_Select_Column {
	/** column name */
	CreatedAt = 'created_at',
	/** column name */
	Key = 'key',
	/** column name */
	KeyId = 'keyID',
	/** column name */
	LastUsed = 'last_used',
	/** column name */
	UpdatedAt = 'updated_at',
}

/** input type for updating data in table "apikeys" */
export type Apikeys_Set_Input = {
	created_at?: InputMaybe<Scalars['timestamptz']['input']>;
	key?: InputMaybe<Scalars['String']['input']>;
	keyID?: InputMaybe<Scalars['uuid']['input']>;
	last_used?: InputMaybe<Scalars['timestamptz']['input']>;
	updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "apikeys" */
export type Apikeys_Stream_Cursor_Input = {
	/** Stream column input with initial value */
	initial_value: Apikeys_Stream_Cursor_Value_Input;
	/** cursor ordering */
	ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Apikeys_Stream_Cursor_Value_Input = {
	created_at?: InputMaybe<Scalars['timestamptz']['input']>;
	key?: InputMaybe<Scalars['String']['input']>;
	keyID?: InputMaybe<Scalars['uuid']['input']>;
	last_used?: InputMaybe<Scalars['timestamptz']['input']>;
	updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "apikeys" */
export enum Apikeys_Update_Column {
	/** column name */
	CreatedAt = 'created_at',
	/** column name */
	Key = 'key',
	/** column name */
	KeyId = 'keyID',
	/** column name */
	LastUsed = 'last_used',
	/** column name */
	UpdatedAt = 'updated_at',
}

export type Apikeys_Updates = {
	/** sets the columns of the filtered rows to the given values */
	_set?: InputMaybe<Apikeys_Set_Input>;
	/** filter the rows which have to be updated */
	where: Apikeys_Bool_Exp;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
	/** ascending ordering of the cursor */
	Asc = 'ASC',
	/** descending ordering of the cursor */
	Desc = 'DESC',
}

/** columns and relationships of "gists" */
export type Gists = {
	__typename?: 'gists';
	/** An object relationship */
	apikey: Apikeys;
	apikeyUsed: Scalars['uuid']['output'];
	content: Scalars['String']['output'];
	created_on: Scalars['timestamptz']['output'];
	creator_ip?: Maybe<Scalars['String']['output']>;
	gistID: Scalars['uuid']['output'];
	gist_url_key: Scalars['String']['output'];
	isOneTimeOnly: Scalars['Boolean']['output'];
	isPrivate: Scalars['Boolean']['output'];
	passkey?: Maybe<Scalars['String']['output']>;
	views: Scalars['numeric']['output'];
};

/** aggregated selection of "gists" */
export type Gists_Aggregate = {
	__typename?: 'gists_aggregate';
	aggregate?: Maybe<Gists_Aggregate_Fields>;
	nodes: Array<Gists>;
};

export type Gists_Aggregate_Bool_Exp = {
	bool_and?: InputMaybe<Gists_Aggregate_Bool_Exp_Bool_And>;
	bool_or?: InputMaybe<Gists_Aggregate_Bool_Exp_Bool_Or>;
	count?: InputMaybe<Gists_Aggregate_Bool_Exp_Count>;
};

export type Gists_Aggregate_Bool_Exp_Bool_And = {
	arguments: Gists_Select_Column_Gists_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
	distinct?: InputMaybe<Scalars['Boolean']['input']>;
	filter?: InputMaybe<Gists_Bool_Exp>;
	predicate: Boolean_Comparison_Exp;
};

export type Gists_Aggregate_Bool_Exp_Bool_Or = {
	arguments: Gists_Select_Column_Gists_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
	distinct?: InputMaybe<Scalars['Boolean']['input']>;
	filter?: InputMaybe<Gists_Bool_Exp>;
	predicate: Boolean_Comparison_Exp;
};

export type Gists_Aggregate_Bool_Exp_Count = {
	arguments?: InputMaybe<Array<Gists_Select_Column>>;
	distinct?: InputMaybe<Scalars['Boolean']['input']>;
	filter?: InputMaybe<Gists_Bool_Exp>;
	predicate: Int_Comparison_Exp;
};

/** aggregate fields of "gists" */
export type Gists_Aggregate_Fields = {
	__typename?: 'gists_aggregate_fields';
	avg?: Maybe<Gists_Avg_Fields>;
	count: Scalars['Int']['output'];
	max?: Maybe<Gists_Max_Fields>;
	min?: Maybe<Gists_Min_Fields>;
	stddev?: Maybe<Gists_Stddev_Fields>;
	stddev_pop?: Maybe<Gists_Stddev_Pop_Fields>;
	stddev_samp?: Maybe<Gists_Stddev_Samp_Fields>;
	sum?: Maybe<Gists_Sum_Fields>;
	var_pop?: Maybe<Gists_Var_Pop_Fields>;
	var_samp?: Maybe<Gists_Var_Samp_Fields>;
	variance?: Maybe<Gists_Variance_Fields>;
};

/** aggregate fields of "gists" */
export type Gists_Aggregate_FieldsCountArgs = {
	columns?: InputMaybe<Array<Gists_Select_Column>>;
	distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "gists" */
export type Gists_Aggregate_Order_By = {
	avg?: InputMaybe<Gists_Avg_Order_By>;
	count?: InputMaybe<Order_By>;
	max?: InputMaybe<Gists_Max_Order_By>;
	min?: InputMaybe<Gists_Min_Order_By>;
	stddev?: InputMaybe<Gists_Stddev_Order_By>;
	stddev_pop?: InputMaybe<Gists_Stddev_Pop_Order_By>;
	stddev_samp?: InputMaybe<Gists_Stddev_Samp_Order_By>;
	sum?: InputMaybe<Gists_Sum_Order_By>;
	var_pop?: InputMaybe<Gists_Var_Pop_Order_By>;
	var_samp?: InputMaybe<Gists_Var_Samp_Order_By>;
	variance?: InputMaybe<Gists_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "gists" */
export type Gists_Arr_Rel_Insert_Input = {
	data: Array<Gists_Insert_Input>;
	/** upsert condition */
	on_conflict?: InputMaybe<Gists_On_Conflict>;
};

/** aggregate avg on columns */
export type Gists_Avg_Fields = {
	__typename?: 'gists_avg_fields';
	views?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "gists" */
export type Gists_Avg_Order_By = {
	views?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "gists". All fields are combined with a logical 'AND'. */
export type Gists_Bool_Exp = {
	_and?: InputMaybe<Array<Gists_Bool_Exp>>;
	_not?: InputMaybe<Gists_Bool_Exp>;
	_or?: InputMaybe<Array<Gists_Bool_Exp>>;
	apikey?: InputMaybe<Apikeys_Bool_Exp>;
	apikeyUsed?: InputMaybe<Uuid_Comparison_Exp>;
	content?: InputMaybe<String_Comparison_Exp>;
	created_on?: InputMaybe<Timestamptz_Comparison_Exp>;
	creator_ip?: InputMaybe<String_Comparison_Exp>;
	gistID?: InputMaybe<Uuid_Comparison_Exp>;
	gist_url_key?: InputMaybe<String_Comparison_Exp>;
	isOneTimeOnly?: InputMaybe<Boolean_Comparison_Exp>;
	isPrivate?: InputMaybe<Boolean_Comparison_Exp>;
	passkey?: InputMaybe<String_Comparison_Exp>;
	views?: InputMaybe<Numeric_Comparison_Exp>;
};

/** unique or primary key constraints on table "gists" */
export enum Gists_Constraint {
	/** unique or primary key constraint on columns "gist_url_key" */
	GistsGistUrlKeyKey = 'gists_gist_url_key_key',
	/** unique or primary key constraint on columns "gistID" */
	GistsPkey = 'gists_pkey',
}

/** input type for incrementing numeric columns in table "gists" */
export type Gists_Inc_Input = {
	views?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "gists" */
export type Gists_Insert_Input = {
	apikey?: InputMaybe<Apikeys_Obj_Rel_Insert_Input>;
	apikeyUsed?: InputMaybe<Scalars['uuid']['input']>;
	content?: InputMaybe<Scalars['String']['input']>;
	created_on?: InputMaybe<Scalars['timestamptz']['input']>;
	creator_ip?: InputMaybe<Scalars['String']['input']>;
	gistID?: InputMaybe<Scalars['uuid']['input']>;
	gist_url_key?: InputMaybe<Scalars['String']['input']>;
	isOneTimeOnly?: InputMaybe<Scalars['Boolean']['input']>;
	isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
	passkey?: InputMaybe<Scalars['String']['input']>;
	views?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate max on columns */
export type Gists_Max_Fields = {
	__typename?: 'gists_max_fields';
	apikeyUsed?: Maybe<Scalars['uuid']['output']>;
	content?: Maybe<Scalars['String']['output']>;
	created_on?: Maybe<Scalars['timestamptz']['output']>;
	creator_ip?: Maybe<Scalars['String']['output']>;
	gistID?: Maybe<Scalars['uuid']['output']>;
	gist_url_key?: Maybe<Scalars['String']['output']>;
	passkey?: Maybe<Scalars['String']['output']>;
	views?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "gists" */
export type Gists_Max_Order_By = {
	apikeyUsed?: InputMaybe<Order_By>;
	content?: InputMaybe<Order_By>;
	created_on?: InputMaybe<Order_By>;
	creator_ip?: InputMaybe<Order_By>;
	gistID?: InputMaybe<Order_By>;
	gist_url_key?: InputMaybe<Order_By>;
	passkey?: InputMaybe<Order_By>;
	views?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Gists_Min_Fields = {
	__typename?: 'gists_min_fields';
	apikeyUsed?: Maybe<Scalars['uuid']['output']>;
	content?: Maybe<Scalars['String']['output']>;
	created_on?: Maybe<Scalars['timestamptz']['output']>;
	creator_ip?: Maybe<Scalars['String']['output']>;
	gistID?: Maybe<Scalars['uuid']['output']>;
	gist_url_key?: Maybe<Scalars['String']['output']>;
	passkey?: Maybe<Scalars['String']['output']>;
	views?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "gists" */
export type Gists_Min_Order_By = {
	apikeyUsed?: InputMaybe<Order_By>;
	content?: InputMaybe<Order_By>;
	created_on?: InputMaybe<Order_By>;
	creator_ip?: InputMaybe<Order_By>;
	gistID?: InputMaybe<Order_By>;
	gist_url_key?: InputMaybe<Order_By>;
	passkey?: InputMaybe<Order_By>;
	views?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "gists" */
export type Gists_Mutation_Response = {
	__typename?: 'gists_mutation_response';
	/** number of rows affected by the mutation */
	affected_rows: Scalars['Int']['output'];
	/** data from the rows affected by the mutation */
	returning: Array<Gists>;
};

/** on_conflict condition type for table "gists" */
export type Gists_On_Conflict = {
	constraint: Gists_Constraint;
	update_columns?: Array<Gists_Update_Column>;
	where?: InputMaybe<Gists_Bool_Exp>;
};

/** Ordering options when selecting data from "gists". */
export type Gists_Order_By = {
	apikey?: InputMaybe<Apikeys_Order_By>;
	apikeyUsed?: InputMaybe<Order_By>;
	content?: InputMaybe<Order_By>;
	created_on?: InputMaybe<Order_By>;
	creator_ip?: InputMaybe<Order_By>;
	gistID?: InputMaybe<Order_By>;
	gist_url_key?: InputMaybe<Order_By>;
	isOneTimeOnly?: InputMaybe<Order_By>;
	isPrivate?: InputMaybe<Order_By>;
	passkey?: InputMaybe<Order_By>;
	views?: InputMaybe<Order_By>;
};

/** primary key columns input for table: gists */
export type Gists_Pk_Columns_Input = {
	gistID: Scalars['uuid']['input'];
};

/** select columns of table "gists" */
export enum Gists_Select_Column {
	/** column name */
	ApikeyUsed = 'apikeyUsed',
	/** column name */
	Content = 'content',
	/** column name */
	CreatedOn = 'created_on',
	/** column name */
	CreatorIp = 'creator_ip',
	/** column name */
	GistId = 'gistID',
	/** column name */
	GistUrlKey = 'gist_url_key',
	/** column name */
	IsOneTimeOnly = 'isOneTimeOnly',
	/** column name */
	IsPrivate = 'isPrivate',
	/** column name */
	Passkey = 'passkey',
	/** column name */
	Views = 'views',
}

/** select "gists_aggregate_bool_exp_bool_and_arguments_columns" columns of table "gists" */
export enum Gists_Select_Column_Gists_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
	/** column name */
	IsOneTimeOnly = 'isOneTimeOnly',
	/** column name */
	IsPrivate = 'isPrivate',
}

/** select "gists_aggregate_bool_exp_bool_or_arguments_columns" columns of table "gists" */
export enum Gists_Select_Column_Gists_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
	/** column name */
	IsOneTimeOnly = 'isOneTimeOnly',
	/** column name */
	IsPrivate = 'isPrivate',
}

/** input type for updating data in table "gists" */
export type Gists_Set_Input = {
	apikeyUsed?: InputMaybe<Scalars['uuid']['input']>;
	content?: InputMaybe<Scalars['String']['input']>;
	created_on?: InputMaybe<Scalars['timestamptz']['input']>;
	creator_ip?: InputMaybe<Scalars['String']['input']>;
	gistID?: InputMaybe<Scalars['uuid']['input']>;
	gist_url_key?: InputMaybe<Scalars['String']['input']>;
	isOneTimeOnly?: InputMaybe<Scalars['Boolean']['input']>;
	isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
	passkey?: InputMaybe<Scalars['String']['input']>;
	views?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate stddev on columns */
export type Gists_Stddev_Fields = {
	__typename?: 'gists_stddev_fields';
	views?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "gists" */
export type Gists_Stddev_Order_By = {
	views?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Gists_Stddev_Pop_Fields = {
	__typename?: 'gists_stddev_pop_fields';
	views?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "gists" */
export type Gists_Stddev_Pop_Order_By = {
	views?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Gists_Stddev_Samp_Fields = {
	__typename?: 'gists_stddev_samp_fields';
	views?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "gists" */
export type Gists_Stddev_Samp_Order_By = {
	views?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "gists" */
export type Gists_Stream_Cursor_Input = {
	/** Stream column input with initial value */
	initial_value: Gists_Stream_Cursor_Value_Input;
	/** cursor ordering */
	ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Gists_Stream_Cursor_Value_Input = {
	apikeyUsed?: InputMaybe<Scalars['uuid']['input']>;
	content?: InputMaybe<Scalars['String']['input']>;
	created_on?: InputMaybe<Scalars['timestamptz']['input']>;
	creator_ip?: InputMaybe<Scalars['String']['input']>;
	gistID?: InputMaybe<Scalars['uuid']['input']>;
	gist_url_key?: InputMaybe<Scalars['String']['input']>;
	isOneTimeOnly?: InputMaybe<Scalars['Boolean']['input']>;
	isPrivate?: InputMaybe<Scalars['Boolean']['input']>;
	passkey?: InputMaybe<Scalars['String']['input']>;
	views?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Gists_Sum_Fields = {
	__typename?: 'gists_sum_fields';
	views?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "gists" */
export type Gists_Sum_Order_By = {
	views?: InputMaybe<Order_By>;
};

/** update columns of table "gists" */
export enum Gists_Update_Column {
	/** column name */
	ApikeyUsed = 'apikeyUsed',
	/** column name */
	Content = 'content',
	/** column name */
	CreatedOn = 'created_on',
	/** column name */
	CreatorIp = 'creator_ip',
	/** column name */
	GistId = 'gistID',
	/** column name */
	GistUrlKey = 'gist_url_key',
	/** column name */
	IsOneTimeOnly = 'isOneTimeOnly',
	/** column name */
	IsPrivate = 'isPrivate',
	/** column name */
	Passkey = 'passkey',
	/** column name */
	Views = 'views',
}

export type Gists_Updates = {
	/** increments the numeric columns with given value of the filtered values */
	_inc?: InputMaybe<Gists_Inc_Input>;
	/** sets the columns of the filtered rows to the given values */
	_set?: InputMaybe<Gists_Set_Input>;
	/** filter the rows which have to be updated */
	where: Gists_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Gists_Var_Pop_Fields = {
	__typename?: 'gists_var_pop_fields';
	views?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "gists" */
export type Gists_Var_Pop_Order_By = {
	views?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Gists_Var_Samp_Fields = {
	__typename?: 'gists_var_samp_fields';
	views?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "gists" */
export type Gists_Var_Samp_Order_By = {
	views?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Gists_Variance_Fields = {
	__typename?: 'gists_variance_fields';
	views?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "gists" */
export type Gists_Variance_Order_By = {
	views?: InputMaybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
	__typename?: 'mutation_root';
	/** delete data from the table: "apikeys" */
	delete_apikeys?: Maybe<Apikeys_Mutation_Response>;
	/** delete single row from the table: "apikeys" */
	delete_apikeys_by_pk?: Maybe<Apikeys>;
	/** delete data from the table: "gists" */
	delete_gists?: Maybe<Gists_Mutation_Response>;
	/** delete single row from the table: "gists" */
	delete_gists_by_pk?: Maybe<Gists>;
	/** delete data from the table: "shorturls" */
	delete_shorturls?: Maybe<Shorturls_Mutation_Response>;
	/** delete single row from the table: "shorturls" */
	delete_shorturls_by_pk?: Maybe<Shorturls>;
	/** delete data from the table: "uploads" */
	delete_uploads?: Maybe<Uploads_Mutation_Response>;
	/** delete single row from the table: "uploads" */
	delete_uploads_by_pk?: Maybe<Uploads>;
	/** insert data into the table: "apikeys" */
	insert_apikeys?: Maybe<Apikeys_Mutation_Response>;
	/** insert a single row into the table: "apikeys" */
	insert_apikeys_one?: Maybe<Apikeys>;
	/** insert data into the table: "gists" */
	insert_gists?: Maybe<Gists_Mutation_Response>;
	/** insert a single row into the table: "gists" */
	insert_gists_one?: Maybe<Gists>;
	/** insert data into the table: "shorturls" */
	insert_shorturls?: Maybe<Shorturls_Mutation_Response>;
	/** insert a single row into the table: "shorturls" */
	insert_shorturls_one?: Maybe<Shorturls>;
	/** insert data into the table: "uploads" */
	insert_uploads?: Maybe<Uploads_Mutation_Response>;
	/** insert a single row into the table: "uploads" */
	insert_uploads_one?: Maybe<Uploads>;
	/** update data of the table: "apikeys" */
	update_apikeys?: Maybe<Apikeys_Mutation_Response>;
	/** update single row of the table: "apikeys" */
	update_apikeys_by_pk?: Maybe<Apikeys>;
	/** update multiples rows of table: "apikeys" */
	update_apikeys_many?: Maybe<Array<Maybe<Apikeys_Mutation_Response>>>;
	/** update data of the table: "gists" */
	update_gists?: Maybe<Gists_Mutation_Response>;
	/** update single row of the table: "gists" */
	update_gists_by_pk?: Maybe<Gists>;
	/** update multiples rows of table: "gists" */
	update_gists_many?: Maybe<Array<Maybe<Gists_Mutation_Response>>>;
	/** update data of the table: "shorturls" */
	update_shorturls?: Maybe<Shorturls_Mutation_Response>;
	/** update single row of the table: "shorturls" */
	update_shorturls_by_pk?: Maybe<Shorturls>;
	/** update multiples rows of table: "shorturls" */
	update_shorturls_many?: Maybe<Array<Maybe<Shorturls_Mutation_Response>>>;
	/** update data of the table: "uploads" */
	update_uploads?: Maybe<Uploads_Mutation_Response>;
	/** update single row of the table: "uploads" */
	update_uploads_by_pk?: Maybe<Uploads>;
	/** update multiples rows of table: "uploads" */
	update_uploads_many?: Maybe<Array<Maybe<Uploads_Mutation_Response>>>;
};

/** mutation root */
export type Mutation_RootDelete_ApikeysArgs = {
	where: Apikeys_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Apikeys_By_PkArgs = {
	keyID: Scalars['uuid']['input'];
};

/** mutation root */
export type Mutation_RootDelete_GistsArgs = {
	where: Gists_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Gists_By_PkArgs = {
	gistID: Scalars['uuid']['input'];
};

/** mutation root */
export type Mutation_RootDelete_ShorturlsArgs = {
	where: Shorturls_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Shorturls_By_PkArgs = {
	urlID: Scalars['uuid']['input'];
};

/** mutation root */
export type Mutation_RootDelete_UploadsArgs = {
	where: Uploads_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Uploads_By_PkArgs = {
	fileID: Scalars['uuid']['input'];
};

/** mutation root */
export type Mutation_RootInsert_ApikeysArgs = {
	objects: Array<Apikeys_Insert_Input>;
	on_conflict?: InputMaybe<Apikeys_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Apikeys_OneArgs = {
	object: Apikeys_Insert_Input;
	on_conflict?: InputMaybe<Apikeys_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_GistsArgs = {
	objects: Array<Gists_Insert_Input>;
	on_conflict?: InputMaybe<Gists_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Gists_OneArgs = {
	object: Gists_Insert_Input;
	on_conflict?: InputMaybe<Gists_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ShorturlsArgs = {
	objects: Array<Shorturls_Insert_Input>;
	on_conflict?: InputMaybe<Shorturls_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Shorturls_OneArgs = {
	object: Shorturls_Insert_Input;
	on_conflict?: InputMaybe<Shorturls_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_UploadsArgs = {
	objects: Array<Uploads_Insert_Input>;
	on_conflict?: InputMaybe<Uploads_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Uploads_OneArgs = {
	object: Uploads_Insert_Input;
	on_conflict?: InputMaybe<Uploads_On_Conflict>;
};

/** mutation root */
export type Mutation_RootUpdate_ApikeysArgs = {
	_set?: InputMaybe<Apikeys_Set_Input>;
	where: Apikeys_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Apikeys_By_PkArgs = {
	_set?: InputMaybe<Apikeys_Set_Input>;
	pk_columns: Apikeys_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Apikeys_ManyArgs = {
	updates: Array<Apikeys_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_GistsArgs = {
	_inc?: InputMaybe<Gists_Inc_Input>;
	_set?: InputMaybe<Gists_Set_Input>;
	where: Gists_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Gists_By_PkArgs = {
	_inc?: InputMaybe<Gists_Inc_Input>;
	_set?: InputMaybe<Gists_Set_Input>;
	pk_columns: Gists_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Gists_ManyArgs = {
	updates: Array<Gists_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_ShorturlsArgs = {
	_inc?: InputMaybe<Shorturls_Inc_Input>;
	_set?: InputMaybe<Shorturls_Set_Input>;
	where: Shorturls_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Shorturls_By_PkArgs = {
	_inc?: InputMaybe<Shorturls_Inc_Input>;
	_set?: InputMaybe<Shorturls_Set_Input>;
	pk_columns: Shorturls_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Shorturls_ManyArgs = {
	updates: Array<Shorturls_Updates>;
};

/** mutation root */
export type Mutation_RootUpdate_UploadsArgs = {
	_set?: InputMaybe<Uploads_Set_Input>;
	where: Uploads_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Uploads_By_PkArgs = {
	_set?: InputMaybe<Uploads_Set_Input>;
	pk_columns: Uploads_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Uploads_ManyArgs = {
	updates: Array<Uploads_Updates>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
	_eq?: InputMaybe<Scalars['numeric']['input']>;
	_gt?: InputMaybe<Scalars['numeric']['input']>;
	_gte?: InputMaybe<Scalars['numeric']['input']>;
	_in?: InputMaybe<Array<Scalars['numeric']['input']>>;
	_is_null?: InputMaybe<Scalars['Boolean']['input']>;
	_lt?: InputMaybe<Scalars['numeric']['input']>;
	_lte?: InputMaybe<Scalars['numeric']['input']>;
	_neq?: InputMaybe<Scalars['numeric']['input']>;
	_nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
	/** in ascending order, nulls last */
	Asc = 'asc',
	/** in ascending order, nulls first */
	AscNullsFirst = 'asc_nulls_first',
	/** in ascending order, nulls last */
	AscNullsLast = 'asc_nulls_last',
	/** in descending order, nulls first */
	Desc = 'desc',
	/** in descending order, nulls first */
	DescNullsFirst = 'desc_nulls_first',
	/** in descending order, nulls last */
	DescNullsLast = 'desc_nulls_last',
}

export type Query_Root = {
	__typename?: 'query_root';
	/** fetch data from the table: "apikeys" */
	apikeys: Array<Apikeys>;
	/** fetch aggregated fields from the table: "apikeys" */
	apikeys_aggregate: Apikeys_Aggregate;
	/** fetch data from the table: "apikeys" using primary key columns */
	apikeys_by_pk?: Maybe<Apikeys>;
	/** An array relationship */
	gists: Array<Gists>;
	/** An aggregate relationship */
	gists_aggregate: Gists_Aggregate;
	/** fetch data from the table: "gists" using primary key columns */
	gists_by_pk?: Maybe<Gists>;
	/** An array relationship */
	shorturls: Array<Shorturls>;
	/** An aggregate relationship */
	shorturls_aggregate: Shorturls_Aggregate;
	/** fetch data from the table: "shorturls" using primary key columns */
	shorturls_by_pk?: Maybe<Shorturls>;
	/** An array relationship */
	uploads: Array<Uploads>;
	/** An aggregate relationship */
	uploads_aggregate: Uploads_Aggregate;
	/** fetch data from the table: "uploads" using primary key columns */
	uploads_by_pk?: Maybe<Uploads>;
};

export type Query_RootApikeysArgs = {
	distinct_on?: InputMaybe<Array<Apikeys_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Apikeys_Order_By>>;
	where?: InputMaybe<Apikeys_Bool_Exp>;
};

export type Query_RootApikeys_AggregateArgs = {
	distinct_on?: InputMaybe<Array<Apikeys_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Apikeys_Order_By>>;
	where?: InputMaybe<Apikeys_Bool_Exp>;
};

export type Query_RootApikeys_By_PkArgs = {
	keyID: Scalars['uuid']['input'];
};

export type Query_RootGistsArgs = {
	distinct_on?: InputMaybe<Array<Gists_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Gists_Order_By>>;
	where?: InputMaybe<Gists_Bool_Exp>;
};

export type Query_RootGists_AggregateArgs = {
	distinct_on?: InputMaybe<Array<Gists_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Gists_Order_By>>;
	where?: InputMaybe<Gists_Bool_Exp>;
};

export type Query_RootGists_By_PkArgs = {
	gistID: Scalars['uuid']['input'];
};

export type Query_RootShorturlsArgs = {
	distinct_on?: InputMaybe<Array<Shorturls_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Shorturls_Order_By>>;
	where?: InputMaybe<Shorturls_Bool_Exp>;
};

export type Query_RootShorturls_AggregateArgs = {
	distinct_on?: InputMaybe<Array<Shorturls_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Shorturls_Order_By>>;
	where?: InputMaybe<Shorturls_Bool_Exp>;
};

export type Query_RootShorturls_By_PkArgs = {
	urlID: Scalars['uuid']['input'];
};

export type Query_RootUploadsArgs = {
	distinct_on?: InputMaybe<Array<Uploads_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Uploads_Order_By>>;
	where?: InputMaybe<Uploads_Bool_Exp>;
};

export type Query_RootUploads_AggregateArgs = {
	distinct_on?: InputMaybe<Array<Uploads_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Uploads_Order_By>>;
	where?: InputMaybe<Uploads_Bool_Exp>;
};

export type Query_RootUploads_By_PkArgs = {
	fileID: Scalars['uuid']['input'];
};

/** All Short URLs */
export type Shorturls = {
	__typename?: 'shorturls';
	/** An object relationship */
	apikey: Apikeys;
	apikeyUsed: Scalars['uuid']['output'];
	clicks: Scalars['Int']['output'];
	created_on: Scalars['timestamptz']['output'];
	creator_ip?: Maybe<Scalars['String']['output']>;
	original_url: Scalars['String']['output'];
	short_key: Scalars['String']['output'];
	urlID: Scalars['uuid']['output'];
};

/** aggregated selection of "shorturls" */
export type Shorturls_Aggregate = {
	__typename?: 'shorturls_aggregate';
	aggregate?: Maybe<Shorturls_Aggregate_Fields>;
	nodes: Array<Shorturls>;
};

export type Shorturls_Aggregate_Bool_Exp = {
	count?: InputMaybe<Shorturls_Aggregate_Bool_Exp_Count>;
};

export type Shorturls_Aggregate_Bool_Exp_Count = {
	arguments?: InputMaybe<Array<Shorturls_Select_Column>>;
	distinct?: InputMaybe<Scalars['Boolean']['input']>;
	filter?: InputMaybe<Shorturls_Bool_Exp>;
	predicate: Int_Comparison_Exp;
};

/** aggregate fields of "shorturls" */
export type Shorturls_Aggregate_Fields = {
	__typename?: 'shorturls_aggregate_fields';
	avg?: Maybe<Shorturls_Avg_Fields>;
	count: Scalars['Int']['output'];
	max?: Maybe<Shorturls_Max_Fields>;
	min?: Maybe<Shorturls_Min_Fields>;
	stddev?: Maybe<Shorturls_Stddev_Fields>;
	stddev_pop?: Maybe<Shorturls_Stddev_Pop_Fields>;
	stddev_samp?: Maybe<Shorturls_Stddev_Samp_Fields>;
	sum?: Maybe<Shorturls_Sum_Fields>;
	var_pop?: Maybe<Shorturls_Var_Pop_Fields>;
	var_samp?: Maybe<Shorturls_Var_Samp_Fields>;
	variance?: Maybe<Shorturls_Variance_Fields>;
};

/** aggregate fields of "shorturls" */
export type Shorturls_Aggregate_FieldsCountArgs = {
	columns?: InputMaybe<Array<Shorturls_Select_Column>>;
	distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "shorturls" */
export type Shorturls_Aggregate_Order_By = {
	avg?: InputMaybe<Shorturls_Avg_Order_By>;
	count?: InputMaybe<Order_By>;
	max?: InputMaybe<Shorturls_Max_Order_By>;
	min?: InputMaybe<Shorturls_Min_Order_By>;
	stddev?: InputMaybe<Shorturls_Stddev_Order_By>;
	stddev_pop?: InputMaybe<Shorturls_Stddev_Pop_Order_By>;
	stddev_samp?: InputMaybe<Shorturls_Stddev_Samp_Order_By>;
	sum?: InputMaybe<Shorturls_Sum_Order_By>;
	var_pop?: InputMaybe<Shorturls_Var_Pop_Order_By>;
	var_samp?: InputMaybe<Shorturls_Var_Samp_Order_By>;
	variance?: InputMaybe<Shorturls_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "shorturls" */
export type Shorturls_Arr_Rel_Insert_Input = {
	data: Array<Shorturls_Insert_Input>;
	/** upsert condition */
	on_conflict?: InputMaybe<Shorturls_On_Conflict>;
};

/** aggregate avg on columns */
export type Shorturls_Avg_Fields = {
	__typename?: 'shorturls_avg_fields';
	clicks?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "shorturls" */
export type Shorturls_Avg_Order_By = {
	clicks?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "shorturls". All fields are combined with a logical 'AND'. */
export type Shorturls_Bool_Exp = {
	_and?: InputMaybe<Array<Shorturls_Bool_Exp>>;
	_not?: InputMaybe<Shorturls_Bool_Exp>;
	_or?: InputMaybe<Array<Shorturls_Bool_Exp>>;
	apikey?: InputMaybe<Apikeys_Bool_Exp>;
	apikeyUsed?: InputMaybe<Uuid_Comparison_Exp>;
	clicks?: InputMaybe<Int_Comparison_Exp>;
	created_on?: InputMaybe<Timestamptz_Comparison_Exp>;
	creator_ip?: InputMaybe<String_Comparison_Exp>;
	original_url?: InputMaybe<String_Comparison_Exp>;
	short_key?: InputMaybe<String_Comparison_Exp>;
	urlID?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "shorturls" */
export enum Shorturls_Constraint {
	/** unique or primary key constraint on columns "urlID" */
	ShorturlsPkey = 'shorturls_pkey',
	/** unique or primary key constraint on columns "short_key" */
	ShorturlsShortKeyKey = 'shorturls_short_key_key',
}

/** input type for incrementing numeric columns in table "shorturls" */
export type Shorturls_Inc_Input = {
	clicks?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "shorturls" */
export type Shorturls_Insert_Input = {
	apikey?: InputMaybe<Apikeys_Obj_Rel_Insert_Input>;
	apikeyUsed?: InputMaybe<Scalars['uuid']['input']>;
	clicks?: InputMaybe<Scalars['Int']['input']>;
	created_on?: InputMaybe<Scalars['timestamptz']['input']>;
	creator_ip?: InputMaybe<Scalars['String']['input']>;
	original_url?: InputMaybe<Scalars['String']['input']>;
	short_key?: InputMaybe<Scalars['String']['input']>;
	urlID?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Shorturls_Max_Fields = {
	__typename?: 'shorturls_max_fields';
	apikeyUsed?: Maybe<Scalars['uuid']['output']>;
	clicks?: Maybe<Scalars['Int']['output']>;
	created_on?: Maybe<Scalars['timestamptz']['output']>;
	creator_ip?: Maybe<Scalars['String']['output']>;
	original_url?: Maybe<Scalars['String']['output']>;
	short_key?: Maybe<Scalars['String']['output']>;
	urlID?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "shorturls" */
export type Shorturls_Max_Order_By = {
	apikeyUsed?: InputMaybe<Order_By>;
	clicks?: InputMaybe<Order_By>;
	created_on?: InputMaybe<Order_By>;
	creator_ip?: InputMaybe<Order_By>;
	original_url?: InputMaybe<Order_By>;
	short_key?: InputMaybe<Order_By>;
	urlID?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Shorturls_Min_Fields = {
	__typename?: 'shorturls_min_fields';
	apikeyUsed?: Maybe<Scalars['uuid']['output']>;
	clicks?: Maybe<Scalars['Int']['output']>;
	created_on?: Maybe<Scalars['timestamptz']['output']>;
	creator_ip?: Maybe<Scalars['String']['output']>;
	original_url?: Maybe<Scalars['String']['output']>;
	short_key?: Maybe<Scalars['String']['output']>;
	urlID?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "shorturls" */
export type Shorturls_Min_Order_By = {
	apikeyUsed?: InputMaybe<Order_By>;
	clicks?: InputMaybe<Order_By>;
	created_on?: InputMaybe<Order_By>;
	creator_ip?: InputMaybe<Order_By>;
	original_url?: InputMaybe<Order_By>;
	short_key?: InputMaybe<Order_By>;
	urlID?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "shorturls" */
export type Shorturls_Mutation_Response = {
	__typename?: 'shorturls_mutation_response';
	/** number of rows affected by the mutation */
	affected_rows: Scalars['Int']['output'];
	/** data from the rows affected by the mutation */
	returning: Array<Shorturls>;
};

/** on_conflict condition type for table "shorturls" */
export type Shorturls_On_Conflict = {
	constraint: Shorturls_Constraint;
	update_columns?: Array<Shorturls_Update_Column>;
	where?: InputMaybe<Shorturls_Bool_Exp>;
};

/** Ordering options when selecting data from "shorturls". */
export type Shorturls_Order_By = {
	apikey?: InputMaybe<Apikeys_Order_By>;
	apikeyUsed?: InputMaybe<Order_By>;
	clicks?: InputMaybe<Order_By>;
	created_on?: InputMaybe<Order_By>;
	creator_ip?: InputMaybe<Order_By>;
	original_url?: InputMaybe<Order_By>;
	short_key?: InputMaybe<Order_By>;
	urlID?: InputMaybe<Order_By>;
};

/** primary key columns input for table: shorturls */
export type Shorturls_Pk_Columns_Input = {
	urlID: Scalars['uuid']['input'];
};

/** select columns of table "shorturls" */
export enum Shorturls_Select_Column {
	/** column name */
	ApikeyUsed = 'apikeyUsed',
	/** column name */
	Clicks = 'clicks',
	/** column name */
	CreatedOn = 'created_on',
	/** column name */
	CreatorIp = 'creator_ip',
	/** column name */
	OriginalUrl = 'original_url',
	/** column name */
	ShortKey = 'short_key',
	/** column name */
	UrlId = 'urlID',
}

/** input type for updating data in table "shorturls" */
export type Shorturls_Set_Input = {
	apikeyUsed?: InputMaybe<Scalars['uuid']['input']>;
	clicks?: InputMaybe<Scalars['Int']['input']>;
	created_on?: InputMaybe<Scalars['timestamptz']['input']>;
	creator_ip?: InputMaybe<Scalars['String']['input']>;
	original_url?: InputMaybe<Scalars['String']['input']>;
	short_key?: InputMaybe<Scalars['String']['input']>;
	urlID?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Shorturls_Stddev_Fields = {
	__typename?: 'shorturls_stddev_fields';
	clicks?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "shorturls" */
export type Shorturls_Stddev_Order_By = {
	clicks?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Shorturls_Stddev_Pop_Fields = {
	__typename?: 'shorturls_stddev_pop_fields';
	clicks?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "shorturls" */
export type Shorturls_Stddev_Pop_Order_By = {
	clicks?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Shorturls_Stddev_Samp_Fields = {
	__typename?: 'shorturls_stddev_samp_fields';
	clicks?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "shorturls" */
export type Shorturls_Stddev_Samp_Order_By = {
	clicks?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "shorturls" */
export type Shorturls_Stream_Cursor_Input = {
	/** Stream column input with initial value */
	initial_value: Shorturls_Stream_Cursor_Value_Input;
	/** cursor ordering */
	ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Shorturls_Stream_Cursor_Value_Input = {
	apikeyUsed?: InputMaybe<Scalars['uuid']['input']>;
	clicks?: InputMaybe<Scalars['Int']['input']>;
	created_on?: InputMaybe<Scalars['timestamptz']['input']>;
	creator_ip?: InputMaybe<Scalars['String']['input']>;
	original_url?: InputMaybe<Scalars['String']['input']>;
	short_key?: InputMaybe<Scalars['String']['input']>;
	urlID?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Shorturls_Sum_Fields = {
	__typename?: 'shorturls_sum_fields';
	clicks?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "shorturls" */
export type Shorturls_Sum_Order_By = {
	clicks?: InputMaybe<Order_By>;
};

/** update columns of table "shorturls" */
export enum Shorturls_Update_Column {
	/** column name */
	ApikeyUsed = 'apikeyUsed',
	/** column name */
	Clicks = 'clicks',
	/** column name */
	CreatedOn = 'created_on',
	/** column name */
	CreatorIp = 'creator_ip',
	/** column name */
	OriginalUrl = 'original_url',
	/** column name */
	ShortKey = 'short_key',
	/** column name */
	UrlId = 'urlID',
}

export type Shorturls_Updates = {
	/** increments the numeric columns with given value of the filtered values */
	_inc?: InputMaybe<Shorturls_Inc_Input>;
	/** sets the columns of the filtered rows to the given values */
	_set?: InputMaybe<Shorturls_Set_Input>;
	/** filter the rows which have to be updated */
	where: Shorturls_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Shorturls_Var_Pop_Fields = {
	__typename?: 'shorturls_var_pop_fields';
	clicks?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "shorturls" */
export type Shorturls_Var_Pop_Order_By = {
	clicks?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Shorturls_Var_Samp_Fields = {
	__typename?: 'shorturls_var_samp_fields';
	clicks?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "shorturls" */
export type Shorturls_Var_Samp_Order_By = {
	clicks?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Shorturls_Variance_Fields = {
	__typename?: 'shorturls_variance_fields';
	clicks?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "shorturls" */
export type Shorturls_Variance_Order_By = {
	clicks?: InputMaybe<Order_By>;
};

export type Subscription_Root = {
	__typename?: 'subscription_root';
	/** fetch data from the table: "apikeys" */
	apikeys: Array<Apikeys>;
	/** fetch aggregated fields from the table: "apikeys" */
	apikeys_aggregate: Apikeys_Aggregate;
	/** fetch data from the table: "apikeys" using primary key columns */
	apikeys_by_pk?: Maybe<Apikeys>;
	/** fetch data from the table in a streaming manner: "apikeys" */
	apikeys_stream: Array<Apikeys>;
	/** An array relationship */
	gists: Array<Gists>;
	/** An aggregate relationship */
	gists_aggregate: Gists_Aggregate;
	/** fetch data from the table: "gists" using primary key columns */
	gists_by_pk?: Maybe<Gists>;
	/** fetch data from the table in a streaming manner: "gists" */
	gists_stream: Array<Gists>;
	/** An array relationship */
	shorturls: Array<Shorturls>;
	/** An aggregate relationship */
	shorturls_aggregate: Shorturls_Aggregate;
	/** fetch data from the table: "shorturls" using primary key columns */
	shorturls_by_pk?: Maybe<Shorturls>;
	/** fetch data from the table in a streaming manner: "shorturls" */
	shorturls_stream: Array<Shorturls>;
	/** An array relationship */
	uploads: Array<Uploads>;
	/** An aggregate relationship */
	uploads_aggregate: Uploads_Aggregate;
	/** fetch data from the table: "uploads" using primary key columns */
	uploads_by_pk?: Maybe<Uploads>;
	/** fetch data from the table in a streaming manner: "uploads" */
	uploads_stream: Array<Uploads>;
};

export type Subscription_RootApikeysArgs = {
	distinct_on?: InputMaybe<Array<Apikeys_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Apikeys_Order_By>>;
	where?: InputMaybe<Apikeys_Bool_Exp>;
};

export type Subscription_RootApikeys_AggregateArgs = {
	distinct_on?: InputMaybe<Array<Apikeys_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Apikeys_Order_By>>;
	where?: InputMaybe<Apikeys_Bool_Exp>;
};

export type Subscription_RootApikeys_By_PkArgs = {
	keyID: Scalars['uuid']['input'];
};

export type Subscription_RootApikeys_StreamArgs = {
	batch_size: Scalars['Int']['input'];
	cursor: Array<InputMaybe<Apikeys_Stream_Cursor_Input>>;
	where?: InputMaybe<Apikeys_Bool_Exp>;
};

export type Subscription_RootGistsArgs = {
	distinct_on?: InputMaybe<Array<Gists_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Gists_Order_By>>;
	where?: InputMaybe<Gists_Bool_Exp>;
};

export type Subscription_RootGists_AggregateArgs = {
	distinct_on?: InputMaybe<Array<Gists_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Gists_Order_By>>;
	where?: InputMaybe<Gists_Bool_Exp>;
};

export type Subscription_RootGists_By_PkArgs = {
	gistID: Scalars['uuid']['input'];
};

export type Subscription_RootGists_StreamArgs = {
	batch_size: Scalars['Int']['input'];
	cursor: Array<InputMaybe<Gists_Stream_Cursor_Input>>;
	where?: InputMaybe<Gists_Bool_Exp>;
};

export type Subscription_RootShorturlsArgs = {
	distinct_on?: InputMaybe<Array<Shorturls_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Shorturls_Order_By>>;
	where?: InputMaybe<Shorturls_Bool_Exp>;
};

export type Subscription_RootShorturls_AggregateArgs = {
	distinct_on?: InputMaybe<Array<Shorturls_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Shorturls_Order_By>>;
	where?: InputMaybe<Shorturls_Bool_Exp>;
};

export type Subscription_RootShorturls_By_PkArgs = {
	urlID: Scalars['uuid']['input'];
};

export type Subscription_RootShorturls_StreamArgs = {
	batch_size: Scalars['Int']['input'];
	cursor: Array<InputMaybe<Shorturls_Stream_Cursor_Input>>;
	where?: InputMaybe<Shorturls_Bool_Exp>;
};

export type Subscription_RootUploadsArgs = {
	distinct_on?: InputMaybe<Array<Uploads_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Uploads_Order_By>>;
	where?: InputMaybe<Uploads_Bool_Exp>;
};

export type Subscription_RootUploads_AggregateArgs = {
	distinct_on?: InputMaybe<Array<Uploads_Select_Column>>;
	limit?: InputMaybe<Scalars['Int']['input']>;
	offset?: InputMaybe<Scalars['Int']['input']>;
	order_by?: InputMaybe<Array<Uploads_Order_By>>;
	where?: InputMaybe<Uploads_Bool_Exp>;
};

export type Subscription_RootUploads_By_PkArgs = {
	fileID: Scalars['uuid']['input'];
};

export type Subscription_RootUploads_StreamArgs = {
	batch_size: Scalars['Int']['input'];
	cursor: Array<InputMaybe<Uploads_Stream_Cursor_Input>>;
	where?: InputMaybe<Uploads_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
	_eq?: InputMaybe<Scalars['timestamptz']['input']>;
	_gt?: InputMaybe<Scalars['timestamptz']['input']>;
	_gte?: InputMaybe<Scalars['timestamptz']['input']>;
	_in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
	_is_null?: InputMaybe<Scalars['Boolean']['input']>;
	_lt?: InputMaybe<Scalars['timestamptz']['input']>;
	_lte?: InputMaybe<Scalars['timestamptz']['input']>;
	_neq?: InputMaybe<Scalars['timestamptz']['input']>;
	_nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** File Uploads Data */
export type Uploads = {
	__typename?: 'uploads';
	/** An object relationship */
	apikey: Apikeys;
	apikeyUsed: Scalars['uuid']['output'];
	deleteToken: Scalars['String']['output'];
	fileID: Scalars['uuid']['output'];
	filename: Scalars['String']['output'];
	upload_url: Scalars['String']['output'];
	uploaded_at: Scalars['timestamptz']['output'];
	uploader_ip?: Maybe<Scalars['String']['output']>;
};

/** aggregated selection of "uploads" */
export type Uploads_Aggregate = {
	__typename?: 'uploads_aggregate';
	aggregate?: Maybe<Uploads_Aggregate_Fields>;
	nodes: Array<Uploads>;
};

export type Uploads_Aggregate_Bool_Exp = {
	count?: InputMaybe<Uploads_Aggregate_Bool_Exp_Count>;
};

export type Uploads_Aggregate_Bool_Exp_Count = {
	arguments?: InputMaybe<Array<Uploads_Select_Column>>;
	distinct?: InputMaybe<Scalars['Boolean']['input']>;
	filter?: InputMaybe<Uploads_Bool_Exp>;
	predicate: Int_Comparison_Exp;
};

/** aggregate fields of "uploads" */
export type Uploads_Aggregate_Fields = {
	__typename?: 'uploads_aggregate_fields';
	count: Scalars['Int']['output'];
	max?: Maybe<Uploads_Max_Fields>;
	min?: Maybe<Uploads_Min_Fields>;
};

/** aggregate fields of "uploads" */
export type Uploads_Aggregate_FieldsCountArgs = {
	columns?: InputMaybe<Array<Uploads_Select_Column>>;
	distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "uploads" */
export type Uploads_Aggregate_Order_By = {
	count?: InputMaybe<Order_By>;
	max?: InputMaybe<Uploads_Max_Order_By>;
	min?: InputMaybe<Uploads_Min_Order_By>;
};

/** input type for inserting array relation for remote table "uploads" */
export type Uploads_Arr_Rel_Insert_Input = {
	data: Array<Uploads_Insert_Input>;
	/** upsert condition */
	on_conflict?: InputMaybe<Uploads_On_Conflict>;
};

/** Boolean expression to filter rows from the table "uploads". All fields are combined with a logical 'AND'. */
export type Uploads_Bool_Exp = {
	_and?: InputMaybe<Array<Uploads_Bool_Exp>>;
	_not?: InputMaybe<Uploads_Bool_Exp>;
	_or?: InputMaybe<Array<Uploads_Bool_Exp>>;
	apikey?: InputMaybe<Apikeys_Bool_Exp>;
	apikeyUsed?: InputMaybe<Uuid_Comparison_Exp>;
	deleteToken?: InputMaybe<String_Comparison_Exp>;
	fileID?: InputMaybe<Uuid_Comparison_Exp>;
	filename?: InputMaybe<String_Comparison_Exp>;
	upload_url?: InputMaybe<String_Comparison_Exp>;
	uploaded_at?: InputMaybe<Timestamptz_Comparison_Exp>;
	uploader_ip?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "uploads" */
export enum Uploads_Constraint {
	/** unique or primary key constraint on columns "fileID" */
	UploadsPkey = 'uploads_pkey',
	/** unique or primary key constraint on columns "upload_url" */
	UploadsUploadUrlKey = 'uploads_upload_url_key',
}

/** input type for inserting data into table "uploads" */
export type Uploads_Insert_Input = {
	apikey?: InputMaybe<Apikeys_Obj_Rel_Insert_Input>;
	apikeyUsed?: InputMaybe<Scalars['uuid']['input']>;
	deleteToken?: InputMaybe<Scalars['String']['input']>;
	fileID?: InputMaybe<Scalars['uuid']['input']>;
	filename?: InputMaybe<Scalars['String']['input']>;
	upload_url?: InputMaybe<Scalars['String']['input']>;
	uploaded_at?: InputMaybe<Scalars['timestamptz']['input']>;
	uploader_ip?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Uploads_Max_Fields = {
	__typename?: 'uploads_max_fields';
	apikeyUsed?: Maybe<Scalars['uuid']['output']>;
	deleteToken?: Maybe<Scalars['String']['output']>;
	fileID?: Maybe<Scalars['uuid']['output']>;
	filename?: Maybe<Scalars['String']['output']>;
	upload_url?: Maybe<Scalars['String']['output']>;
	uploaded_at?: Maybe<Scalars['timestamptz']['output']>;
	uploader_ip?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "uploads" */
export type Uploads_Max_Order_By = {
	apikeyUsed?: InputMaybe<Order_By>;
	deleteToken?: InputMaybe<Order_By>;
	fileID?: InputMaybe<Order_By>;
	filename?: InputMaybe<Order_By>;
	upload_url?: InputMaybe<Order_By>;
	uploaded_at?: InputMaybe<Order_By>;
	uploader_ip?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Uploads_Min_Fields = {
	__typename?: 'uploads_min_fields';
	apikeyUsed?: Maybe<Scalars['uuid']['output']>;
	deleteToken?: Maybe<Scalars['String']['output']>;
	fileID?: Maybe<Scalars['uuid']['output']>;
	filename?: Maybe<Scalars['String']['output']>;
	upload_url?: Maybe<Scalars['String']['output']>;
	uploaded_at?: Maybe<Scalars['timestamptz']['output']>;
	uploader_ip?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "uploads" */
export type Uploads_Min_Order_By = {
	apikeyUsed?: InputMaybe<Order_By>;
	deleteToken?: InputMaybe<Order_By>;
	fileID?: InputMaybe<Order_By>;
	filename?: InputMaybe<Order_By>;
	upload_url?: InputMaybe<Order_By>;
	uploaded_at?: InputMaybe<Order_By>;
	uploader_ip?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "uploads" */
export type Uploads_Mutation_Response = {
	__typename?: 'uploads_mutation_response';
	/** number of rows affected by the mutation */
	affected_rows: Scalars['Int']['output'];
	/** data from the rows affected by the mutation */
	returning: Array<Uploads>;
};

/** on_conflict condition type for table "uploads" */
export type Uploads_On_Conflict = {
	constraint: Uploads_Constraint;
	update_columns?: Array<Uploads_Update_Column>;
	where?: InputMaybe<Uploads_Bool_Exp>;
};

/** Ordering options when selecting data from "uploads". */
export type Uploads_Order_By = {
	apikey?: InputMaybe<Apikeys_Order_By>;
	apikeyUsed?: InputMaybe<Order_By>;
	deleteToken?: InputMaybe<Order_By>;
	fileID?: InputMaybe<Order_By>;
	filename?: InputMaybe<Order_By>;
	upload_url?: InputMaybe<Order_By>;
	uploaded_at?: InputMaybe<Order_By>;
	uploader_ip?: InputMaybe<Order_By>;
};

/** primary key columns input for table: uploads */
export type Uploads_Pk_Columns_Input = {
	fileID: Scalars['uuid']['input'];
};

/** select columns of table "uploads" */
export enum Uploads_Select_Column {
	/** column name */
	ApikeyUsed = 'apikeyUsed',
	/** column name */
	DeleteToken = 'deleteToken',
	/** column name */
	FileId = 'fileID',
	/** column name */
	Filename = 'filename',
	/** column name */
	UploadUrl = 'upload_url',
	/** column name */
	UploadedAt = 'uploaded_at',
	/** column name */
	UploaderIp = 'uploader_ip',
}

/** input type for updating data in table "uploads" */
export type Uploads_Set_Input = {
	apikeyUsed?: InputMaybe<Scalars['uuid']['input']>;
	deleteToken?: InputMaybe<Scalars['String']['input']>;
	fileID?: InputMaybe<Scalars['uuid']['input']>;
	filename?: InputMaybe<Scalars['String']['input']>;
	upload_url?: InputMaybe<Scalars['String']['input']>;
	uploaded_at?: InputMaybe<Scalars['timestamptz']['input']>;
	uploader_ip?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "uploads" */
export type Uploads_Stream_Cursor_Input = {
	/** Stream column input with initial value */
	initial_value: Uploads_Stream_Cursor_Value_Input;
	/** cursor ordering */
	ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Uploads_Stream_Cursor_Value_Input = {
	apikeyUsed?: InputMaybe<Scalars['uuid']['input']>;
	deleteToken?: InputMaybe<Scalars['String']['input']>;
	fileID?: InputMaybe<Scalars['uuid']['input']>;
	filename?: InputMaybe<Scalars['String']['input']>;
	upload_url?: InputMaybe<Scalars['String']['input']>;
	uploaded_at?: InputMaybe<Scalars['timestamptz']['input']>;
	uploader_ip?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "uploads" */
export enum Uploads_Update_Column {
	/** column name */
	ApikeyUsed = 'apikeyUsed',
	/** column name */
	DeleteToken = 'deleteToken',
	/** column name */
	FileId = 'fileID',
	/** column name */
	Filename = 'filename',
	/** column name */
	UploadUrl = 'upload_url',
	/** column name */
	UploadedAt = 'uploaded_at',
	/** column name */
	UploaderIp = 'uploader_ip',
}

export type Uploads_Updates = {
	/** sets the columns of the filtered rows to the given values */
	_set?: InputMaybe<Uploads_Set_Input>;
	/** filter the rows which have to be updated */
	where: Uploads_Bool_Exp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
	_eq?: InputMaybe<Scalars['uuid']['input']>;
	_gt?: InputMaybe<Scalars['uuid']['input']>;
	_gte?: InputMaybe<Scalars['uuid']['input']>;
	_in?: InputMaybe<Array<Scalars['uuid']['input']>>;
	_is_null?: InputMaybe<Scalars['Boolean']['input']>;
	_lt?: InputMaybe<Scalars['uuid']['input']>;
	_lte?: InputMaybe<Scalars['uuid']['input']>;
	_neq?: InputMaybe<Scalars['uuid']['input']>;
	_nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};
