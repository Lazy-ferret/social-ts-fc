/* eslint-disable testing-library/await-async-query */
import { create } from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'

describe('ProfileStatus component', () => {
    test('status from the props should be in the state', () => {
        const component = create(<ProfileStatus status='social-network' />)
        const instance = component.getInstance()
        expect(instance.state.status).toBe('social-network')
    })

    test('span should be with correct length and text', () => {
        const component = create(<ProfileStatus status='social-network' />)
        const root = component.root
        let span = root.findByType('span')
        expect(span).not.toBeNull()
        expect(span.children.length).toBe(1)
        expect(span.children[0]).toBe('social-network')
    })

    test('input should be displayed in EditMode instead of span', () => {
        const component = create(<ProfileStatus status='social-network' />)
        const root = component.root
        let span = root.findByType('span')
        span.props.onDoubleClick()
        let input = root.findByType('input')
        expect(input.props.value).toBe('social-network')
    })

    test('callback should be called', () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status='social-network' updateStatus={mockCallback}/>)
        const instance = component.getInstance()
        instance.deactivateEditMode()

        expect(mockCallback.mock.calls.length).toBe(1)
    })

})
