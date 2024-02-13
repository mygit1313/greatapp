'use client';
export default function MaxLimit(props) {
    const { limit } = props;
    return (
        <span className='text-sm text-red-400'>(Max limit {limit} characters)</span>
    )
}
