function About() {

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #C084FC, #EC4899, #FACC15)',
      padding: '16px'
    },
    header: {
      textAlign: 'center',
      marginBottom: '32px',
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '24px'
    },
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>About</h1>
      <p style={{ fontSize: '1.125rem' }}>
        Welcome to <strong>SOONISH</strong> — the app. A collection of projects and tools designed to help you get things done in ways <em>you</em> can get things done.
      </p>
      <p style={{ fontSize: '1.125rem', marginTop: '1rem' }}>
        This is the <strong>Taskinator</strong>, designed for those of us who can't get by with a simple To Do list.
        The main features include organizing tasks by energy level, effort required (because not all tasks require the same effort for us!), and urgency.
        Rather than relying on traditional Importance × Urgency matrices, this tool recognizes that for some of us, <em>ALL</em> tasks feel important and urgent.
      </p>
      <p style={{ fontSize: '1.125rem', marginTop: '1.5rem' }}>
        <strong>Other projects in the works:</strong> Anki Card Generator based on scientific evidence of harnessing Type 1 and Type 2 thinking,
        as well as Bloom's Taxonomy — to ensure your flashcards are working for you.
      </p>
      <p style={{ fontSize: '0.95rem', color: '#6B7280', marginTop: '2rem' }}>
        Created by Tiny Kitty Enterprises (TKE), with the help of LRH (and, of course, Claude) — July, 2025.
      </p>
    </div>
  );
}

export default About;
