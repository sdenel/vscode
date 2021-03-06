/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import * as strings from 'vs/base/common/strings';
import { IDisposable } from 'vs/base/common/lifecycle';
import * as dom from 'vs/base/browser/dom';
import * as objects from 'vs/base/common/objects';

export interface IHighlight {
	start: number;
	end: number;
}

export class HighlightedLabel implements IDisposable {

	private domNode: HTMLElement;
	private text: string;
	private highlights: IHighlight[];
	private didEverRender: boolean;

	constructor(container: HTMLElement) {
		this.domNode = document.createElement('span');
		this.domNode.className = 'monaco-highlighted-label';
		this.didEverRender = false;
		container.appendChild(this.domNode);
	}

	get element(): HTMLElement {
		return this.domNode;
	}

	set(text: string = '', highlights?: IHighlight[]) {
		if (this.didEverRender && this.text === text && objects.equals(this.highlights, highlights)) {
			return;
		}

		if (!Array.isArray(highlights)) {
			highlights = [];
		}

		this.text = text;
		this.highlights = highlights;
		this.render();
	}

	private render() {
		dom.clearNode(this.domNode);

		let htmlContent: string[] = [],
			highlight: IHighlight,
			pos = 0;

		for (let highlight of this.highlights) {
			if (highlight.end === highlight.start) {
				continue;
			}
			if (pos < highlight.start) {
				htmlContent.push('<span>')
				htmlContent.push(strings.escape(this.text.substring(pos, highlight.start)));
				htmlContent.push('</span>')
				pos = highlight.end;
			}
			htmlContent.push('<span class="highlight">')
			htmlContent.push(strings.escape(this.text.substring(highlight.start, highlight.end)));
			htmlContent.push('</span>')
			pos = highlight.end;
		}

		if (pos < this.text.length) {
			htmlContent.push('<span>')
			htmlContent.push(strings.escape(this.text.substring(pos)));
			htmlContent.push('</span>')
		}

		this.domNode.innerHTML = htmlContent.join('');
		this.didEverRender = true;
	}

	dispose() {
		this.text = null;
		this.highlights = null;
	}
}
