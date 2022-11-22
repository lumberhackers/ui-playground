import { computedAsync, useEventListener } from "@vueuse/core";
import { Ref, ref } from "vue";


export const usePhotoPicker = (inputRef: Ref<HTMLInputElement | undefined>) => {

    const contents = computedAsync(() => new Promise<string>(resolve => {

        if (file.value === undefined) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => { resolve(reader.result as string) };
        reader.readAsDataURL(file.value);
    }), null, { lazy: true })

    const file = ref<File | undefined>()

    useEventListener(inputRef, 'change', (ev: Event) => {
        
        if(!inputRef.value || !inputRef.value.files) {
            return;
        }

        file.value = inputRef.value.files[0]
    })

    return { file, contents };
}