/**
 * SearchConsoleDashboardWidgetKeywordTable component.
 *
 * Site Kit by Google, Copyright 2019 Google LLC
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
 * External dependencies
 */
import { map } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Data from 'googlesitekit-data';
import { getTimeInSeconds, numberFormat, getModulesData } from '../../../util';
import withData from '../../../components/higherorder/withdata';
import { TYPE_MODULES } from '../../../components/data';
import { getDataTableFromData, TableOverflowContainer } from '../../../components/data-table';
import PreviewTable from '../../../components/preview-table';
import { STORE_NAME } from '../datastore/constants';

const SearchConsoleDashboardWidgetKeywordTable = ( props ) => {
	const { data } = props;
	const { useSelect } = Data;
	const headers = [
		{
			title: __( 'Keyword', 'google-site-kit' ),
			tooltip: __( 'Most searched for keywords related to your content', 'google-site-kit' ),
			primary: true,
		},
		{
			title: __( 'Clicks', 'google-site-kit' ),
			tooltip: __( 'Number of times users clicked on your content in search results', 'google-site-kit' ),
		},
		{
			title: __( 'Impressions', 'google-site-kit' ),
			tooltip: __( 'Counted each time your content appears in search results', 'google-site-kit' ),
		},
	];
	const domain = getModulesData()[ 'search-console' ].settings.propertyID;
	const links = [];

	const dataMapped = map( data, ( row, i ) => {
		const query = row.keys[ 0 ];
		// eslint-disable-next-line react-hooks/rules-of-hooks
		links[ i ] = useSelect( ( select ) => select( STORE_NAME ).getServiceBaseURL(
			{
				path: 'performance/search-analytics',
				query: {
					resource_id: domain,
					num_of_days: 28 },
			}
		) );
		return [
			query,
			numberFormat( row.clicks ),
			numberFormat( row.impressions ),
		];
	} );

	const options = {
		hideHeader: false,
		chartsEnabled: false,
		links,
	};

	const dataTable = getDataTableFromData( dataMapped, headers, options );

	return (
		<TableOverflowContainer>
			{ dataTable }
		</TableOverflowContainer>
	);
};

export default withData(
	SearchConsoleDashboardWidgetKeywordTable,
	[
		{
			type: TYPE_MODULES,
			identifier: 'search-console',
			datapoint: 'searchanalytics',
			data: {
				url: global._googlesitekitLegacyData.permaLink,
				dimensions: 'query',
				limit: 10,
			},
			priority: 1,
			maxAge: getTimeInSeconds( 'day' ),
			context: [ 'Single', 'Dashboard' ],
		},
	],
	<PreviewTable padding />,
	{ createGrid: true },
	( returnedData ) => ! returnedData.length
);
