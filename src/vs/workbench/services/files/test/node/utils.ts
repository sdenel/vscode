/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import {IFileStat} from 'vs/platform/files/common/files';
import {EventEmitter} from 'vs/base/common/eventEmitter';
import {IEventService} from 'vs/platform/event/common/event';

export class TestEventService extends EventEmitter {
	serviceId = IEventService;
}

export function getByName(root: IFileStat, name: string): IFileStat {
	for (let child of root.children) {
		if (child.name === name) {
			return child;
		}
	}

	return null;
}