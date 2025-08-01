/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { ControlPanelConfig } from '@superset-ui/chart-controls';
import { t, validateNonEmpty } from '@superset-ui/core';
import timeGrainSqlaAnimationOverrides from '../../utilities/controls';
import {
  filterNulls,
  autozoom,
  jsColumns,
  jsDataMutator,
  jsTooltip,
  jsOnclickHref,
  legendFormat,
  legendPosition,
  viewport,
  spatial,
  pointRadiusFixed,
  multiplier,
  mapboxStyle,
  generateDeckGLColorSchemeControls,
} from '../../utilities/Shared_DeckGL';
import { COLOR_SCHEME_TYPES } from '../../utilities/utils';

const config: ControlPanelConfig = {
  onInit: controlState => ({
    ...controlState,
    time_grain_sqla: {
      ...controlState.time_grain_sqla,
      value: null,
    },
    granularity: {
      ...controlState.granularity,
      value: null,
    },
  }),
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [spatial, null],
        ['row_limit', filterNulls],
        ['adhoc_filters'],
      ],
    },
    {
      label: t('Map'),
      expanded: true,
      controlSetRows: [[mapboxStyle], [autozoom, viewport]],
    },
    {
      label: t('Point Size'),
      controlSetRows: [
        [pointRadiusFixed],
        [
          {
            name: 'point_unit',
            config: {
              type: 'SelectControl',
              label: t('Point Unit'),
              default: 'square_m',
              clearable: false,
              choices: [
                ['square_m', t('Square meters')],
                ['square_km', t('Square kilometers')],
                ['square_miles', t('Square miles')],
                ['radius_m', t('Radius in meters')],
                ['radius_km', t('Radius in kilometers')],
                ['radius_miles', t('Radius in miles')],
              ],
              description: t(
                'The unit of measure for the specified point radius',
              ),
            },
          },
        ],
        [
          {
            name: 'min_radius',
            config: {
              type: 'TextControl',
              label: t('Minimum Radius'),
              isFloat: true,
              validators: [validateNonEmpty],
              renderTrigger: true,
              default: 2,
              description: t(
                'Minimum radius size of the circle, in pixels. As the zoom level changes, this ' +
                  'insures that the circle respects this minimum radius.',
              ),
            },
          },
          {
            name: 'max_radius',
            config: {
              type: 'TextControl',
              label: t('Maximum Radius'),
              isFloat: true,
              validators: [validateNonEmpty],
              renderTrigger: true,
              default: 250,
              description: t(
                'Maximum radius size of the circle, in pixels. As the zoom level changes, this ' +
                  'insures that the circle respects this maximum radius.',
              ),
            },
          },
        ],
        [multiplier, null],
      ],
    },
    {
      label: t('Point Color'),
      controlSetRows: [
        [legendPosition],
        [legendFormat],
        ...generateDeckGLColorSchemeControls({
          defaultSchemeType: COLOR_SCHEME_TYPES.fixed_color,
        }),
      ],
    },
    {
      label: t('Advanced'),
      controlSetRows: [
        [jsColumns],
        [jsDataMutator],
        [jsTooltip],
        [jsOnclickHref],
      ],
    },
  ],
  controlOverrides: {
    size: {
      validators: [],
    },
    time_grain_sqla: timeGrainSqlaAnimationOverrides,
  },
};

export default config;
