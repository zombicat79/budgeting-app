import Input from '../../ui/Input';
import Button from '../../ui/Button';
import ErrorPanel from '../../ui/ErrorPanel';

function NewProject() {
    return (
        <form className="flex flex-col items-center" onSubmit="">
            <Input type="text" name="name" placeholder="Type in a name for the budget">Id</Input>
            <Input type="number" step="0.01" name="initialBalance" placeholder="Assign an initial balance">Initial balance</Input>
            <Input type="date" name="startDate" placeholder="Select start date">Start date</Input>
            <Input last={true} type="date" name="endDate">End date</Input>

            {/* error && <ErrorPanel content="" onClosePanel="" /> */}

            <Button>Initialize</Button>
        </form>
    )
}

export default NewProject;