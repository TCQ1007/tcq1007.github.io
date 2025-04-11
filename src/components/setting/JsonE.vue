<template>
    <div ref="container" style="height: 400px; width: 100%"></div>
</template>



<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.min.css'

const props = defineProps({
    modelValue: {
        type: [Object, Array], // 支持对象或数组
        required: true
    },
    mode: {
        type: String,
        default: 'text' // 可选: 'tree', 'code', 'text', 'view'
    }
})

const emit = defineEmits(['update:modelValue'])

const container = ref(null)
let editor = null

onMounted(() => {
    editor = new JSONEditor(container.value, {
        mode: props.mode,
        onChange: () => {
            try {
                const updatedJson = editor.get()
                emit('update:modelValue', updatedJson)
            } catch (e) {
                // 可根据需要处理 JSON 格式错误
            }
        }
    })

    // 设置初始值，如果是数组则使用数组，否则使用空对象
    editor.set(props.modelValue || (Array.isArray(props.modelValue) ? [] : {}))
    
    // 监听 modelValue 变化，更新编辑器内容
    watch(() => props.modelValue, (newValue) => {
        if (editor && newValue !== undefined && JSON.stringify(editor.get()) !== JSON.stringify(newValue)) {
            editor.set(newValue)
        }
    }, { deep: true })
})

onBeforeUnmount(() => {
    if (editor) {
        editor.destroy()
        editor = null
    }
})
</script>
