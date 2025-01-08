import { InputMask } from "@react-input/mask";
import { Input } from "../../components/input";
import { Logo } from "../../components/logo";
import { Title } from "../../components/title";
import { Aside, Balance, ChartAction, ChartContainer, ChartContent, Filters, Header, InputGroup, Main, SearchTransaction, Section, TransactionGroup } from "./styles";
import { ButtonIcon } from "../../components/button-icon";
import { Card } from "../../components/card";
import { Transaction } from "../../components/transaction";
import { CreateCategoryDialog } from "../../components/create-category-dialog";
import { CreateTransactionDialog } from "../../components/create-transaction-dialog";
import { CategoriesPieChart } from "../../components/categories-pie-chart";
import { FinancialEvolutionBartChart } from "../../components/financial-evolution-bar-chart";
import { useForm } from "react-hook-form";
import { financialEvolutionFilterData, TransactionFilterData } from "../../validators/types.ts";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionsFilterSchema } from "../../validators/schemas.ts";
import { useCallback, useEffect } from "react";
import { useFetchAPI } from "../../hooks/useFetchAPI.tsx";

export function Home() {
    const transactionsFilterForm = useForm<TransactionFilterData>({
        defaultValues: {
            title: '',
            categoryId: '',
            beginDate: dayjs().startOf('month').format('DD/MM/YYYY'),
            endDate: dayjs().endOf('month').format('DD/MM/YYYY'),
        },
        resolver: zodResolver(transactionsFilterSchema)
    })

    const financialEvolutionFilterForm = useForm<financialEvolutionFilterData>({
        defaultValues: {
            year: dayjs().get('year').toString()
        },
    })

    const {
        transactions,
        dashboard,
        fetchDashboard,
        fetchTransactions,
        financialEvolution,
        fetchFinancialEvolution
    } = useFetchAPI()

    useEffect(() => {
        const { beginDate, endDate } = transactionsFilterForm.getValues()

        fetchDashboard({ beginDate, endDate })
        fetchTransactions(transactionsFilterForm.getValues())
        fetchFinancialEvolution(financialEvolutionFilterForm.getValues())
    }, [
        fetchTransactions,
        transactionsFilterForm,
        fetchDashboard,
        fetchFinancialEvolution,
        financialEvolutionFilterForm
    ])

    {/*const [selectedCategory, setSelectedCategory] = 
    useState<CategoryProps | null>(null)

    const handleSelectCategory = useCallback(
        async ({ id, title, color }: CategoryProps) => {
            setSelectedCategory({id, title,  color})
            transactionsFilterForm.setValue('categoryId', id)

            await fetchTransactions(transactionsFilterForm.getValues())
        },
        [transactionsFilterForm, fetchTransactions]
    )

    const handleDeselectCategory = useCallback(() => {
        setSelectedCategory(null)
        transactionsFilterForm.setValue('categoryId', '')
    }, [transactionsFilterForm])*/}

    const onSubmitTransactions = useCallback(async (data: TransactionFilterData) => {
        await fetchTransactions(data)
    }, [fetchTransactions])

    const onSubmitDashboard = useCallback(async (data: TransactionFilterData) => {
        const { beginDate, endDate } = data
        await fetchDashboard({ beginDate, endDate })
        await fetchTransactions(data)
    }, [fetchDashboard, fetchTransactions])

    const onSubmitFinancialEvolution = useCallback(
        async (data: financialEvolutionFilterData) => {
        await fetchFinancialEvolution(data)
    }, [fetchFinancialEvolution]
    )

    return (
        <>
            <Header>
                <Logo />
                <div>
                    <CreateTransactionDialog />
                    <CreateCategoryDialog />
                </div>
            </Header>

            <Main>
                <Section>
                    <Filters>
                        <Title title="Saldo" subtitle="Receitas e despesas no período" />
                        <InputGroup>
                            <InputMask component={Input}
                                mask="dd/mm/aaaa"
                                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                                variant="dark"
                                label="Início"
                                placeholder="dd/mm/aaaa"
                                error={transactionsFilterForm.formState.errors.beginDate?.message}
                                {...transactionsFilterForm.register('beginDate')}
                            />
                            <InputMask component={Input}
                                mask="dd/mm/aaaa"
                                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                                variant="dark"
                                label="Fim"
                                placeholder="dd/mm/aaaa"
                                error={transactionsFilterForm.formState.errors.endDate?.message}
                                {...transactionsFilterForm.register('endDate')}
                            />
                            <ButtonIcon onClick={transactionsFilterForm.handleSubmit(onSubmitDashboard)} />
                        </InputGroup>
                    </Filters>
                    <Balance>
                        <Card
                            title="Saldo"
                            amount={dashboard?.balance?.balance || 0} />
                        <Card
                            title="Receitas"
                            amount={dashboard?.balance?.incomes || 0} variant="incomes" />
                        <Card
                            title="Gastos"
                            amount={dashboard?.balance?.expenses * -1 || 0}
                            variant="expenses" />
                    </Balance>
                    <ChartContainer>
                        <Header>
                            <Title
                                title="Gastos"
                                subtitle="Despesas por categoria no período" />
                        </Header>
                        <ChartContent>
                            <CategoriesPieChart
                                expenses={dashboard.expenses}
                            />
                        </ChartContent>
                    </ChartContainer>

                    <ChartContainer>
                        <Header>
                            <Title
                                title="Evolução Financeira"
                                subtitle="Saldo, Receitas e Gastos no ano" />

                            <ChartAction>
                                <InputMask component={Input}
                                    mask="aaaa"
                                    replacement={{ a: /\d/ }}
                                    variant="black"
                                    label="Ano"
                                    placeholder="aaaa"
                                    {...financialEvolutionFilterForm.register('year')}
                                />
                                <ButtonIcon onClick={financialEvolutionFilterForm.handleSubmit(onSubmitFinancialEvolution)}/>
                            </ChartAction>
                        </Header>
                        <ChartContent>
                            <FinancialEvolutionBartChart financialEvolution={financialEvolution} />
                        </ChartContent>
                    </ChartContainer>
                </Section>
                <Aside>
                    <header>
                        <Title title="Transações"
                            subtitle="Receitas e Gastos no período"
                        />
                        <SearchTransaction>
                            <Input
                                variant="black"
                                placeholder="Procurar transação..."
                                {...transactionsFilterForm.register('title')}
                            />
                            <ButtonIcon onClick={transactionsFilterForm.handleSubmit(
                                onSubmitTransactions)} />
                        </SearchTransaction>
                    </header>
                    <TransactionGroup>
                        {transactions?.length && (
                            transactions?.map((item, index) => (
                                <Transaction
                                    key={item._id}
                                    id={index + 1}
                                    amount={
                                        item.type === 'expense' ? item.amount * -1 : item.amount
                                    }
                                    date={dayjs(item.date).add(3, 'hours').format('DD/MM/YYYY')}
                                    category={{
                                        title: item.category.title,
                                        color: item.category.color
                                    }}
                                    title={item.title}
                                    variant={item.type}
                                />
                            ))
                        )}
                    </TransactionGroup>
                </Aside>
            </Main>
        </>
    )
}