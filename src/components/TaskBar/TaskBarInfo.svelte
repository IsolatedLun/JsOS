<script lang='ts'>
	import { onMount } from "svelte";
	import type { SystemTime } from "../../types";
	import { createCurrentSystemDateTime } from "../../utils/time";
	import Flex from "../Box/Flex/Flex.svelte";
	import { cubeCss } from "../../utils/cubeCss/cubeCss";
	import Card from "../Modules/Card/Card.svelte";

    onMount(() => {
        setInterval(() => {
            systemTime = createCurrentSystemDateTime(Date.now());
        }, 1000)
    })

    export let systemTime: SystemTime = createCurrentSystemDateTime(Date.now());
</script>

<Card cls={cubeCss({blockClass: 'taskbar__info'})} padding={2}>
    <Flex align='center' useColumn={true} gap={0} cls={cubeCss({utilClass: 'margin-block-auto'})}>
        <p class="[ fs-350 ]">{systemTime.dateTime}</p>
        <p class="[ fs-350 ]">{[systemTime.weekDay, systemTime.calendarTime, systemTime.year].join(',')}</p>
    </Flex>
</Card>