import * as React from 'react'
import { Box, Footer as GFooter, Text } from 'grommet'

export function Footer(): JSX.Element {
    return (
        <GFooter background="brand" pad="medium">
            <Box fill>
                <Text textAlign="center">Developed by @Abionics and @get_username</Text>
            </Box>
        </GFooter>
    )
}
