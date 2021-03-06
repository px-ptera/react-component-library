import React from 'react';
import * as Colors from '@pxblue/colors';
import { Hero, ChannelValue } from '@pxblue/react-components';
import { GradeA, Leaf } from '@pxblue/icons-mui';
import { text, number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { storyWrapper } from '../src/utils';

export const stories = storiesOf('playground/Hero', module);
stories.addDecorator(storyWrapper);
stories.addParameters({
    options: {
        showPanel: true,
    },
});

stories.add('with basic properties', () => (
    <Hero
        icon={<GradeA fontSize={'inherit'} htmlColor={Colors.blue[500]} />}
        label={text('label', 'Efficiency')}
        value={text('value', '94')}
        units={text('units', '%')}
    />
));

stories.add('with ChannelValue children', () => (
    <Hero label={text('label', 'Duration')} icon={<Leaf fontSize={'inherit'} htmlColor={Colors.green[500]} />}>
        <ChannelValue fontSize={'large'} value={number('hours', 1)} units={'h'} />
        <ChannelValue fontSize={'large'} value={number('minutes', 27)} units={'m'} />
    </Hero>
));
