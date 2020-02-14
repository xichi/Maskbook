import * as React from 'react'
import { Box, Card, Typography, Button } from '@material-ui/core'
import { useI18N } from '../../utils/i18n-next-ui'
import { makeStyles } from '@material-ui/core/styles'
import { useStylesExtends, or } from '../custom-ui-helper'
import { useMyIdentities } from '../DataSource/useActivatedUI'
import { Profile } from '../../database'
import { ChooseIdentity, ChooseIdentityProps } from '../shared/ChooseIdentity'
import { getActivatedUI } from '../../social-network/ui'
import { useAsync } from '../../utils/components/AsyncComponent'
import { BannerProps } from '../Welcomes/Banner'
import { NotSetupYetPrompt } from '../shared/NotSetupYetPrompt'
import useConnectingStatus from '../../utils/hooks/useConnectingStatus'

const useStyles = makeStyles({
    content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 12px',
    },
    button: {
        whiteSpace: 'nowrap',
    },
})

export interface PostDialogHintUIProps
    extends withClasses<KeysInferFromUseStyles<typeof useStyles> | 'root' | 'title' | 'button'> {
    onHintButtonClicked: () => void
}
export const PostDialogHintUI = React.memo(function PostDialogHintUI(props: PostDialogHintUIProps) {
    const { t } = useI18N()
    const classes = useStylesExtends(useStyles(), props)
    return (
        <Card className={classes.root} elevation={0}>
            <Box className={classes.content}>
                <Typography className={classes.title} variant="h4">
                    {t('post_modal_hint__title')}
                </Typography>
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={props.onHintButtonClicked}>
                    {t('post_modal_hint__button')}
                </Button>
            </Box>
        </Card>
    )
})

export interface PostDialogHintProps extends Partial<PostDialogHintUIProps> {
    identities?: Profile[]
    ChooseIdentityProps?: Partial<ChooseIdentityProps>
    NotSetupYetPromptProps?: Partial<BannerProps>
}
export function PostDialogHint(props: PostDialogHintProps) {
    const identities = or(props.identities, useMyIdentities())
    const ui = <PostDialogHintUI onHintButtonClicked={() => {}} {...props} />

    const connecting = useConnectingStatus()

    if (connecting) return null

    if (identities.length === 0) {
        return <NotSetupYetPrompt {...props.NotSetupYetPromptProps} />
    }

    if (identities.length > 1) {
        return (
            <>
                <ChooseIdentity {...props.ChooseIdentityProps} />
                {ui}
            </>
        )
    }

    return ui
}
