import { Apikeys } from '../graphql/types';
import { PaginationType } from '../types';
import { createLogger, format, transports } from 'winston';

export const makeResponse = (
	data: any,
	meta_data: any = null,
	message = 'Success',
	error = false
) => ({
	message,
	error,
	meta_data,
	data,
});

const joinPrefix = (...keys: string[]) => keys.join('_');

export const flattenObject = (obj: any, prefix = '') => {
	let newObj: any = {};
	for (const key in obj) {
		const pfx = prefix ? joinPrefix(prefix, key) : key;
		if (obj[key] instanceof Object) {
			newObj = { ...newObj, ...flattenObject(obj[key], pfx) };
		} else {
			newObj = { ...newObj, [pfx]: obj[key] };
		}
	}
	return newObj;
};

export const cleanObject = (obj: any) => {
	const newObj: any = obj;
	for (const k in obj) {
		if (
			(!k || !obj[k] || typeof k === 'undefined') &&
			typeof obj[k] !== 'boolean' &&
			obj[k] !== 0
		)
			delete obj[k];
	}
	return newObj;
};

export const cleanObjectKeepNull = (obj: any) => {
	const newObj: any = obj;
	for (const k in obj) {
		if (
			(!k || !obj[k] || typeof k === 'undefined') &&
			typeof obj[k] !== 'boolean' &&
			obj[k] !== 0 &&
			obj[k] !== null
		)
			delete obj[k];
	}
	return newObj;
};

export const paginateRequest = (q: any): PaginationType => {
	const filter_keys = Object.keys(q).filter(c => c.startsWith('filter_'));
	const filters = filter_keys.length
		? filter_keys
				.map(filter_key => {
					const filter_subset = filter_key.replace('filter_', '').split('.');
					let mode = typeof q[filter_key] === 'number' ? '_eq' : '_iregex';
					if (q[filter_key].includes('-')) {
						mode = '_eq';
					}

					return parseFilter(filter_subset, q[filter_key], 0, mode);
				})
				.reduceRight((agg, cur) => {
					const [cur_key] = Object.keys(cur);
					if (cur_key in agg) {
						if (Array.isArray(agg[cur_key])) {
							agg[cur_key].push(cur);
						} else {
							cur[cur_key] = [cur[cur_key], agg[cur_key]];
						}
						return cur;
					}
					return {
						...agg,
						...cur,
					};
				}, {})
		: undefined;
	return {
		page: parseInt(q.page) || 0,
		limit: parseInt(q.limit || q.items) || 50,
		sort_by: q.sort_by,
		sort_order: q.sort_order || 'asc',
		filters,
	} as PaginationType;
};

export const parseFilter = (
	filter: string[],
	value: string,
	index = 0,
	filterMode = '_iregex'
) => {
	let fx: any = { [filterMode]: value };
	if (index < filter.length - 1) {
		fx = parseFilter(filter, value, index + 1, filterMode);
	}

	const key = filter[index];
	return { [key]: fx };
};

export const subtractHours = (date: Date, hours: number) => {
	date.setHours(date.getHours() - hours);
	return date.toISOString();
};

export const capitalizeEachWord = (str: string) => {
	return str
		.split(' ')
		.map(word =>
			!word.length ? '' : word[0].toUpperCase() + word.slice(1).toLowerCase()
		)
		.join(' ');
};

export const pick = (object: any, keys: any) => {
	return keys.reduce((obj: any, key: any) => {
		if (object && key in object) {
			obj[key] = object[key];
		}
		return obj;
	}, {});
};

export const getSortColumn = (
	pg_sort_by?: string,
	def = 'id',
	options: string[] = []
) => {
	pg_sort_by ||= def;
	return options.includes(pg_sort_by) ? pg_sort_by : def;
};

export const is_uuid = (value: string) => {
	const regex = /^()/;
	return regex.test(value);
};

export type encapDataKey = { key: string; keyID: string; last_used: Date };

export const encapDataKeys = (data: Apikeys[]) => {
	const new_data: encapDataKey[] = [];
	data.forEach((d: any) => {
		const parts = d.key.split('-');

		if (parts.length !== 3) {
			return d.key;
		}

		const middlePart = parts[1];
		const hiddenMiddlePart = middlePart.replace(/./g, '*');

		const key = `${parts[0]}-${hiddenMiddlePart}-${parts[2]}`;
		const keyID = d.keyID;
		const last_used = d.last_used;
		new_data.push({ key, keyID, last_used });
	});
	return new_data;
};

const { combine, timestamp, label, printf } = format;
const formater = printf(({ level, message, label, timestamp }) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

export const logger = createLogger({
	level: 'info',
	format: combine(label({ label: '📢' }), timestamp(), formater),
	transports: [
		new transports.Console(),
		new transports.File({ filename: 'error.log', level: 'error' }),
		new transports.File({ filename: 'combined.log' }),
	],
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new transports.Console({
			format: format.simple(),
		})
	);
}

export class LogStream {
	write(text: string) {
		logger.info(text.replace(/\n$/, ''));
	}
}
