import React, { useState, useEffect } from "react";
import {
    SpaceBetween,
    Container,
    Header,
    Grid,
    Box,
} from "@cloudscape-design/components";

import { RubricRow } from "./WRRubricContainer";

export interface ResumeRubricContainerProps {
    title: string;
    rubric: RubricRow[];
    namePrefix: string;
    resumeUrl: string;
    onScoreChange: (score: number) => void;
    onFilledChange?: (filled: boolean) => void;
}

export default function ResumeRubricContainer({
    title,
    rubric,
    namePrefix,
    resumeUrl,
    onScoreChange,
    onFilledChange,
}: ResumeRubricContainerProps) {
    const [criterionScores, setCriterionScores] = useState<Record<string, number>>(
        Object.fromEntries(rubric.map((r) => [r.criterion, 0]))
    );
    const [filledCriteria, setFilledCriteria] = useState<Record<string, boolean>>(
        Object.fromEntries(rubric.map((r) => [r.criterion, false]))
    );

    const handleValueChange = (criterion: string, value: number, filled: boolean) => {
        setCriterionScores((prev) => ({ ...prev, [criterion]: value }));
        setFilledCriteria((prev) => ({ ...prev, [criterion]: filled }));
    };

    useEffect(() => {
        onScoreChange(Object.values(criterionScores).reduce((sum, v) => sum + v, 0));
    }, [criterionScores]);

    useEffect(() => {
        onFilledChange?.(Object.values(filledCriteria).every(Boolean));
    }, [filledCriteria]);

    return (
        <Container header={<Header variant="h2">{title}</Header>}>
            <SpaceBetween direction="vertical" size="m">
                <Box>
                    <iframe
                        src={`${resumeUrl}/preview`}
                        title="Resume"
                        style={{ width: "100%", height: "80vh", border: 0 }}
                    />
                </Box>

                <SpaceBetween direction="vertical" size="s">
                    <Grid gridDefinition={[{ colspan: 3 }, { colspan: 7 }, { colspan: 2 }]}>
                        <Box fontWeight="bold" color="text-body-secondary">Criterion</Box>
                        <Box fontWeight="bold" color="text-body-secondary">Descriptors</Box>
                        <Box fontWeight="bold" color="text-body-secondary">Score</Box>
                    </Grid>

                    <hr style={{ border: "none", borderTop: "1px solid var(--color-border-divider-default)", margin: 0 }} />

                    {rubric.map((row, i) => (
                        <React.Fragment key={row.criterion}>
                            <RubricRow row={row} namePrefix={namePrefix} onValueChange={handleValueChange} />
                            {i < rubric.length - 1 && (
                                <hr style={{ border: "none", borderTop: "1px solid var(--color-border-divider-default)", margin: 0 }} />
                            )}
                        </React.Fragment>
                    ))}
                </SpaceBetween>
            </SpaceBetween>
        </Container>
    );
}