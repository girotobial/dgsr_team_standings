import { derived } from 'svelte/store';

export default function(stores, callback, initial_value) {
    let previous = 0;

    return derived(stores, ($stores, set) => {
        const start = Date.now();
        Promise.resolve(callback($stores)).then(value => {
            if (start > previous) {
                previous = start;
                set(value)
            }
        })
    }, initial_value)
}
