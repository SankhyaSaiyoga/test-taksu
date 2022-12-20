import {
	Button,
	Container,
	Text,
	Title,
	Modal,
	TextInput,
	Group,
	Card,
	ActionIcon,
} from '@mantine/core';
import { useState, useRef, useEffect } from 'react';
import { Trash } from 'tabler-icons-react';


export default function App() {
	const [tasks, setTasks] = useState([]);
	const [opened, setOpened] = useState(false);


	const taskTitle = useRef('');
	const taskDate = useRef('');

	function createTask() {
		setTasks([
			...tasks,
			{
				title: taskTitle.current.value,
				date: taskDate.current.value,
			},
		]);

		saveTasks([
			...tasks,
			{
				title: taskTitle.current.value,
				date: taskDate.current.value,
			},
		]);
	}

	function deleteTask(index) {
		var clonedTasks = [...tasks];

		clonedTasks.splice(index, 1);

		setTasks(clonedTasks);

		saveTasks([...clonedTasks]);
	}

	function loadTasks() {
		let loadedTasks = localStorage.getItem('tasks');

		let tasks = JSON.parse(loadedTasks);

		if (tasks) {
			setTasks(tasks);
		}
	}

	function saveTasks(tasks) {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	useEffect(() => {
		loadTasks();
	}, []);

	return (
				<div className='App'>
					<Modal
						opened={opened}
						size={'md'}
						title={'New Todo'}
						withCloseButton={false}
						onClose={() => {
							setOpened(false);
						}}
						centered
						>
						<TextInput
							mt={'md'}
							ref={taskTitle}
							placeholder={'Task Title'}
							required
							label={'Title'}
						/>
						<TextInput
							ref={taskDate}
							mt={'md'}
							placeholder={'Due Date'}
							label={'Date'}
						/>
						<Group mt={'md'} position={'apart'}>
							<Button
								onClick={() => {
									setOpened(false);
								}}
								variant={'subtle'}
								>
								Cancel
							</Button>
							<Button
								onClick={() => {
									createTask();
									setOpened(false);
								}}
								sx={theme => ({
									background: '#5440D1'
								})}>
								Save
							</Button>
						</Group>
					</Modal >
					<Container sx={theme => ({
						background: '#36393F',
						padding: 30,
						width: 300,
					})} size={650} my={40} >
						<Group position={'apart'}>
							<Title
								sx={theme => ({
									fontFamily: `Greycliff CF, ${theme.fontFamily}`,
									fontWeight: 900,
									color: 'white',
								})}>
								Hi, Jhon Due
							</Title>
						</Group>
						{tasks.length > 0 ? (
							tasks.map((task, index) => {
								if (task.title) {
									return (
										<Card withBorder key={index} mt={'sm'} >
											<Group position={'apart'}>
												<Text weight={'bold'}>{task.title}</Text>
												<ActionIcon
													onClick={() => {
														deleteTask(index);
													}}
													color={'red'}
													variant={'transparent'}>
													<Trash />
												</ActionIcon>
											</Group>
											<Text color={'dimmed'} size={'md'} mt={'sm'}>
												{task.date
													? task.date
													: 'No date was provided for this task'}
											</Text>
										</Card>
									);
								}
							})
						) : (
							<Text size={'lg'} mt={'md'} color={'dimmed'}>
								You have no todo
							</Text>
						)}
						<Button
							onClick={() => {
								setOpened(true);
							}}
							width={21.58}
							mt={450}
							color={'green'}
							>
							+
						</Button>
					</Container>
				</div>
	);
}
