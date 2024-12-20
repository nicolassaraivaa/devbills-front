import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { theme } from '../../styles/theme'
import { CreateCategoryData } from "../../validators/types.ts";
import { createCategorySchema } from "../../validators/schemas.ts";
import { Dialog } from "../dialog";
import { Button } from "../button";
import { Title } from "../title";
import { Input } from "../input";
import { Container, ErrorMessage } from "./styles";
import { useFetchAPI } from "../../hooks/useFetchAPI.tsx";


export function CreateCategoryDialog() {
    const [open, setOpen] = useState(false)
    const { createCategory, fetchCategories } = useFetchAPI()
    const {
        register,
        handleSubmit,
        formState: { errors },
        formState
    } = useForm<CreateCategoryData>({
        defaultValues: {
            title: '',
            color: theme.colors.primary
        },

        resolver: zodResolver(createCategorySchema)
    })

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [])

    const onSubmit = useCallback(
        async (data: CreateCategoryData) => {
            await createCategory(data)
            handleClose()
            await fetchCategories()
        }, [handleClose, createCategory, fetchCategories])

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
            trigger={<Button>Nova categoria</Button>}
        >
            <Container>
                <Title
                    title="Nova Categoria"
                    subtitle="Crie uma nova categoria para suas transações" />


                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Input
                            label="Nome"
                            placeholder="Nome da categoria..."
                            {...register('title')}
                        />

                        <Input
                            label="Cor"
                            type="color"
                            {...register('color')}
                        />
                    </div>
                    {errors.title && (
                            <ErrorMessage>{errors.title.message}</ErrorMessage>
                        )}
                    <footer>
                        <Button onClick={handleClose} variant="outline" type="button">
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={formState.isSubmitting}>
                            {formState.isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                        </Button>
                    </footer>
                </form>

            </Container>
        </Dialog>
    )
}