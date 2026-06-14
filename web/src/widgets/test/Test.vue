
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
import { vim } from "@replit/codemirror-vim";

// Пропсы для двусторонней связи (v-model)
const props = defineProps({
	modelValue: { type: String, default: "" },
});
const emit = defineEmits(["update:modelValue"]);

const editorRef = ref(null);
let view = null;

onMounted(() => {
	// 1. Настраиваем конфигурацию
	const state = EditorState.create({
		doc: props.modelValue,
		extensions: [
			basicSetup, // Базовый набор (номера строк, история и т.д.)
			vim(), // Включаем Vim-раскладку (ВАЖНО: импортировать до языковых пакетов)
			markdown(), // Подсветка и синтаксис Markdown
			oneDark, // Темная тема

			// Слушаем изменения в редакторе для v-model
			EditorView.updateListener.of((update) => {
				if (update.docChanged) {
					emit("update:modelValue", update.state.doc.toString());
				}
			}),
		],
	});

	// 2. Инициализируем сам вьюер
	view = new EditorView({
		state,
		parent: editorRef.value,
	});
});

// Чистим инстанс при уничтожении компонента
onBeforeUnmount(() => {
	if (view) {
		view.destroy();
	}
});
</script>

<template>
  <div class="editor-container">
    <div ref="editorRef" class="editor-root"></div>
  </div>
</template>
<style scoped>
.editor-container {
  border: 1px solid #30363d;
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  height: 500px; /* Настрой высоту под себя */
}

.editor-root {
  height: 100%;
}

/* Натягиваем CodeMirror на всю высоту контейнера */
:deep(.cm-editor) {
  height: 100%;
}
:deep(.cm-scroller) {
  overflow: auto;
}
</style>
