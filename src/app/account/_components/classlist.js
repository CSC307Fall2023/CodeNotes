import React from 'react'
import Typography from '@mui/material/Typography'
import Link from 'next/link'

function ClassList({ classes }) {
    return (
        <>
            <Typography variant="h4" component="div">
                My Classes:
            </Typography>
            <Typography variant="body2" component="div" display={'inline'}>
                {classes ? (
                    classes.map((classItem) => (
                        <Typography
                            variant="body2"
                            component="div"
                            display={'inline'}
                            key={classItem.id}
                        >
                            <Link href={`/class/${classItem.id}`}>
                                {classItem.name}
                            </Link>{' '}
                        </Typography>
                    ))
                ) : (
                    <></>
                )}
            </Typography>
        </>
    )
}

export default ClassList
