package co.com.sofka.questions.collections;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document
public class Answer {
    @Id
    private String id;
    private String userId;
    private String questionId;
    private String answer;
    private Integer position;
    private List<String> increase;
    private List<String> decrease;

    public Answer(){
        this.increase = new ArrayList<>();
        this.decrease = new ArrayList<>();
    }


    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public List<String> getDecrease() {
        return decrease;
    }
    public void setDecrease(List<String> decrease) {
        this.decrease = decrease;
    }

    public void addDecrease(String useId)
    {
        this.decrease.add(useId);
    }

    public void removeDecrease(String userId)
    {
        this.decrease.remove(userId);
    }

    public List<String> getIncrease() {
        return increase;
    }

    public void setIncrease(List<String> increase) {
        this.increase = increase;
    }

    public void addIncrease(String useId)
    {
        this.increase.add(useId);
    }

    public void removeIncrease(String userId)
    {
        this.increase.remove(userId);
    }
}
