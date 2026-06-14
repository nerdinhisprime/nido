<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { EditorState } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
import { vim } from "@replit/codemirror-vim";

const props = defineProps({
	title: {
		type: String,
		required: true,
		default: "Empty TITLE",
	},
	description: {
		type: String,
		required: false,
		default: undefined,
	},
});

const emit = defineEmits(["update:description"]);

const editorRef = ref<HTMLDivElement | null>(null);
let view: EditorView | null = null;

const initEditor = () => {
	if (!editorRef.value || props.description === undefined) return;

	if (view) {
		view.destroy();
	}

	const state = EditorState.create({
		doc: props.description,
		extensions: [
			basicSetup,
			vim(),
			markdown(),
			oneDark,
			EditorView.updateListener.of((update) => {
				if (update.docChanged) {
					emit("update:description", update.state.doc.toString());
				}
			}),
		],
	});

	view = new EditorView({
		state,
		parent: editorRef.value,
	});
};

onMounted(() => {
	initEditor();
});

watch(
	() => props.description,
	(newDesc) => {
		if (view && newDesc !== undefined && newDesc !== view.state.doc.toString()) {
			view.dispatch({
				changes: { from: 0, to: view.state.doc.length, insert: newDesc },
			});
		}
	},
);

onUnmounted(() => {
	if (view) {
		view.destroy();
	}
});
</script>

<template>
	<article @click.stop class="base-ui-menu">
		<h2 class="base-ui-menu__title">{{ props.title }}</h2>
		<section class="base-ui-menu__content">
			<div v-if="props.description" ref="editorRef" class="editor-container"></div>
			
      <slot v-else k/>
		</section>
	</article>
</template>

<style scoped>
.base-ui-menu {
	position: absolute;
	display: flex;
	flex-direction: column;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #1e1e1e;
	border: 1px solid #30363d;
	border-radius: 8px;
	padding: 20px;
	min-width: 500px;
	max-width: 80vw;
	min-height: 300px;
	max-height: 80vh;
	box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
	z-index: 1000;
}

.base-ui-menu__title {
	margin-top: 0;
	margin-bottom: 15px;
	color: #fff;
	flex-shrink: 0;
}

.base-ui-menu__content {
	flex-grow: 1;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}

.editor-container {
	flex-grow: 1;
	height: 100%;
	width: 100%;
	border: 1px solid #30363d;
	border-radius: 4px;
	overflow: hidden;
}

:deep(.cm-editor) {
	height: 100% !important;
}

:deep(.cm-scroller) {
	overflow: auto;
}
</style>
