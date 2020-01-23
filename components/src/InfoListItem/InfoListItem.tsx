import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';

import { StyleRules, Theme, WithStyles, withStyles, WithTheme } from '@material-ui/core/styles';
import Chevron from '@material-ui/icons/ChevronRight';
import * as Colors from '@pxblue/colors';
//@ts-ignore
import color from 'color';

import { separate, withKeys } from '../utilities';

//Material-UI Components
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from '@material-ui/core';

const MAX_SUBTITLE_ELEMENTS = 6;

type DividerType = 'full' | 'partial';
type InfoListItemProps = {
    avatar?: boolean;
    backgroundColor?: string;
    chevron?: boolean;
    dense?: boolean;
    divider?: DividerType;
    fontColor?: string;
    hidePadding?: boolean;
    icon?: JSX.Element;
    iconColor?: string;
    leftComponent?: JSX.Element;
    onClick?: Function;
    rightComponent?: JSX.Element;
    statusColor?: string;
    style?: CSSProperties;
    subtitle?: string | Array<string | JSX.Element>;
    subtitleSeparator?: string;
    title: string;
} & WithStyles &
    WithTheme;

const InfoListItem: React.FC<InfoListItemProps> = (props) => {
    const {
        avatar = false,
        backgroundColor,
        chevron = false,
        classes,
        dense = false,
        divider,
        fontColor,
        hidePadding = false,
        icon,
        iconColor,
        leftComponent,
        onClick = (): void => { },
        rightComponent,
        statusColor,
        style,
        subtitle,
        subtitleSeparator = '\u00B7',
        theme,
        title,
    } = props;

    const getIconColor = (): string => {
        if (iconColor) return iconColor;
        if (avatar) {
            return statusColor
                ? color(statusColor).isDark()
                    ? Colors.white[50]
                    : Colors.black[500]
                : theme.palette.primary.contrastText;
        }
        return statusColor ? statusColor : 'inherit';
    };

    const getIcon = (): JSX.Element | undefined => {
        if (icon && avatar) {
            return (
                <ListItemAvatar>
                    <Avatar
                        style={{
                            // @ts-ignore TODO: Fix me
                            backgroundColor: statusColor || theme.palette.primary[500],
                            color: getIconColor(),
                        }}
                    >
                        {icon}
                    </Avatar>
                </ListItemAvatar>
            );
        } else if (icon) {
            return <ListItemIcon style={{ color: getIconColor() }}>{icon}</ListItemIcon>;
        } else if (!hidePadding) {
            return (
                <ListItemAvatar>
                    <Avatar style={{ backgroundColor: 'transparent' }} />
                </ListItemAvatar>
            );
        }
    };

    const getRightComponent = (): JSX.Element | undefined => {
        if (rightComponent) {
            return <div style={{ flex: '0 0 auto', marginLeft: 16 }}>{rightComponent}</div>;
        } else if (chevron) {
            return (
                <ListItemSecondaryAction>
                    <Chevron color={'inherit'} />
                </ListItemSecondaryAction>
            );
        }
    };

    const interpunct = (): JSX.Element => (
            <Typography className={`${classes.withSmallMargins} ${classes.separator}`}>
                {subtitleSeparator || '\u00B7'}
            </Typography>
        );

    const getSubtitle = (): string | null => {
        if (!subtitle) {
            return null;
        }
        if (typeof subtitle === 'string') {
            return subtitle;
        }

        const subtitleParts = Array.isArray(subtitle) ? [...subtitle] : [subtitle];
        const renderableSubtitleParts = subtitleParts.splice(0, MAX_SUBTITLE_ELEMENTS);

        return withKeys(separate(renderableSubtitleParts, () => interpunct()));
    };

    const getWrapperStyle = (): CSSProperties => Object.assign(
            {
                backgroundColor: backgroundColor || 'transparent',
                cursor: onClick ? 'pointer' : 'default',
                height: dense ? 52 : 72,
            },
            style
        );

    return (
        <ListItem style={getWrapperStyle()} onClick={(): void => onClick()} dense={dense}>
            <div className={classes.statusStripe} style={{ backgroundColor: statusColor }} />
            {divider && <div className={classes.divider} style={{ zIndex: 0, left: divider === 'full' ? 0 : 72 }} />}
            {(icon || !hidePadding) && getIcon()}
            {leftComponent}
            <ListItemText
                style={leftComponent ? { marginLeft: 16 } : {}}
                primary={title}
                secondary={getSubtitle()}
                primaryTypographyProps={{
                    noWrap: true,
                    variant: 'body1',
                    className: classes.title,
                    style: { color: fontColor || 'inherit' },
                }}
                secondaryTypographyProps={{ noWrap: true, variant: 'subtitle2', className: classes.subtitle }}
            />
            {getRightComponent()}
        </ListItem>
    );
};

const styles = (theme: Theme): StyleRules => ({
    divider: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: 1,
        backgroundColor: theme.palette.type === 'light' ? Colors.black[50] : Colors.black[700],
    },
    statusStripe: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 6,
        zIndex: 100,
    },
    withSmallMargins: {
        margin: `0 4px`,
    },
    title: {
        fontWeight: 600,
        lineHeight: 1.2,
        display: 'block',
    },
    subtitle: {
        fontWeight: 400,
        lineHeight: 1.3,
    },
    separator: {
        display: 'inline-block',
        lineHeight: 1.3,
        color: 'inherit',
    },
});

export default withStyles(styles, { withTheme: true })(InfoListItem);
