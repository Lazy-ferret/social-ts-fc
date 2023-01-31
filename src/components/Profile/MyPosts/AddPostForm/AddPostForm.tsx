import React from 'react'
import { Field, Form } from 'react-final-form'
import { composeValidators, maxLengthCreator, requiredField } from '../../../../utils/validators/validators'
import { Textarea } from '../../../common/FormsControl/FormsControl'

type AddPostFormPropsType = {
    onSubmit: (values: AddPostFormValuesType) => void
}

export type AddPostFormValuesType = { newPostText: string }

const AddPostForm: React.FC<AddPostFormPropsType> = ({ onSubmit }) => {
    return (
        <Form
            initialValues={{
                newPostText: ''
            }}
            onSubmit={onSubmit}
        >
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <Field component={Textarea}
                            validate={composeValidators(requiredField, maxLengthCreator(50))}
                            name={'newPostText'}
                            placeholder={'Enter your post text'}
                        />
                    </div>
                    <div>
                        <button>Add post</button>
                    </div>

                </form>
            )}
        </Form>
    )
}

export default AddPostForm