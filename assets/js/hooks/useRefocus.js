/**
 * `useRefocus` hook.
 *
 * Site Kit by Google, Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';

/**
 * Invokes a function when the window is blurred and then refocused after the specified delay.
 *
 * @since n.e.x.t
 *
 * @param {Function} callback     Function to invoke when the window is blurred and then refocused after the specified delay.
 * @param {number}   milliseconds Delay in milliseconds.
 */
export function useRefocus( reset, milliseconds ) {
	// Reset all fetched data when user re-focuses window.
	useEffect( () => {
		let timeout;
		let needReset = false;

		// Count `milliseconds` once user focuses elsewhere.
		const countIdleTime = () => {
			timeout = global.setTimeout( () => {
				needReset = true;
			}, milliseconds );
		};

		// Reset when user re-focuses after `milliseconds` or more.
		const onFocus = () => {
			global.clearTimeout( timeout );

			// Do not reset if user has been away for less than `milliseconds`.
			if ( ! needReset ) {
				return;
			}
			needReset = false;

			reset();
		};

		global.addEventListener( 'focus', onFocus );
		global.addEventListener( 'blur', countIdleTime );
		return () => {
			global.removeEventListener( 'focus', onFocus );
			global.removeEventListener( 'blur', countIdleTime );
			global.clearTimeout( timeout );
		};
	}, [ milliseconds, reset ] );
}
