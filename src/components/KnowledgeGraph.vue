<script setup>
import { ref, onMounted, watch } from 'vue';
import cytoscape from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';

const cytoscapeContainer = ref(null);
cytoscape.use(cxtmenu);

const cy = ref();
const visible = ref(false);

const props = defineProps({
    layout: String
});

let startNode = null;
let endNode = null;

const initializeGraph = async () => {
    const response = await fetch('demo/data/graph.json');
    const elements = await response.json();

    cy.value = cytoscape({
        container: cytoscapeContainer.value,
        elements: elements,
        style: [
            {
                selector: 'node[type = "Person"]',
                style: {
                    'background-color': '#D64045',
                    label: 'data(id)',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'text-wrap': 'wrap',
                    'text-max-width': '80px',
                    'font-size': '12px',
                    width: '80px',
                    height: '80px',
                    color: '#fff',
                    'font-family': 'Roboto, sans-serif'
                }
            },
            {
                selector: 'node[type = "Organization"]',
                style: {
                    'background-color': '#467599',
                    label: 'data(id)',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'text-wrap': 'wrap',
                    'text-max-width': '80px',
                    'font-size': '12px',
                    width: '80px',
                    height: '80px',
                    color: '#fff',
                    'font-family': 'Roboto, sans-serif'
                }
            },
            {
                selector: 'edge',
                style: {
                    width: 3,
                    'line-color': '#ccc',
                    'target-arrow-color': '#ccc',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier'
                }
            }
        ],
        layout: {
            name: 'circle'
        }
    });

    cy.value.cxtmenu({
        selector: 'node',
        openMenuEvents: 'click',
        adaptativeNodeSpotlightRadius: true,
        outsideMenuCancel: 1,
        commands: [
            {
                content: 'Details',
                fillColor: 'rgb(168, 85, 247)',
                select: function (ele) {
                    console.log('Details', ele.id());
                    visible.value = true;
                }
            },
            {
                content: 'Clear',
                fillColor: 'rgb(14, 165, 233)',
                select: function () {
                    cy.value.elements().style('opacity', 1);
                    startNode = null;
                    endNode = null;
                }
            },
            {
                content: 'Set as start',
                fillColor: 'rgb(16, 185, 129)',
                select: function (ele) {
                    startNode = ele.id();
                    cy.value.elements().difference(ele).style('opacity', 0.8);
                    ele.style('opacity', 1);
                    checkAndHighlightPath();
                }
            },
            {
                content: 'Set as end',
                fillColor: 'rgb(239, 68, 68)',
                select: function (ele) {
                    endNode = ele.id();
                    cy.value.elements().difference(ele).style('opacity', 0.8);
                    ele.style('opacity', 1);
                    checkAndHighlightPath();
                }
            }
        ]
    });
};

function checkAndHighlightPath() {
    if (startNode && endNode) {
        let startElement = cy.value.getElementById(startNode);
        let endElement = cy.value.getElementById(endNode);

        if (startElement.length > 0 && endElement.length > 0) {
            let aStar = cy.value.elements().aStar({ root: startElement, goal: endElement });
            if (aStar.found) {
                // Reset opacity for all elements
                cy.value.elements().style('opacity', 0.2);
                // Highlight the path by setting opacity to 1
                aStar.path.style('opacity', 1);
            }
        }
    }
}

onMounted(() => {
    if (cytoscapeContainer.value) {
        initializeGraph();
    }

    watch(
        () => props.layout,
        (newLayout) => {
            if (cy.value) {
                cy.value.layout({ name: newLayout.toLowerCase() }).run();
            }
        },
        { immediate: true }
    );
});
</script>
<template>
    <div ref="cytoscapeContainer" class="cytoscape-container"></div>
    <Dialog v-model:visible="visible" modal header="Node Details" :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
            sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </Dialog>
</template>

<style>
.cytoscape-container {
    width: 100%;
    height: 500px;
}
</style>
