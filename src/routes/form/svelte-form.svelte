<script lang="ts">
	import { ThemeToggleSwitch } from '$lib/components/theme';
	import Toggle from '$lib/components/theme/toggle.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import * as Select from '$lib/components/ui/select';
	import SuperDebug, { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { formSchema, type FormSchema } from './schema';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;

	$: selectedValue = {
		label: $formData.values,
		value: $formData.values
	};
</script>

<nav class="p-4 border-b-2 h-16">
	<ThemeToggleSwitch />
</nav>

<div class="flex flex-col items-center justify-center h-full gap-y-4 p-8 sm:p-16">
	<div>
		<h3 class="text-lg sm:text-2xl font-medium text-center">Main Form</h3>
		<p class="text-sm text-muted-foreground">This form is for testing.</p>
	</div>
	<Separator />
	<form method="POST" use:enhance action="?/formSubmit" class="w-full">
		<Form.Field {form} name="username">
			<Form.Control let:attrs>
				<Form.Label>Username</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.username}
					placeholder="Enter your unique username"
				/>
			</Form.Control>
			<Form.Description>This is your public display name.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.email}
					type="email"
					placeholder="Enter your email"
				/>
			</Form.Control>
			<Form.Description>This is your email ID.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Field {form} name="values">
			<Form.Control let:attrs>
				<Select.Root
					selected={selectedValue}
					onSelectedChange={(s) => {
						s && ($formData.values = s.value);
					}}
				>
					<Select.Trigger {...attrs}>
						<Select.Value placeholder="Select a verified email to display" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="ababa" label="m@example.com" />
						<Select.Item value="hehehe" label="m@google.com" />
						<Select.Item value="a" label="m@supporte.com" />
					</Select.Content>
				</Select.Root>
				<input hidden name={attrs.name} bind:value={$formData.values} />
			</Form.Control>
			<Form.Description>Select and appropriate Answer!</Form.Description>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Button class="self-start mt-1" size="sm">Submit</Form.Button>
	</form>
	<div class="sm:w-1/3 w-60">
		<SuperDebug data={$formData} />
	</div>
</div>
